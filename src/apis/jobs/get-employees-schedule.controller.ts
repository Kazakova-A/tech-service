import { Request, Response } from 'express';
import { Op } from "sequelize";
import db from '../../db';
import { addressParentType } from '../../db/types'

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import getWorkingHours from '../../utilities/get-working-hours';
import getEmployeeStatus from '../../utilities/get-employee-status';
import { EmployeesData } from '../../db';
import { JobsRequest } from 'middlewares/get-employess-by-filters';
import moment = require('moment');
import { JobsData } from './../../db/models/jobs';
import { AddressesData } from './../../db/models/addresses';
import getDiagnosticCoefficient from '../../middlewares/get-diagnostic-coefficient';

interface currentEmployeeJobsType extends JobsData {
    address: AddressesData
}

interface jobsList {
    [key: string]: currentEmployeeJobsType[]
}

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {
        const { brand, technicType, jobs, employees, nextThreeDays } = req;
        const workHours = {
            [nextThreeDays.firstDay]: getWorkingHours(jobs[nextThreeDays.firstDay]),
            [nextThreeDays.secondDay]: getWorkingHours(jobs[nextThreeDays.secondDay]),
            [nextThreeDays.thirdDay]: getWorkingHours(jobs[nextThreeDays.thirdDay]),
        };


        const getLastAddress = async (jobs: jobsList, workDay: number, scheduleStartJob: number, employee: EmployeesData) => {
            const JobsBeforeCurrent = jobs[workDay].filter((item: any) => {
                const startTimeJob = moment(item.scheduledStart * 1000).tz(employee.timezone).hour()
                return startTimeJob < scheduleStartJob + 3 && employee.id === item.employeeId
            })

            if (JobsBeforeCurrent.length === 0) {
                const currentAddress = await db.Addresses.findOne({
                    where: {
                        [Op.and]: [
                            { parentType: addressParentType.Employees },
                            { parentId: employee.id }
                        ]
                    }
                });
                return (currentAddress ? {
                    id: currentAddress.id,
                    street: currentAddress.street,
                    houseNumber: currentAddress.houseNumber,
                    city: currentAddress.city,
                } : {}
                )
            }

            const JobsBeforeNextSort = JobsBeforeCurrent.sort((a: any, b: any) => a.scheduledStart > b.scheduledStart ? 1 : -1);
            const currentAddress = JobsBeforeNextSort[JobsBeforeNextSort.length - 1].address

            return (currentAddress ? {
                id: currentAddress.id,
                street: currentAddress.street,
                houseNumber: currentAddress.houseNumber,
                city: currentAddress.city,
            } : {}
            )
        }

        const generateDaySchedule = async (employee: EmployeesData, workStatus: { [key: string]: number[] }, workDay: number) => (
            {
                employeeId: employee.id,
                workTime: [
                    {
                        start: 8,
                        end: 10,
                        status: getEmployeeStatus(employee, workStatus, 8, nextThreeDays.start, workDay),
                        day: workDay,
                        address: await getLastAddress(jobs, workDay, 8, employee),
                        diagnosticCoefficient: await getDiagnosticCoefficient(employee.id, brand, technicType)
                    },
                    {
                        start: 10,
                        end: 12,
                        status: getEmployeeStatus(employee, workStatus, 10, nextThreeDays.start, workDay),
                        day: workDay,
                        address: await getLastAddress(jobs, workDay, 10, employee),
                        diagnosticCoefficient: await getDiagnosticCoefficient(employee.id, brand, technicType)
                    },
                    {
                        start: 12,
                        end: 14,
                        status: getEmployeeStatus(employee, workStatus, 12, nextThreeDays.start, workDay),
                        day: workDay,
                        address: await getLastAddress(jobs, workDay, 12, employee),
                        diagnosticCoefficient: await getDiagnosticCoefficient(employee.id, brand, technicType)
                    },
                    {
                        start: 16,
                        end: 18,
                        status: getEmployeeStatus(employee, workStatus, 16, nextThreeDays.start, workDay),
                        day: workDay,
                        address: await getLastAddress(jobs, workDay, 16, employee),
                        diagnosticCoefficient: await getDiagnosticCoefficient(employee.id, brand, technicType)
                    },
                ].filter(item => item.status === 'available')
                            }
        );

        const lineList = await Promise.all([...employees.map(async (employee) => {
            const first = await generateDaySchedule(employee, workHours[nextThreeDays.firstDay], nextThreeDays.firstDay);
            const second = await generateDaySchedule(employee, workHours[nextThreeDays.secondDay], nextThreeDays.secondDay);
            const third = await generateDaySchedule(employee, workHours[nextThreeDays.thirdDay], nextThreeDays.thirdDay);
            return [
                first,
                second,
                third,
            ]
        })])

        const result = lineList.flat()
            .filter((item: any) => item.workTime.length > 0)
            .map(item => {
                return item.workTime.map((line: any) => {
                    line.employeeId = item.employeeId;
                    return line
                })
            })
            .flat()
            .sort((a, b) => a.day - b.day || a.start - b.start);
        return response(req, res, rs[200], sm.ok, result);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}

