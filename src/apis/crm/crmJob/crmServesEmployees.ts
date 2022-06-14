import db from '../../../db';

export type employeesType = {
    id: string,
    avatar_url: string,
    color_hex: string,
    first_name: string,
    last_name: string,
    email: string,
    mobile_number: string,
    role: string,
    tags: [string],
}

export const createEmployees = (employees: employeesType[]) => employees.map((employee:any) => (
    db.Employees.create({
        crmEmployeeId: employee.id,
        role: employee.role,
        avatarUrl: employee.avatar_url,
        colorHex: employee.color_hex,
        zip: null,
        firstName: employee.first_name,
        lastName: employee.last_name,
        email: employee.email,
        mobileNumber: employee.mobile_number,
        startTime: null,
        endTime: null,
        timezone: null,
        tags: employee.tags.join(', '),
    })
));

export const updateEmployees = (employees: employeesType[]) => employees.map((employee:any) => (
    db.Employees.update({
        crmEmployeeId: employee.id,
        role: employee.role,
        avatarUrl: employee.avatar_url,
        colorHex: employee.color_hex,
        firstName: employee.first_name,
        lastName: employee.last_name,
        email: employee.email,
        mobileNumber: employee.mobile_number,
        tags: employee.tags.join(', '),
    },
    { where: { crmEmployeeId: employee.id } }
    )
));