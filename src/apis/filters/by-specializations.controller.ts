import { Request, Response } from 'express';

import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import db from '../../db';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      query: { brand, technique },
      params: { zipcode },
    } = req;

    if (!(brand && technique)) {
      return response(req, res, rs[400], sm.missingData);
    }

    const query = `
        SELECT e.email, e."firstName", e.zip, b.name as "brand", t."name" as "technique" FROM "Employees" e  
        LEFT JOIN "SupportedTechnique" st ON e."id" = st."employeeId"
        LEFT JOIN "SupportedBrands" sb ON e."id" = sb."employeeId"
        LEFT JOIN "Brands" b ON b."id" = sb."brandId" 
        LEFT JOIN "Technique" t ON t."id" = st."techniqueId"
        WHERE e."zip" = '${zipcode}'
        AND b."name" = '${brand}'
        AND t."name" = '${technique}'
      ;
    `
    const [results = []] = await db.connection.query(query)

    if (!results.length) {
      return response(req, res, rs[404], sm.notFound);
    }

    return response(req, res, rs[200], sm.ok, results);
  } catch (error) {
    return response(req, res, rs[500], sm.internalServerError, error);
  }
};
