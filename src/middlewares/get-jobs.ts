import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../config';
import response from '../utilities/responses';
import db from '../db';

interface ReqQuery {
    employee_ids: number[];
    scheduled_end_max: string;
    scheduled_end_min: string;
    scheduled_start_max: string;
    scheduled_start_min: string;
}

export interface JobsRequest extends Request<any, any, any, ReqQuery> {
    jobs: any[];
}

export default async (req: JobsRequest, res: Response, next: any): Promise<Response> => {
    try {
        const {
                employee_ids = [],
                scheduled_end_max,
                scheduled_end_min,
                scheduled_start_max,
                scheduled_start_min,
            } = req.query as unknown as ReqQuery;

        if (!employee_ids.length) {
            return response(req, res, rs[400], sm.missingData);
        }
        
        const ids = employee_ids.join(',');

        const scheduledEndMaxQuery = `
            AND "scheduledEnd" = ${scheduled_end_max}  
            OR
            "scheduledEnd" < ${scheduled_end_max}
        `;

        const scheduledEndMinQuery = `
            AND "scheduledEnd" = ${scheduled_end_min}  
            OR
            "scheduledEnd" > ${scheduled_end_min}
        `;

        const scheduledStartMaxQuery = `
            AND "scheduledStart" = ${scheduled_start_max}  
            OR
            "scheduledStart" < ${scheduled_start_max}
        `;

        const scheduledStartMinQuery = `
            AND "scheduledStart" = ${scheduled_start_min}  
            OR
            "scheduledStart" > ${scheduled_start_min}
        `;

        const query = `
            SELECT * FROM "Jobs"  
            WHERE "employeeId" IN(${ids})
            AND "workStatus" = 'scheduled'
            OR  "workStatus" = 'in_progress'
            ${scheduled_end_max ? scheduledEndMaxQuery : ''}
            
            ${scheduled_end_min ? scheduledEndMinQuery : ''}           
            
            ${scheduled_start_max ? scheduledStartMaxQuery : ''}           

            ${scheduled_start_min ? scheduledStartMinQuery : ''}           
        ;`;

    const [jobs = []] = await db.connection.query(query);

    req.jobs = jobs;

    return next();
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
