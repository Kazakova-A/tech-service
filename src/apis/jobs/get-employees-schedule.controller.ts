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

interface currentEmployeeJobsType extends JobsData {
    address: AddressesData
}

interface jobsList {
    [key: string]: currentEmployeeJobsType[]
}

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {
        const { jobs, employees, nextThreeDays } = req;
        const workHours = {
            [nextThreeDays.firstDay]: getWorkingHours(jobs[nextThreeDays.firstDay]),
            [nextThreeDays.secondDay]: getWorkingHours(jobs[nextThreeDays.secondDay]),
            [nextThreeDays.thirdDay]: getWorkingHours(jobs[nextThreeDays.thirdDay]),
        };

        const getLastAddress = async (jobs: jobsList, workDay: number, startTime: number, employee: EmployeesData) => {

            // list of jobs only for the currentEmployee
            const currentEmployeeJobs = jobs[workDay].filter((item: currentEmployeeJobsType) => {
                return item.employeeId === employee.id;
            })

            // list of jobs before actual time only for the currentEmployee
            const listOfJobsBeforeActualTime = currentEmployeeJobs.filter((item: currentEmployeeJobsType) => {
                return moment(item.scheduledStart * 1000).tz(employee.timezone).hour() < startTime
            })

            if (listOfJobsBeforeActualTime.length === 0) {
                const employeeAddress = await db.Addresses.findOne({
                    where: {
                        [Op.and]: [
                            { parentType: addressParentType.Employees },
                            { parentId: employee.id }
                        ]
                    }
                });
                return employeeAddress;
            }

            // sort from last to first job
            listOfJobsBeforeActualTime.sort((a: currentEmployeeJobsType, b: currentEmployeeJobsType) => b.scheduledStart - a.scheduledStart)
            const previousAddress = listOfJobsBeforeActualTime[0].address;

            return previousAddress;
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
                        address: await getLastAddress(jobs, workDay, 8, employee)
                    },
                    {
                        start: 10,
                        end: 12,
                        status: getEmployeeStatus(employee, workStatus, 10, nextThreeDays.start, workDay),
                        day: workDay,
                        address: await getLastAddress(jobs, workDay, 10, employee)
                    },
                    {
                        start: 12,
                        end: 14,
                        status: getEmployeeStatus(employee, workStatus, 12, nextThreeDays.start, workDay),
                        day: workDay,
                        address: await getLastAddress(jobs, workDay, 12, employee)
                    },
                    {
                        start: 16,
                        end: 18,
                        status: getEmployeeStatus(employee, workStatus, 16, nextThreeDays.start, workDay),
                        day: workDay,
                        address: await getLastAddress(jobs, workDay, 16, employee)
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
            .sort((a: any, b: any) => a.day - b.day || a.start - b.start);

        return response(req, res, rs[200], sm.ok, result);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}

// foo.sort (function (a: any, b: any) {
//     return 2 * (a.workDay > b.workDay ? 1 : a.workDay < b.workDay ? -1 : 0) + 1 * (a.start > b.start ? 1 : a.start < b.start ? -1 : 0)
// })
