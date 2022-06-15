import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';

import response from '../../utilities/responses';
import getCurentAddress from '../../utilities/get-curent-address';

export default async (req: Request, res: Response): Promise<Response> => {
    try {

        const currentAddress = await getCurentAddress(req.params.id)

        return response(req, res, rs[200], sm.ok, currentAddress);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
