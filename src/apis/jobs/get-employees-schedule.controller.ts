import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import getWorkingHours from '../../utilities/get-working-hours';
import getEmployeeStatus from '../../utilities/get-employee-status';
import { EmployeesData } from '../../db';
import { JobsRequest } from 'middlewares/get-employess-by-filters';

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {
        const { jobs, employees, nextThreeDays } = req;
        const workHours = {
            [String(nextThreeDays.firstDay)]: getWorkingHours(jobs[String(nextThreeDays.firstDay)]),
            [String(nextThreeDays.secondDay)]: getWorkingHours(jobs[String(nextThreeDays.secondDay)]),
            [String(nextThreeDays.thirdDay)]: getWorkingHours(jobs[String(nextThreeDays.thirdDay)]),
        };

        const generateDaySchedule = (employee: EmployeesData, workStatus: { [key: string]: number[]}, workDay: Date) => (
            {
                employeeId: employee.id,
                workTime: [
                    {
                        start: 8,
                        end: 10,
                        status: getEmployeeStatus(employee, workStatus, 8, nextThreeDays.start, workDay),
                    },
                    {
                        start: 10,
                        end: 12,
                        status: getEmployeeStatus(employee, workStatus, 10, nextThreeDays.start, workDay),
                    },
                    {
                        start: 12,
                        end: 14,
                        status: getEmployeeStatus(employee, workStatus, 12, nextThreeDays.start, workDay),
                    },
                    {
                        start: 16,
                        end: 18,
                        status: getEmployeeStatus(employee, workStatus, 16, nextThreeDays.start, workDay),
                    },
                ]
            }
        );

        const employeesSchedule = employees.reduce((
            accum,
            employee,
        ) => {
            accum[String(nextThreeDays.firstDay)] = [
                ...accum[String(nextThreeDays.firstDay)],
                generateDaySchedule(employee, workHours[String(nextThreeDays.firstDay)], nextThreeDays.firstDay),
            ];
            accum[String(nextThreeDays.secondDay)] = [
                ...accum[String(nextThreeDays.secondDay)],
                generateDaySchedule(employee, workHours[String(nextThreeDays.secondDay)], nextThreeDays.secondDay),
            ];
            accum[String(nextThreeDays.thirdDay)] = [
                ...accum[String(nextThreeDays.thirdDay)],
                generateDaySchedule(employee, workHours[String(nextThreeDays.thirdDay)], nextThreeDays.thirdDay)
            ];

            return accum;
        }, {
            [String(nextThreeDays.firstDay)]: [],
            [String(nextThreeDays.secondDay)]: [],
            [String(nextThreeDays.thirdDay)]: [],
        }
        );


        return response(req, res, rs[200], sm.ok, employeesSchedule);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
