import { Request, Response } from 'express';
import { Op, Sequelize } from "sequelize";

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';

import response from '../../utilities/responses';
import db from '../../db';
import { JobsRequest } from 'middlewares/get-employess-by-filters';
interface diagnosticTimeType {
    time: string;
}

export default async (req: JobsRequest, res: Response): Promise<Response> => {
    try {
        let diagnosticTime: diagnosticTimeType[] = [];
        let result: number = 0;

        const numberEmployees = await db.Employees.findOne({
            where: {id: req.params.id}
        })

        if ( !numberEmployees ) {
            return response(req, res, rs[404], sm.employeesNotFound);
        }

        const numberJobForEmployeesBrandAndType = await db.Jobs.count({
            where: {
                [Op.and]: [
                    {employeeId: req.params.id},
                    {brand: req.params.brand},
                    {technicTypes: req.params.type},
                    {workStatus: 'completed'}
                ]
            }
        })

        const numberJobForEmployeesBrand = await db.Jobs.count({
            where: {
                [Op.and]: [
                    {employeeId: req.params.id},
                    {brand: req.params.brand},
                    {workStatus: 'completed'}
                ]
            }
        })

        const numberJobForEmployees = await db.Jobs.count({
            where: {
                [Op.and]: [
                    {employeeId: req.params.id},
                    {workStatus: 'completed'}
                ]
            }
        })

        const avgDiagnosticTime = ( diagnosticTime: diagnosticTimeType[]) =>  {
            return diagnosticTime.reduce((sum, current) => (sum + Number(current.time)), 0) / diagnosticTime.length;
        };

        if ( numberJobForEmployeesBrandAndType > 9 ) {
            diagnosticTime = await db.Jobs.findAll({
                where: {
                    [Op.and]: [
                        {employeeId: req.params.id},
                        {brand: req.params.brand},
                        {technicTypes: req.params.type},
                        {workStatus: 'completed'}
                    ]
                },
                group: ['Jobs.id'],
                order: [
                    ['scheduledEnd', 'DESC']
                ],
                limit: 10,
                attributes: [[Sequelize.fn(`ROUND`,  Sequelize.fn('avg', Sequelize.col('diagnosticSpentTime'))),'time']]
            })
            result = avgDiagnosticTime(diagnosticTime)
        } else if (numberJobForEmployeesBrand > 9) {
            diagnosticTime = await db.Jobs.findAll({
                where: {
                    [Op.and]: [
                        {employeeId: req.params.id},
                        {brand: req.params.brand},
                        {workStatus: 'completed'}
                    ]
                },
                group: ['Jobs.id'],
                order: [
                    ['scheduledEnd', 'DESC']
                ],
                limit: 10,
                attributes: [[Sequelize.fn(`ROUND`,  Sequelize.fn('avg', Sequelize.col('diagnosticSpentTime'))),'time']]
            })
            result = avgDiagnosticTime(diagnosticTime)
        } else if (numberJobForEmployees > 9) {
            diagnosticTime = await db.Jobs.findAll({
                where: {
                    [Op.and]: [
                        {employeeId: req.params.id},
                        {workStatus: 'completed'}
                    ]
                },
                group: ['Jobs.id'],
                order: [
                    ['scheduledEnd', 'DESC']
                ],
                limit: 10,
                attributes: [[Sequelize.fn('avg', Sequelize.col('diagnosticSpentTime')),'time']]
            })
            result = avgDiagnosticTime(diagnosticTime)
        } else {
            result = 80;
        }

        return response(req, res, rs[200], sm.ok, result);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
