import { Request, Response } from 'express';

import response from '../utilities/responses';
import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
  TIMEZONE,
} from '../config';
import db from '../db';
import { JobStatuses } from '../db/types';
import { BRANDS, DEFAULT_ZIP, TYPES } from '../db/constants';
import getSeconds from '../utilities/get-seconds';
import generate from '../utilities/generator';
import moment = require('moment');

export default async (req: Request, res: Response): Promise<Response> => {
  try {
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

    const customersPromises = [1].map((item, index) => {
      return db.Customers.create({
        firstName: `Crisital the 1`,
        lastName: `Petrov`,
        email: `user1@example.com`,
        created: now,
        updated: now,
      })
    })

    const customers = await Promise.all(customersPromises);
    const spentTime = () => Math.floor(Math.random() * 40) + 40;
    const usedBrend = () => BRANDS[Math.floor(Math.random() * 40)];
    const usedTypes = () => TYPES[Math.floor(Math.random() * 11)];
    const listJobs = [...generate(20)];
    const workTime = [8, 10, 12, 14];

    const employeeJobs = employees.map((employeesItem: any, index: number) => {
      let day = 1;
      const scheduledStart = () => Math.floor(moment.utc(now).subtract(day, 'day').add(workTime[index % 4], 'hours').valueOf() / 1000);
      const scheduledEnd = () => Math.floor(moment.utc(now).subtract(day, 'day').add(workTime[index % 4] + 2, 'hours').valueOf() / 1000);

      const jobsPromises = listJobs.map((job: any, index: number) => {
        const jobPromise = db.Jobs.create({
          customerId: customers[0].id,
          workStatus: JobStatuses.completed,
          startedAt: null,
          completedAt: null,
          diagnosticSpentTime: spentTime(),
          brand: usedBrend(),
          scheduledStart: scheduledStart(),
          scheduledEnd: scheduledEnd(),
          technicTypes: usedTypes(),
          employeeId: employeesItem.id,
          created: now,
          updated: now,
        })
        if ((index + 1) % 4 === 0) {
          day += 1
        };
        return jobPromise;
      })
      return jobsPromises
    });
    await Promise.all(employeeJobs[0])
    await Promise.all(employeeJobs[1])
    await Promise.all(employeeJobs[2])

    return response(req, res, rs[200], sm.ok,);
  } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
  }
}
