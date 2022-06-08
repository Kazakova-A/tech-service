import db from '../../../db';

export type addressesType = {
    id: string;
    street: string;
    street_line_2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export const createAddress = (address: addressesType, customerRecordId: string) => db.Addresess.create({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: customerRecordId,
        parentType: 'customer',
        zip: address.zip,
        country: address.country
    })

export const updateAddress = (address: addressesType, customerRecordId: string) => db.Addresess.update({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: customerRecordId,
        parentType: 'customer',
        zip: address.zip,
        country: address.country
    },
    { where: { crmAddressId: address.id } }
    )
