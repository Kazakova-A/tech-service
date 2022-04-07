import { Request, Response } from 'express';
import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../config';
import response from '../utilities/responses';
import db from '../db';
import { JobsRequest } from './get-employess-by-filters';
import getFirstDays from '../utilities/get-first-three-days';

export default async (req: JobsRequest, res: Response, next: any): Promise<Response> => {
    try {
        const {
            employees,
        } = req;

        const nextThreeDays = getFirstDays();

        const ids = employees.map(({ id }) => id).join(',');

        const generateQuery = (start: number, end: number) => (
            `
                SELECT * FROM "Jobs"  
                WHERE "employeeId" IN(${ids})
               
                AND (
                    "scheduledStart" = ${start}  
                    OR
                    "scheduledStart" > ${start}
                )

                AND (
                    "scheduledEnd" = ${end}  
                    OR
                    "scheduledEnd" < ${end}
                )

                AND "workStatus" = 'scheduled'
                OR  "workStatus" = 'in_progress'
                ;
            `
        )

        const firstDayJobsQuery = generateQuery(nextThreeDays.firstDay, nextThreeDays.secondDay); // start - the start of the current day, end - the next day
        const [firstDayJobs = []] = await db.connection.query(firstDayJobsQuery);

        const secondDayJobsQuery = generateQuery(nextThreeDays.secondDay, nextThreeDays.thirdDay);
        const [secondDayJobs = []] = await db.connection.query(secondDayJobsQuery);

        const thirdDayJobsQuery = generateQuery(nextThreeDays.thirdDay, nextThreeDays.end);
        const [thirdDayJobs = []] = await db.connection.query(thirdDayJobsQuery);

        const jobs = {
            [nextThreeDays.firstDay]: firstDayJobs,
            [nextThreeDays.secondDay]: secondDayJobs,
            [nextThreeDays.thirdDay]: thirdDayJobs,
        }

        req.jobs = jobs;
        req.nextThreeDays = nextThreeDays;

        return next();
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
