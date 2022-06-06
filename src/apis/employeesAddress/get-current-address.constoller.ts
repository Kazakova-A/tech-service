import { Request, Response } from 'express';
import { Op } from "sequelize";

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';

import response from '../../utilities/responses';
import db from '../../db';
import { JobsRequest } from 'middlewares/get-employess-by-filters';
import moment = require('moment');


export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {

        const timeLastJobForEmployees = await db.Jobs.findOne({
            where: {
                [Op.and]: [
                    {employeeId: req.params.id},
                    {workStatus: 
                        { [Op.or]: ['in_progress', 'completed']}
                    }
                ]
            },
            order: [
                ['scheduledStart', 'DESC']
            ]
        })

        const midnightToday = Math.floor(moment.utc(new Date()).startOf('day').valueOf() / 1000)

        const addressOwnerId = timeLastJobForEmployees.scheduledEnd < midnightToday 
            ? timeLastJobForEmployees.employeeId 
            : timeLastJobForEmployees.customerId;
        const addressOwnerType = timeLastJobForEmployees.scheduledEnd < midnightToday 
            ? "employee" 
            : "customer";

            console.log(addressOwnerId);
            console.log(addressOwnerType);

        const currentAddress = await db.Addresess.findOne({
            where: {
                [Op.and]: [
                    { parentType: addressOwnerType },
                    { parentId: addressOwnerId }
                ]
            }
        })

        return response(req, res, rs[200], sm.ok, currentAddress);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
