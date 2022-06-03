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

export const createAddress = (addresses: addressesType[], currentCustomer: any) => addresses.map((address:any) => (
    db.Addresess.create({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: currentCustomer.id,
        parentType: 'customer',
        zip: address.zip,
        country: address.country
    })
));

export const updateAddress = (addresses: addressesType[], customerRecord: any) => addresses.map((address:any) => (
    db.Addresess.update({
        crmAddressId: address.id,
        street: address.street,
        houseNumber: address.street_line_2,
        city: address.city,
        state: address.state,
        parentId: customerRecord.id,
        parentType: 'customer',
        zip: address.zip,
        country: address.country
    },
    { where: { crmAddressId: address.id } }
    )
));
