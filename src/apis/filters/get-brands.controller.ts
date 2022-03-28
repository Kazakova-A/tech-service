import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import db, { BrandsData as BrandsInterface } from '../../db';

export default async (req: Request, res: Response): Promise<Response> => {
    try {
        const brands: BrandsInterface[] = await db.Brands.findAll();

        if (!brands.length) {
            return response(req, res, rs[404], sm.notFound);
        }

        const brandsOptions = brands.map(({ label, value, id }: BrandsInterface) => (
            { value, label, id }
        ));

        return response(req, res, rs[200], sm.ok, brandsOptions);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
