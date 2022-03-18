import log from '../utilities/log';
import { EMPLOYEE_DATA,  } from '../config';
import getSeconds from '../utilities/get-seconds';

export default async (db: any, seeding: boolean = false): Promise<Error | void> => {
  try {
    const now = getSeconds();

    if (!seeding) {
      return log('-- database: seeding is disabled');
    }

    // check if seeding was already done
    const Employees = await db.Employees.findOne({
      where: {
        zip: EMPLOYEE_DATA.zip,
        technique: EMPLOYEE_DATA.technique,
        brands: EMPLOYEE_DATA.brands,
        isDeleted: false,
      },
    });

    if (Employees) {
      return log('-- database: seeding is not required');
    }

    // do the seeding
    await db.Employees.create({
      zip: EMPLOYEE_DATA.zip,
      technique: EMPLOYEE_DATA.technique,
      brands: EMPLOYEE_DATA.brands,
      created: now,
      updated: now,
    });

    return log('-- database: seeding is done');
  } catch (error) {
    throw new Error(error);
  }
};
