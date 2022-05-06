import { Request, Response } from 'express';

import response from '../../utilities/responses';
import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';

export default async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = 'Good Day!!!'
        return response(req, res, rs[200], sm.ok, result);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}