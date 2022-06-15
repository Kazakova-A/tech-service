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
import getCurentAddress from '../../utilities/get-curent-address';

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {
        const { jobs, employees, nextThreeDays } = req;
        const workHours = {
            [nextThreeDays.firstDay]: getWorkingHours(jobs[nextThreeDays.firstDay]),
            [nextThreeDays.secondDay]: getWorkingHours(jobs[nextThreeDays.secondDay]),
            [nextThreeDays.thirdDay]: getWorkingHours(jobs[nextThreeDays.thirdDay]),
        };

        const getLastAddress = ( jobs: any, workDay: number) => {

            console.log(jobs,"jobs")
            console.log(workDay,"workDay")

            

            const currentDay = jobs.filter((key: string, value: any) => {
                workDay === Number(key)
            })


            console.log(currentDay,"currentDay")
        }

        const generateDaySchedule = async (employee: EmployeesData, workStatus: { [key: string]: number[]}, workDay: number) => (

            {
                employeeId: employee.id,
                workTime: [
                    {
                        start: 8,
                        end: 10,
                        status: getEmployeeStatus(employee, workStatus, 8, nextThreeDays.start, workDay),
                        day: workDay,
                        address: getLastAddress( jobs, workDay ), //employee.id, 8,
                    },
                    {
                        start: 10,
                        end: 12,
                        status: getEmployeeStatus(employee, workStatus, 10, nextThreeDays.start, workDay),
                        day: workDay,
                        // address: getCurentAddress(employee.id),
                    },
                    {
                        start: 12,
                        end: 14,
                        status: getEmployeeStatus(employee, workStatus, 12, nextThreeDays.start, workDay),
                        day: workDay,
                        // address: getCurentAddress(employee.id),
                    },
                    {
                        start: 16,
                        end: 18,
                        status: getEmployeeStatus(employee, workStatus, 16, nextThreeDays.start, workDay),
                        day: workDay,
                        // address: getCurentAddress(employee.id),
                    },
                ]//.filter(item => item.status === 'available')
            }
        );

        const employeesSchedule = employees.reduce((
            accum,
            employee,
        ) => {
            accum[nextThreeDays.firstDay] = [
                ...accum[nextThreeDays.firstDay],
                generateDaySchedule(employee, workHours[nextThreeDays.firstDay], nextThreeDays.firstDay),
            ];
            accum[nextThreeDays.secondDay] = [
                ...accum[nextThreeDays.secondDay],
                generateDaySchedule(employee, workHours[nextThreeDays.secondDay], nextThreeDays.secondDay),
            ];
            accum[nextThreeDays.thirdDay] = [
                ...accum[nextThreeDays.thirdDay],
                generateDaySchedule(employee, workHours[nextThreeDays.thirdDay], nextThreeDays.thirdDay)
            ];

            return accum;
        }, {
            [nextThreeDays.firstDay]: [],
            [nextThreeDays.secondDay]: [],
            [nextThreeDays.thirdDay]: [],
        }
        );

        const lineList = await Promise.all([
            ...employeesSchedule[nextThreeDays.firstDay],
            ...employeesSchedule[nextThreeDays.secondDay],
            ...employeesSchedule[nextThreeDays.thirdDay]])
            
        const result = lineList.filter(item => item.workTime.length > 0)
            .map(item => {
                return item.workTime.map((line: { employeeId: any, start: number, end: number, status: string }) => {
                    line.employeeId = item.employeeId;
                    return line
                })
            })
            .flat()
            .sort((a,b) => a.workDay > b.workDay ? 1 : a.start >= b.start ? 1 : -1);

        return response(req, res, rs[200], sm.ok, employeesSchedule);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
