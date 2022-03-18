import { Request, Response } from 'express';

import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import getFetchedData from '../../utilities/parseAsyncRequest';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const { params: { zipcode } } = req;

    // const availableEmployees = await db.Employees.findAll({
    //     where:{
    //         zip
    //     }
    // })
    // if (availableEmployees.length) {
    //     return response(req, res, rs[404], sm.notFound);
    // }
    // const promises = availableEmployees.map((employee) => fetch(`https://findEmploueesById/:${employee.employeeId}`));
    // const result = await Promise.all(promises)

    // return response(req, res, rs[200], sm.ok, result);

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
