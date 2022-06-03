import { Request, Response } from 'express';
// import { Op } from "sequelize";

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../../config';

import response from '../../../utilities/responses';
import db from '../../../db';
import { CrmCustomerRequest } from 'middlewares/crmCustomer';
import { createCustomer, updateCustomer } from './crmServesCustomer';
import { createAddress, updateAddress } from './crmServesAddress';
import { addressesType } from './crmServesAddress';

const currentDay = new Date();

export default async (req: Request, res: Response): Promise<Response> => {
    try {
        const{
            event, 
            customer
        }: CrmCustomerRequest = req.body

        if ( event === "customer.created" ) {
            const currentCustomer = await createCustomer(customer)
            const addressesPromises = createAddress(customer.addresses, currentCustomer)
            await Promise.all(addressesPromises);

        } else if (event === "customer.updated") {
            const customerCurrent = await db.Customers.findOne(
                {where: { crmCustomersId: customer.id} }
            )

            if (!customerCurrent) {
                return response(req, res, rs[404], sm.notFound);
            }

            const customerRecord = await updateCustomer(customer)
            const draftAdressesIds = await db.Addresess.findAll(
                {
                    where: { parentId: customerCurrent.id, parentType: 'customer'},
                    attributes: ['crmAddressId']
                }
            )
            const addressesIds = draftAdressesIds.map((addres: { crmAddressId: string }) => addres.crmAddressId);

            const existAdresses = customer.addresses.filter(({ id }) => addressesIds.includes(id))
            const newAdresses = customer.addresses.filter(({ id }) => !addressesIds.includes(id))

            const existAdressesPromises = updateAddress(existAdresses, customerRecord);
            const newAdressesPromises = createAddress(newAdresses, customerRecord);
            await Promise.all([...newAdressesPromises, ...existAdressesPromises]);

            return response(req, res, rs[200], sm.ok);
        } else if (event === "customer.deleted") {
            await db.Customers.destroy(
                {where: { crmCustomersId: customer.id} }
            )

            const addressesPromises = customer.addresses.map(( address: addressesType ) => (
                db.Addresess.destroy(
                    {where: { crmAddressId: address.id, parentType: 'customer'} }
                )
            ));

            await Promise.all(addressesPromises);

        } else {
            return response(req, res, rs[500], sm.missingData);
        }

        return response(req, res, rs[200], sm.ok);
    } catch (error) {
            console.log('===========================', error)
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
