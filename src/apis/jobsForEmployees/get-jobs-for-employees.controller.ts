import { Request, Response } from 'express';

import response from '../../utilities/responses';
import {
  RESPONSE_STATUSES as rs,
  SERVER_MESSAGES as sm,
  TIMEZONE,
} from '../../config';
import db from '../../db';
import { JobStatuses } from '../../db/types';
import { BRANDS, DEFAULT_ZIP, TYPES } from '../../db/constants';
import generate from '../../utilities/generator';
import * as moment from 'moment-timezone';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const listEmployees = [...generate(3)];

    const employeesPromises = listEmployees.map((item, index) => {
      return db.Employees.create({
        zip: DEFAULT_ZIP,
        firstName: `Peter the ${index}`,
        lastName: `Romanov`,
        email: `dummy${index}@example.com`,
        startTime: 8,
        endTime: 16,
        timezone: TIMEZONE,
        role: 'role',
      })
    });

    const employees = await Promise.all(employeesPromises);

    const employeeAddresses = employees.map((employeesItem: any) => {
      db.Addresess.create({
        street: `Clinton Rd`,
        city: 'Los Altos',
        state: 'CA',
        zip: 94022,
        country: 'USA',
        parentId: employeesItem.id,
        parentType: "employee",
      })
    })

    await Promise.all(employeeAddresses);

    const customer = await db.Customers.create({
        firstName: `Crisital the 1`,
        lastName: `Petrov`,
        email: `user1@example.com`,
      })

    const spentTime = () => Math.floor(Math.random() * 40) + 40;
    const usedBrend = () => BRANDS[Math.floor(Math.random() * 40)];
    const usedTypes = () => TYPES[Math.floor(Math.random() * 11)];
    const listJobs = [...generate(20)];
    const workTime = [8, 10, 12, 14];

    const brand = () => Math.floor(Math.random() * 41) + 1;
    const types = () => Math.floor(Math.random() * 11) + 1;

    const employeeJobs = employees.map((employeesItem: any, index: number) => {
      let day = 1;
      const scheduled = (timeToWork:number, indexJob:number) => {
        const now = new Date();

        return Math.floor(moment.utc(now).startOf('day').subtract(day, 'days').hours(workTime[indexJob % 4]+timeToWork).valueOf() / 1000)
      };

      const jobsPromises = listJobs.map(async(job: any, index: number) => {
        const draftJob = await db.Jobs.create({
          customerId: customer.id,
          workStatus: JobStatuses.completed,
          startedAt: null,
          completedAt: null,
          diagnosticSpentTime: spentTime(),
          brand: usedBrend(),
          scheduledStart: scheduled(0, index),
          scheduledEnd: scheduled(2, index),
          technicTypes: usedTypes(),
          employeeId: employeesItem.id,
          name: 'name',
          description: 'description',
          notes: 'notes',
          total_amount: 0,
          outstanding_balance: 0,
          tags: 'tags',
        })
        if ((index + 1) % 4 === 0) {
          day += 1;
        };

        await db.Addresess.create({
          street: `street${index}`,
          houseNumber: `houseNumber ${index}`,
          city: `city${index}`,
          state: `state${index}`,
          zip: 94022,
          parentId: draftJob.id,
          parentType: 'Job',
        });
    
        await db.SupportedBrands.create({
            brandId: brand(),
            employeeId: employeesItem.id,
        });
        await db.SupportedBrands.create({
            brandId: brand(),
            employeeId: employeesItem.id,
        });
    
        await db.SupportedTypes.create({
            typeId: types(),
            employeeId: employeesItem.id,
        });
        await db.SupportedTypes.create({
            typeId: types(),
            employeeId: employeesItem.id,
        });

        return draftJob;
      })
      return jobsPromises
    });

    return response(req, res, rs[200], sm.ok, employeeJobs);
  } catch (error) {
        return response(req, res, rs[500], sm.internalServerError, error);
  }
}
