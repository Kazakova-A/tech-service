import db from '../../../db';
import {customerType} from './crmServesCustomer' 
import {addressesType} from './crmServesAddress' 
import {employeesType} from './crmServesEmployees' 
import * as moment from 'moment-timezone';

export type jobType = {
    id: string,
    name: string,
    description: string,
    customer: customerType,
    address: addressesType,
    notes: string,
    work_status: string,
    work_timestamps: {
        started_at: string,
        completed_at: string,
    },
    schedule: {
        scheduled_start: string,
        scheduled_end: string,
    },
    total_amount: number,
    outstanding_balance: number,
    assigned_employees: employeesType[],
    tags: [string],
}

export const createJob = (job: jobType, currentCustomerId: string, currentEmployeesId: string) => {
    const getSecondToUTC = (date: string) => Math.floor(moment.utc(date).valueOf() / 1000)
    const scheduledStart = getSecondToUTC(job.schedule.scheduled_start);
    const scheduledEnd = getSecondToUTC(job.schedule.scheduled_end);
    const startedAt = getSecondToUTC(job.work_timestamps.started_at);
    const completedAt = getSecondToUTC(job.work_timestamps.completed_at);
    const diagnosticSpentTime = Math.floor((completedAt - startedAt) / 60);

        return db.Jobs.create({
            crmJobId: job.id,
            name: job.name,
            description: job.description,
            notes:job.notes,
            total_amount: job.total_amount,
            outstanding_balance: job.outstanding_balance,
            tags: job.tags.join(', '),
            customerId: currentCustomerId,
            employeeId: currentEmployeesId,
            workStatus: job.work_status,
            scheduledStart,
            scheduledEnd,
            startedAt,
            completedAt,
            diagnosticSpentTime,
            brand: null,
            technicTypes: null,
        })
};

export const updateJob = (job: jobType, currentCustomerId: string, currentEmployeesId: string) => {
    const getSecondToUTC = (date: string) => Math.floor(moment.utc(date).valueOf() / 1000)
    const scheduledStart = getSecondToUTC(job.schedule.scheduled_start);
    const scheduledEnd = getSecondToUTC(job.schedule.scheduled_end);
    const startedAt = getSecondToUTC(job.work_timestamps.started_at);
    const completedAt = getSecondToUTC(job.work_timestamps.completed_at);
    const diagnosticSpentTime = Math.floor((completedAt - startedAt) / 60);
    
    return db.Jobs.update({
        crmJobId: job.id,
        name: job.name,
        description: job.description,
        notes:job.notes,
        total_amount: job.total_amount,
        outstanding_balance: job.outstanding_balance,
        tags: job.tags.join(', '),
        customerId: currentCustomerId,
        employeeId: currentEmployeesId,
        workStatus: job.work_status,
        scheduledStart,
        scheduledEnd,
        startedAt,
        completedAt,
        diagnosticSpentTime,
    },
    { where: { crmJobId: job.id } }
    )
};