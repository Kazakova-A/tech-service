import { Request, Response } from 'express';
import { Op } from "sequelize";
import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../config';
import response from '../utilities/responses';
import db from '../db';
import { JobsRequest } from './get-employess-by-filters';
import getFirstDays from '../utilities/get-first-three-days';


export default async (req: JobsRequest, res: Response, next: any): Promise<Response> => {
    try {
        const {
            employees,
        } = req;

        const nextThreeDays = getFirstDays();

        const ids = employees.map(({ id }) => id)

        const firstDayJobs = await db.Jobs.findAll({
            where: {
                employeeId: {[Op.in]: ids},
                workStatus: { [Op.or]: ['scheduled', 'in_progress']},
                [Op.and]: [
                    { scheduledStart: { [Op.gte]: nextThreeDays.firstDay } },
                    { scheduledEnd: { [Op.lte]: nextThreeDays.secondDay } },
                ]
            }
        })

        const secondDayJobs = await db.Jobs.findAll({
            where: {
                employeeId: {[Op.in]: ids},
                workStatus: { [Op.or]: ['scheduled', 'in_progress']},
                [Op.and]: [
                    { scheduledStart: { [Op.gte]: nextThreeDays.secondDay } },
                    { scheduledEnd: { [Op.lte]: nextThreeDays.thirdDay } },
                ]
            }
        })

        const thirsDayJobs = await db.Jobs.findAll({
            where: {
                employeeId: {[Op.in]: ids},
                workStatus: { [Op.or]: ['scheduled', 'in_progress']},
                [Op.and]: [
                    { scheduledStart: { [Op.gte]: nextThreeDays.thirdDay } },
                    { scheduledEnd: { [Op.lte]: nextThreeDays.end } },
                ]
            }
        })

        const jobs = {
            [String(nextThreeDays.firstDay)]: firstDayJobs,
            [String(nextThreeDays.secondDay)]: secondDayJobs,
            [String(nextThreeDays.thirdDay)]: thirsDayJobs,
        }

        req.jobs = jobs;
        req.nextThreeDays = nextThreeDays;

        return next();
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
