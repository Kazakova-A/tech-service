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

export const createAllAddress = (addresses: addressesType[], currentCustomerId: string) => addresses.map((address:any) => (
    db.Addresess.create({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: currentCustomerId,
        parentType: 'customer',
        zip: address.zip,
        country: address.country
    })
));

export const updateAllAddress = (addresses: addressesType[], currentCustomerId: string) => addresses.map((address:any) => (
    db.Addresess.update({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: currentCustomerId,
        parentType: 'customer',
        zip: address.zip,
        country: address.country
    },
    { where: { crmAddressId: address.id } }
    )
));
