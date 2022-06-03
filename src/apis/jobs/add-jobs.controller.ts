import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import db from '../../db';
import { JobStatuses } from '../../db/types';

export default async (req: Request, res: Response) => {
    try {
        const {
            customerId,
            startedAt,
            employeeId,
            brand,
            technicTypes,
        } = req.body

        if (!(
            technicTypes
            || brand
            || customerId
            || startedAt
            || employeeId
        )) {
            return response(req, res, rs[400], sm.missingData);
        }
        const addedJobs = await db.Jobs.create({
            customerId,
            workStatus: JobStatuses.scheduled,
            startedAt,
            employeeId,
            brand,
            technicTypes,
        });
        return response(req, res, rs[200], sm.ok, addedJobs);
    } catch (error) {

        return response(req, res, rs[500], sm.internalServerError, error);
    }
}

