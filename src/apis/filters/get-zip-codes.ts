import { Request, Response } from 'express';
import * as zipcodes from 'zipcodes';

import response from '../../utilities/responses';
import generate from '../../utilities/generator';

import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
} from '../../config';
export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
        query: { value },
      } = req; 
    
      const searchStart = Number(value) * 100;
      const list = [...generate(100)];

      const result = list.reduce((accum, item) => {
          const zip = zipcodes.lookup(searchStart + item);
          if (zip) {
              accum.push({
                  value: zip.zip,
                  label: zip.zip,
                  city: zip.city,
              })
          }
          return accum;
      },[]);

    return response(req, res, rs[200], sm.ok, result);
    } catch(error) {
      return response(req, res, rs[500], sm.internalServerError, error);
    }
}
