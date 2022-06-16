import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../../config';

import response from '../../../utilities/responses';
import db from '../../../db';
import { addressParentType } from '../../../db/types'
import { CrmCustomerRequest } from '../crmCustomerInterface';
import { createCustomer, updateCustomer } from './crmServesCustomer';
import { createAllAddress, updateAllAddress } from './crmServesAddress';
import { addressesType } from './crmServesAddress';


export default async (req: Request, res: Response): Promise<Response> => {
    let customerRecord: any;
    
    try {
        const{
            event, 
            customer
        }: CrmCustomerRequest = req.body

        if (event === "customer.deleted") {
            await db.Customers.destroy(
                {where: { crmCustomersId: customer.id} }
            )

            const addressesPromises = customer.addresses.map(( address: addressesType ) => (
                db.Addresses.destroy(
                    {where: { crmAddressId: address.id, parentType: addressParentType.Customer} }
                )
            ));

            await Promise.all(addressesPromises);

            return response(req, res, rs[200], sm.ok);
        }

        if (event === "customer.created" || "customer.updated") {
            const currentCustomer = await db.Customers.findOne(
                {where: { crmCustomersId: customer.id} }
            )
            if (currentCustomer) {
                customerRecord = await updateCustomer(customer)
            } else {
                customerRecord = await createCustomer(customer)
            }

            const currentCustomerId = await db.Customers.findOne(
                {
                    where: { crmCustomersId: customer.id},
                    attributes: ['id']
                }
            )

            const draftAdressesIds = await db.Addresses.findAll(
                {
                    where: { parentId: customerRecord.id, parentType: addressParentType.Customer},
                    attributes: ['crmAddressId']
                }
            )
            const addressesIds = draftAdressesIds.map((addres: { crmAddressId: string }) => addres.crmAddressId);
            const existAdresses = customer.addresses.filter(({ id }) => addressesIds.includes(id))
            const newAdresses = customer.addresses.filter(({ id }) => !addressesIds.includes(id))

            const existAdressesPromises = updateAllAddress(existAdresses, currentCustomerId.id);
            const newAdressesPromises = createAllAddress(newAdresses, currentCustomerId.id);
            await Promise.all([...newAdressesPromises, ...existAdressesPromises]);

            return response(req, res, rs[200], sm.ok);
        }

        return response(req, res, rs[500], sm.missingData);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
