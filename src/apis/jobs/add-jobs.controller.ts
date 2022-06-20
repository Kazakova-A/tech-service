import { Request, Response } from 'express';

import {
    RESPONSE_STATUSES as rs,
    SERVER_MESSAGES as sm,
} from '../../config';
import response from '../../utilities/responses';
import db from '../../db';
import { JobStatuses } from '../../db/types';
import { addressParentType } from '../../db/types'

export default async (req: Request, res: Response) => {
    try {
        const {
            customerId,
            scheduledEnd,
            employeeId,
            brand,
            technicTypes,
            scheduledStart,
            workStatus,
            startedAt
        } = req.body
        if (!(
            technicTypes
            || brand
            || customerId
            || scheduledEnd
            || employeeId
            || scheduledStart
            || workStatus
            || startedAt
        )) {
            return response(req, res, rs[400], sm.missingData);
        }
        const addedJob = await db.Jobs.create({
            customerId,
            scheduledEnd,
            employeeId,
            brand,
            technicTypes,
            scheduledStart,
            workStatus: JobStatuses.scheduled,
            startedAt: null
        });

        const rundomNumber = () => Math.floor(Math.random() * 100);

        const addedAddressForJob = await db.Addresses.create({
            street: `street ${rundomNumber()}`,
            houseNumber: `houseNumber ${rundomNumber()}`,
            city: `city ${rundomNumber()}`,
            state: `state ${rundomNumber()}`,
            parentId: addedJob.id,
            parentType: addressParentType.Job,
            zip: 94022,
            country: `country ${rundomNumber()}`
        })

        return response(req, res, rs[200], sm.ok, addedJob);
    } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
    }
}
