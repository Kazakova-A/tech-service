import {
    BRANDS,
    TYPES,
    DEFAULT_ZIP,
} from './constants';

import { TIMEZONE } from '../config';
import { JobStatuses } from './types';
import db from 'db';
import generate from '../utilities/generator';
import moment = require('moment');
import getSeconds from 'utilities/get-seconds';

export default async () => {
    const now = getSeconds();
    const listEmployees = [...generate(3)];
    const employeesPromises = listEmployees.map((item, index) => {
        return db.Employees.create({
            zip: index === 1 ? DEFAULT_ZIP : (DEFAULT_ZIP + index),
            firstName: `Peter the ${index}`,
            lastName: `Romanov`,
            email: `dummy${index}@example.com`,
            startTime: 8,
            endTime: 16,
            timezone: TIMEZONE,
            created: now,
            updated: now,
        })
    });

    const employees = await Promise.all(employeesPromises);
    const spentTime = () => Math.floor(Math.random() * 40) + 40;
    const usedBrend = () => BRANDS[Math.floor(Math.random() * 40)];
    const usedTypes = () => TYPES[Math.floor(Math.random() * 11)];
    const listJobs = [...generate(20)];
    const workTime = [8, 10, 12, 14];

    const employeeJobs = employeesPromises.map((employeesItem: any, index: number) => {
        let day = 1;
        const scheduledStart = () => Math.floor(moment.utc(now).subtract(day, 'day').add(workTime[index % 4], 'hours').valueOf() / 1000);
        const scheduledEnd = () => Math.floor(moment.utc(now).subtract(day, 'day').add(workTime[index % 4] + 2, 'hours').valueOf() / 1000);

        listJobs.map((job: any, index: number) => {
            db.Jobs.create({
                customerId: index,
                workStatus: JobStatuses.scheduled,
                startedAt: null,
                completedAt: null,
                diagnosticSpentTime: spentTime(),
                brand: usedBrend(),
                scheduledStart: scheduledStart(),
                scheduledEnd: scheduledEnd,
                technicTypes: usedTypes(),
                employeeId: employeesItem.id,
                created: now,
                updated: now,
            })
            if ((index + 1) % 4 === 0) {
                day += 1
            };
        })
    });
}
