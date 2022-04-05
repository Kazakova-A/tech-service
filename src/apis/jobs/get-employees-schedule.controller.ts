import { Request, Response } from 'express';
import * as moment from 'moment';

import { JobsRequest } from 'middlewares/get-jobs';
import { RESPONSE_STATUSES as rs, SERVER_MESSAGES as sm } from '../../config';
import response from '../../utilities/responses';
import db, { EmployeesData } from '../../db';

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {
        const {
            query: {
                employee_ids,
            }, jobs } = req;

        const promises = employee_ids.map((id: number) => db.Employees.findOne({ where: { id } }));

        const employees = await Promise.all(promises);

        const workTime = jobs.reduce((accum, item) => {
            const scheduledStart = new Date(Number(item.scheduledStart * 1000))
            const scheduledStartHour = moment(scheduledStart).hour();

            if (accum[item.employeeId]) {
                accum[item.employeeId] = [...accum[item.employeeId], scheduledStartHour]
            } else {
                accum[item.employeeId] = [scheduledStartHour]
            }

            return accum;
        }, {});

        const handleEmployeeWorkTime = (
            employee: EmployeesData,
            workTime: { [key: string]: number[] },
            time: number
        ) => {
            if (time < employee.startTime || time > employee.endTime) {
                return 'not working'
            }

            if (workTime[employee.id].includes(time)) {
                return 'unavailable'
            }

            return 'available'
        };

        const employeesSchedule = employees.reduce((
            accum,
            employee,
        ) => {
            const schedule = {
                employeeId: employee.id,
                workTime: [
                    {
                        start: 8,
                        end: 10,
                        status: handleEmployeeWorkTime(employee, workTime, 8),
                    },
                    {
                        start: 10,
                        end: 12,
                        status: handleEmployeeWorkTime(employee, workTime, 10),
                    },
                    {
                        start: 12,
                        end: 14,
                        status: handleEmployeeWorkTime(employee, workTime, 12),
                    },
                    {
                        start: 16,
                        end: 18,
                        status: handleEmployeeWorkTime(employee, workTime, 16),
                    },
                ]
            }

            accum.push(schedule);
            return accum;
        }, []);

        return response(req, res, rs[200], sm.ok, employeesSchedule);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
