import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import db from '../../db';

interface ReqQuery {
    employee_ids: number[];
    scheduled_end_max: string;
    scheduled_end_min: string;
    scheduled_start_max: string;
    scheduled_start_min: string;
}
export default async (req: Request<any, any, any, ReqQuery>, res: Response): Promise<Response> => {
    try {
        const {
            query: {
                employee_ids = [],
                scheduled_end_max,
                scheduled_end_min,
                scheduled_start_max,
                scheduled_start_min,
            } } = req;

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

    return response(req, res, rs[200], sm.ok, jobs);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
