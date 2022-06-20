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

export const createAddress = (address: addressesType, currentJobId: string) => db.Addresses.create({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: currentJobId,
        parentType: addressParentType.Job,
        zip: address.zip,
        country: address.country
    })

export const updateAddress = (address: addressesType, currentJobId: string) => db.Addresses.update({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: currentJobId,
        parentType: addressParentType.Job,
        zip: address.zip,
        country: address.country
    },
    { where: { crmAddressId: address.id } }
    )
