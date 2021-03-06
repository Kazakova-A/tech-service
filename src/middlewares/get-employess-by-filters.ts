import { Request, Response } from 'express';

import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
} from '../config';
import response from '../utilities/responses';
import db, { EmployeesData as EmployeesInterface } from '../db';
import getFetchedData from '../utilities/parseAsyncRequest';

export interface ReqQuery {
  employee_ids: number[];
  scheduled_end_max: string;
  scheduled_end_min: string;
  scheduled_start_max: string;
  scheduled_start_min: string;
  brand: string;
  type: string;
  zip: number;
}

export interface JobsRequest extends Request<any, any, any, ReqQuery> {
  jobs: any;
  employees: EmployeesInterface[],
  nextThreeDays: {
    start: number;
    firstDay: number;
    secondDay: number;
    thirdDay: number;
    end: number;
  }
}


export default async (req: JobsRequest, res: Response, next: any): Promise<Response> => {
  try {
    const {
      query: { brand, type, zip },
    } = req;

    if (!(brand && type)) {
      return response(req, res, rs[400], sm.missingData);
    }

    const query = `
        SELECT e."id", e."email", e."firstName", e."zip", e."startTime", e."endTime", e."timezone", b."label" as "brand", t."label" as "type"
          FROM "Employees" e
          LEFT JOIN "SupportedTypes" st ON e."id" = st."employeeId"
          LEFT JOIN "SupportedBrands" sb ON e."id" = sb."employeeId"
          LEFT JOIN "Brands" b ON b."id" = sb."brandId"
          LEFT JOIN "Types" t ON t."id" = st."typeId"
        WHERE e."zip" = '${zip}'
        AND b."value" = '${brand}'
        AND t."value" = '${type}'
      ;
    `
    const [availableEmployees = []] = await db.connection.query(query)

    if (!availableEmployees.length) {
      return response(req, res, rs[404], sm.notFound);
    }

    const employees = await getFetchedData(`https://62061fb7161670001741bf36.mockapi.io/api/empoyees`);
    const ids = employees.map((item: EmployeesInterface) => Number(item.id));

    const result = availableEmployees.filter((item: EmployeesInterface) => ids.includes(Number(item.id)));

    req.employees = result;

    return next();
  } catch (error) {
    return response(req, res, rs[500], sm.internalServerError, error);
  }
};
