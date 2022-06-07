import { Request, Response } from 'express';
import { Op } from "sequelize";

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';

import response from '../../utilities/responses';
import db from '../../db';
import { JobsRequest } from 'middlewares/get-employess-by-filters';

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {

        const timeNextJobForEmployees = await db.Jobs.findOne({
            where: {
                [Op.and]: [
                    {employeeId: req.params.id},
                    {workStatus: 'scheduled'}
                ]
            },
            order: [
                ['scheduledStart', 'ASC']
            ]
        })

        const nextAddress = await db.Addresess.findOne({
            where: {
                [Op.and]: [
                    { parentType: "customer" },
                    { parentId: timeNextJobForEmployees.customerId }
                ]
            }
        })

        return response(req, res, rs[200], sm.ok, nextAddress);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
