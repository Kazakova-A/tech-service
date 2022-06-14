import db from '../../../db';

export type customerType = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    mobile_number: string,
    home_number: string,
    work_number: string,
    company: string,
    notifications_enabled: boolean,
    tags: [string]
}

export const createCustomer = (customer: customerType) => db.Customers.create({
    crmCustomersId: customer.id,
    firstName: customer.first_name,
    lastName: customer.last_name,
    email: customer.email,
    mobileNumber: customer.mobile_number,
    homeNumber: customer.home_number,
    workNumber: customer.work_number,
    company: customer.company,
    notificationEnabled: customer.notifications_enabled,
    tags: customer.tags.join(', '),
});

export const updateCustomer = (customer: customerType) => db.Customers.update({
    crmCustomersId: customer.id,
    firstName: customer.first_name,
    lastName: customer.last_name,
    email: customer.email,
    mobileNumber: customer.mobile_number,
    homeNumber: customer.home_number,
    workNumber: customer.work_number,
    company: customer.company,
    notificationEnabled: customer.notifications_enabled,
    tags: customer.tags.join(', '),
},
{ where: { crmCustomersId: customer.id } }
);
