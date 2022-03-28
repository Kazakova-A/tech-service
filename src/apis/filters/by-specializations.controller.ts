import { Request, Response } from 'express';

import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import db, { EmployeesData as EmployeesInterface } from '../../db';
import getFetchedData from '../../utilities/parseAsyncRequest';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      query: { brand, type },
      params: { zipcode },
    } = req;

    if (!(brand && type)) {
      return response(req, res, rs[400], sm.missingData);
    }

    const query = `
        SELECT e."id", e."email", e."firstName", e."zip", b."label" as "brand", t."label" as "type"
          FROM "Employees" e  
          LEFT JOIN "SupportedTypes" st ON e."id" = st."employeeId"
          LEFT JOIN "SupportedBrands" sb ON e."id" = sb."employeeId"
          LEFT JOIN "Brands" b ON b."id" = sb."brandId" 
          LEFT JOIN "Types" t ON t."id" = st."typeId"
        WHERE e."zip" = '${zipcode}'
        AND b."value" = '${brand}'
        AND t."value" = '${type}'
      ;
    `
    const [availableEmployees = []] = await db.connection.query(query)

    if (!availableEmployees.length) {
      return response(req, res, rs[404], sm.notFound);
    }

    const ids = availableEmployees.map((item: EmployeesInterface) => item.id)

    const employees = await getFetchedData(`https://62061fb7161670001741bf36.mockapi.io/api/empoyees`);

    const result = employees.filter((item: EmployeesInterface) => ids.includes(Number(item.id)))

    return response(req, res, rs[200], sm.ok, result);
  } catch (error) {
    return response(req, res, rs[500], sm.internalServerError, error);
  }
};
