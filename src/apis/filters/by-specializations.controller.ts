import { Request, Response } from 'express';

import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import getFetchedData from '../../utilities/parseAsyncRequest';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      query: { brands, technique },
      params: { zipcode },
    } = req;
    if (!(brands && technique)) {
      return response(req, res, rs[400], sm.missingData);
    }
    const employeesList = await getFetchedData('https://jsonplaceholder.typicode.com/users');

    const availableEmployees = employeesList?.filter((employee: any) => employee.zip === zipcode);

    if (!availableEmployees.length) {
      return response(req, res, rs[404], sm.notFound);
    }

    return response(req, res, rs[200], sm.ok, availableEmployees);
  } catch (error) {
    return response(req, res, rs[500], sm.internalServerError, error);
  }
};
