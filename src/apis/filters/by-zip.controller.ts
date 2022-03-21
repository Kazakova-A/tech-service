import { Request, Response } from 'express';

import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import getFetchedData from '../../utilities/parseAsyncRequest';
import db, { EmployeesData as EmployeesInterface } from '../../db';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const { params: { zipcode } } = req;

    const availableEmployees = await db.Employees.findAll({ where: { zip: Number(zipcode) } });

    if (!availableEmployees) {
        return response(req, res, rs[404], sm.notFound);
    }

    const ids = availableEmployees.map((item: EmployeesInterface) => item.id)

    const employees = await getFetchedData(`https://62061fb7161670001741bf36.mockapi.io/api/empoyees`);

    const result = employees.filter((item: EmployeesInterface) => ids.includes(Number(item.id)))

    return response(req, res, rs[200], sm.ok, result);

    } catch(error) {
      return response(req, res, rs[500], sm.internalServerError, error);
    }
}
