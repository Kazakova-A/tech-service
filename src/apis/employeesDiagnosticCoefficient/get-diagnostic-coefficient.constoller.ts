import { Request, Response } from 'express';
import { Op, Sequelize } from "sequelize";

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';

import response from '../../utilities/responses';
import db from '../../db';
import { JobsRequest } from 'middlewares/get-employess-by-filters';
import getDiagnosticCoefficient from '../../middlewares/get-diagnostic-coefficient';
interface diagnosticTimeType {
    time: string;
}

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {
        let diagnosticTime: diagnosticTimeType[] = [];
        
        const numberEmployees = await db.Employees.findOne({
            where: {id: req.params.id}
        })

        if ( !numberEmployees ) {
            return response(req, res, rs[404], sm.employeesNotFound);
        }

        const result = await getDiagnosticCoefficient(req.params.id, req.params.brand, req.params.type);

        return response(req, res, rs[200], sm.ok, result);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
