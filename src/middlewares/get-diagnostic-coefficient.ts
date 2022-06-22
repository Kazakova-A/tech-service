import db from '../db';
import { Op, Sequelize } from "sequelize";

interface diagnosticTimeType {
    time: string;
}

export interface ReqQuery {
    employee_ids: number[];
    brand: string;
    type: string;
}

interface resultType {
    diagnosticCoef: number,
    message: string,
}

const getDiagnosticCoefficient = async (employeeId: string | number, brand: string, technicTypes: string) => {
    try {
        let diagnosticTime: diagnosticTimeType[] = [];
        let result: resultType;

        const numberJobForEmployeesBrandAndType = await db.Jobs.count({
            where: {
                [Op.and]: [
                    { employeeId: employeeId },
                    { brand: brand },
                    { technicTypes: technicTypes },
                    { workStatus: 'completed' }
                ]
            }
        })

        const numberJobForEmployeesBrand = await db.Jobs.count({
            where: {
                [Op.and]: [
                    { employeeId: employeeId },
                    { brand: brand },
                    { workStatus: 'completed' }
                ]
            }
        })

        const numberJobForEmployees = await db.Jobs.count({
            where: {
                [Op.and]: [
                    { employeeId: employeeId },
                    { workStatus: 'completed' }
                ]
            }
        })

        const avgDiagnosticTime = (diagnosticTime: diagnosticTimeType[]) => {
            return diagnosticTime.reduce((sum, current) => (sum + Number(current.time)), 0) / diagnosticTime.length;
        };

        if (numberJobForEmployeesBrandAndType > 9) {
            diagnosticTime = await db.Jobs.findAll({
                where: {
                    [Op.and]: [
                        { employeeId: employeeId },
                        { brand: brand },
                        { technicTypes: technicTypes },
                        { workStatus: 'completed' }
                    ]
                },
                group: ['Jobs.id'],
                order: [
                    ['scheduledEnd', 'DESC']
                ],
                limit: 10,
                attributes: [[Sequelize.fn(`ROUND`, Sequelize.fn('avg', Sequelize.col('diagnosticSpentTime'))), 'time']]
            })
            result = {
                diagnosticCoef: avgDiagnosticTime(diagnosticTime),
                message: 'employee has completed 10 or more orders of this brand and this type',
            };

            return result
        } else if (numberJobForEmployeesBrand > 9) {
            diagnosticTime = await db.Jobs.findAll({
                where: {
                    [Op.and]: [
                        { employeeId: employeeId },
                        { brand: brand },
                        { workStatus: 'completed' }
                    ]
                },
                group: ['Jobs.id'],
                order: [
                    ['scheduledEnd', 'DESC']
                ],
                limit: 10,
                attributes: [[Sequelize.fn(`ROUND`, Sequelize.fn('avg', Sequelize.col('diagnosticSpentTime'))), 'time']]
            })
            result = {
                diagnosticCoef: avgDiagnosticTime(diagnosticTime),
                message: 'employee has completed 10 or more orders of this brand',
            };

            return result
        } else if (numberJobForEmployees > 9) {
            diagnosticTime = await db.Jobs.findAll({
                where: {
                    [Op.and]: [
                        { employeeId: employeeId },
                        { workStatus: 'completed' }
                    ]
                },
                group: ['Jobs.id'],
                order: [
                    ['scheduledEnd', 'DESC']
                ],
                limit: 10,
                attributes: [[Sequelize.fn('avg', Sequelize.col('diagnosticSpentTime')), 'time']]
            })
            result = {
                diagnosticCoef: avgDiagnosticTime(diagnosticTime),
                message: 'average for the last 10  orders',
            };

            return result
        } else {
            result = {
                diagnosticCoef: 80,
                message: 'the employee completed less than 10 orders',
            };

            return result
        }
    } catch (error) {
        return error
    }
};

export default getDiagnosticCoefficient;