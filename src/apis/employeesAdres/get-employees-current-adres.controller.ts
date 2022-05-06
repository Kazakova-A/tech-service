import { Request, Response } from 'express';

import response from '../../utilities/responses';
import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';
import db from '../../db';

interface ReqQuery {
    employeeId: number;
    // scheduled_end_max: string;
}
export default async (req: Request<any, any, any, ReqQuery>, res: Response): Promise<Response> => {
    try {
        const {
            query: {
                employeeId,
            } } = req;

        if (!employeeId) {
            return response(req, res, rs[400], sm.missingData);
        }

        const query = `
            SELECT 
            FROM "Jobs"
            WHERE "workStatus" = 'completed'
            AND "employeeId" = ${employeeId} 
            AND MAX("scheduledEnd")
            `;

        const [jobs = []] = await db.connection.query(query);
        
        return response(req, res, rs[200], sm.ok, jobs);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}