import { Request, Response } from 'express';
import * as moment from 'moment';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import getFirstDays from '../../utilities/get-first-three-days';
import getWorkingHours from '../../utilities/get-working-hours';
import getEmployeeStatus from '../../utilities/get-employee-status';
import { EmployeesData } from '../../db';
import { JobsRequest } from 'middlewares/get-employess-by-filters';

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {
        const { jobs, employees } = req;
        
        const start = moment(new Date()).startOf('day').valueOf() / 1000
        const nextThreeDays = getFirstDays(start);

        const workHours = {
            [nextThreeDays.firstDay]: getWorkingHours(jobs[nextThreeDays.firstDay]),
            [nextThreeDays.secondDay]: getWorkingHours(jobs[nextThreeDays.secondDay]),
            [nextThreeDays.thirdDay]: getWorkingHours(jobs[nextThreeDays.thirdDay]),
        };

        const generateDaySchedule = (employee: EmployeesData, workStatus: { [key: string]: number[] }) => (
            {
                employeeId: employee.id,
                workTime: [
                    {
                        start: 8,
                        end: 10,
                        status: getEmployeeStatus(employee, workStatus, 8),
                    },
                    {
                        start: 10,
                        end: 12,
                        status: getEmployeeStatus(employee, workStatus, 10),
                    },
                    {
                        start: 12,
                        end: 14,
                        status: getEmployeeStatus(employee, workStatus, 12),
                    },
                    {
                        start: 16,
                        end: 18,
                        status: getEmployeeStatus(employee, workStatus, 16),
                    },
                ]
            }
        );

        const employeesSchedule = employees.reduce((
            accum,
            employee,
        ) => {
            accum[nextThreeDays.firstDay] = [...accum[nextThreeDays.firstDay], generateDaySchedule(employee, workHours[nextThreeDays.firstDay])];
            accum[nextThreeDays.secondDay] = [...accum[nextThreeDays.secondDay], generateDaySchedule(employee, workHours[nextThreeDays.secondDay])];
            accum[nextThreeDays.thirdDay] = [...accum[nextThreeDays.thirdDay], generateDaySchedule(employee, workHours[nextThreeDays.thirdDay])];

            return accum;
        }, {
            [nextThreeDays.firstDay]: [],
            [nextThreeDays.secondDay]: [],
            [nextThreeDays.thirdDay]: [],
        }
        );


        return response(req, res, rs[200], sm.ok, employeesSchedule);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
