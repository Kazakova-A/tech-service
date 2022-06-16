import db from '../../../db';
import { addressParentType } from '../../../db/types'

export type addressesType = {
    id: string;
    street: string;
    street_line_2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export const createAllAddress = (addresses: addressesType[], currentCustomerId: string) => addresses.map((address:any) => (
    db.Addresses.create({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: currentCustomerId,
        parentType: addressParentType.Customer,
        zip: address.zip,
        country: address.country
    })
));

export const updateAllAddress = (addresses: addressesType[], currentCustomerId: string) => addresses.map((address:any) => (
    db.Addresses.update({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: currentCustomerId,
        parentType: addressParentType.Customer,
        zip: address.zip,
        country: address.country
    },
    { where: { crmAddressId: address.id } }
    )
));
