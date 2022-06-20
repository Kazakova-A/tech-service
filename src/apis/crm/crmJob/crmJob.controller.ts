import { Request, Response } from 'express';
// import { Op } from "sequelize";

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../../config';

import response from '../../../utilities/responses';
import db from '../../../db';
import { CrmJobRequest } from '../crmJobInterface';
import { createJob, updateJob } from './crmServesJob';
import { createCustomer, updateCustomer } from './crmServesCustomer';
import { createEmployees, updateEmployees } from './crmServesEmployees';
import { createAddress, updateAddress } from './crmServesAddress';

export default async (req: Request, res: Response): Promise<Response> => {

    try {
        const{
            event, 
            job
        }: CrmJobRequest = req.body

        if (event === "job.deleted") {
            await db.Jobs.destroy(
                {where: { crmJobId: job.id} }
            )
            return response(req, res, rs[200], sm.ok);
        } 
        if ( event === "job.created" || "job.updated" ) {
            const currentCustomer = await db.Customers.findOne(
                {where: { crmCustomersId: job.customer.id} }
            )
            if (currentCustomer) {
                await updateCustomer(job.customer)
            } else {
                await createCustomer(job.customer)
            }
            
            const currentCustomerId = await db.Customers.findOne(
                {
                    where: { crmCustomersId: job.customer.id},
                    attributes: ['id']
                }
            )

            const crmEmployeeIds = job.assigned_employees.map((employee) => employee.id);
            const existEmployeeses = await db.Employees.findAll({
                where: {
                    crmEmployeeId: crmEmployeeIds
                }
            })
            const existEmployeesIds = existEmployeeses.map((employee: { crmEmployeeId: any; }) => employee.crmEmployeeId)
            const existEmployees = job.assigned_employees.filter(employee => existEmployeesIds.includes(employee.id) )
            const newEmployees = job.assigned_employees.filter(employee => !existEmployeesIds.includes(employee.id) )
            const existEmployeesesPromises = updateEmployees(existEmployees);
            const newEmployeesesPromises = createEmployees(newEmployees);
            await Promise.all([...newEmployeesesPromises, ...existEmployeesesPromises]);

            const currentJob = await db.Jobs.findOne(
                {where: { crmJobId: job.id} }
            )

            const currentEmployeesId = await db.Employees.findOne(
                {
                    where: { crmEmployeeId: job.assigned_employees[0].id},
                    attributes: ['id']
                }
            )

            if (currentJob) {
                await updateJob(job, currentCustomerId.id, currentEmployeesId.id)
            } else {
                await createJob(job, currentCustomerId.id, currentEmployeesId.id)
            }

            const currentJobId = await db.Jobs.findOne(
                {
                    where: { crmJobId: job.id},
                    attributes: ['id']
                }
            )

            const currentAddress = await db.Addresses.findOne(
                {where: { crmAddressId: job.address.id} }
            )

            if (currentAddress) {
                await updateAddress(job.address, currentJobId.id)
            } else {
                await createAddress(job.address, currentJobId.id)
            }
        }

        return response(req, res, rs[200], sm.ok);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
