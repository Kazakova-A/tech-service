import { Op } from "sequelize";
import db from '../db';
import * as moment from 'moment-timezone';
import { addressParentType } from '../db/types'

const getCurentAddress = async (employeeId: string | number) => {
    const timeLastJobForEmployees = await db.Jobs.findOne({
        where: {
            [Op.and]: [
                {employeeId},
                {workStatus: 
                    { [Op.or]: ['in_progress', 'completed']}
                }
            ]
        },
        order: [
            ['scheduledStart', 'DESC']
        ]
    })

    if (!timeLastJobForEmployees) {
        const currentAddress = await db.Addresses.findOne({
            where: {
                [Op.and]: [
                    { parentType: addressParentType.Employees },
                    { parentId: employeeId }
                ]
            }
        })

        return currentAddress;
    }

    const midnightToday = Math.floor(moment.utc(new Date()).startOf('day').valueOf() / 1000)

    const addressOwnerId = timeLastJobForEmployees.scheduledEnd < midnightToday 
        ? timeLastJobForEmployees.employeeId 
        : timeLastJobForEmployees.customerId;
    const addressOwnerType = timeLastJobForEmployees.scheduledEnd < midnightToday 
        ? addressParentType.Employees 
        : addressParentType.Customer;
    const currentAddress = await db.Addresses.findOne({
        where: {
            [Op.and]: [
                { parentType: addressOwnerType },
                { parentId: addressOwnerId }
            ]
        }
    })

    return currentAddress;
};

export default getCurentAddress;