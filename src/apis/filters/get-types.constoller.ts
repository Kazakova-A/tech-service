import { Request, Response } from 'express';

import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import db, { TypesData as TypesInterface } from '../../db';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const types: TypesInterface[] = await db.Types.findAll();

    if (!types.length) {
        return response(req, res, rs[404], sm.notFound);
    }

    const typesOptions = types.map(({ label, value, id }: TypesInterface) => (
        { value, label, id }
    ));

    return response(req, res, rs[200], sm.ok, typesOptions);
    } catch(error) {
      return response(req, res, rs[500], sm.internalServerError, error);
    }
}
