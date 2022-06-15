import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';

import response from '../../utilities/responses';
import db from '../../db';

export default async (req: Request, res: Response): Promise<Response> => {
    try {

        return response(req, res, rs[500], sm.missingData);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
