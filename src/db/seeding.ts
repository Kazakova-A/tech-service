import {
  BRANDS,
  TYPES,
  DEFAULT_ZIP,
  JOBS_MOCK_DATA,
  ADDRESSESDATA,
} from './constants';
import { TIMEZONE } from '../config';
import log from '../utilities/log';
import generate from '../utilities/generator';
import { addressParentType } from './types'

export default async (db: any, seeding: boolean = false): Promise<Error | void> => {
  try {

    if (!seeding) {
      return log('-- database: seeding is disabled');
    }

    // check if seeding was already done
    const Employees = await db.Employees.findOne({
      where: {
        isDeleted: false,
      },
    });

    if (Employees) {
      return log('-- database: seeding is not required');
    }

    // do the seeding

    // create customers 

    const list = [...generate(15)];

    const customersPromises = list.map((item, index) => (
      db.Customers.create({
        firstName: `Crisital the ${index}`,
        lastName: `Petrov`,
        email: `user${index}@example.com`,
        mobileNumber: `+1(454)322-44-${index}`,
        homeNumber: `45-22-34`,
        workNumber: `88-88-88`,
      })
    ));
    const сustomers = await Promise.all(customersPromises);

    // create Addresses for сustomers

    const addressesCustomerPromises = сustomers.map(( сustomer, index ) => db.Addresses.create({
      street: `Almond Ave ${index}`,
      houseNumber: `№ ${index}`,
      city: `Seed customer ${index}`,
      state: `CA ${index}`,
      zip: 94022,
      parentId: сustomer.id,
      parentType: addressParentType.Customer,
    }));
    await Promise.all(addressesCustomerPromises);

    // create employees
    const TIME_VARIANTS = {
      startOne: 8,
      startTwo: 16,
      endOne: 14,
      endTwo: 18,
    }

    const employeesPromises = list.map((item, index) => {
      const workVariantCheck = !!(item % 2);
      const startTime = workVariantCheck || item === 2 ? TIME_VARIANTS.startOne : TIME_VARIANTS.startTwo;
      const endTime = workVariantCheck || item === 2 ? TIME_VARIANTS.endOne : TIME_VARIANTS.endTwo;

      return db.Employees.create({
        zip: index === 1 ? DEFAULT_ZIP : (DEFAULT_ZIP + index),
        firstName: `Peter the ${index}`,
        lastName: `Romanov`,
        email: `dummy${index}@example.com`,
        startTime,
        endTime,
        timezone: TIMEZONE,
        role: 'role',
      })
    });
    const employees = await Promise.all(employeesPromises);

    // create Addresses for emploees

    const addressesEmploeesPromises = сustomers.map(( emploees, index ) => db.Addresses.create({
      street: `Eonky Rd ${index}`,
      houseNumber: `№ 5${index}`,
      city: `Seed Employees ${index}`,
      state: `CE ${index}`,
      zip: 94022,
      parentId: emploees.id,
      parentType: addressParentType.Employees,
    }));
    await Promise.all(addressesEmploeesPromises);

    // create BRANDS

    const brandCreatorsPromises = BRANDS.map(brand => db.Brands.create({
      value: brand,
      label: brand.replace(/_/g, " ")
        .replace(/(?:^|\s)\S/g, (symbol) => symbol.toUpperCase()),
    }));

    // create TYPES

    const typesCreatorsPromises = TYPES.map(type => {
      const typeStr = type.replace(/_/g, " ");
      return db.Types.create({
        value: type,
        label: typeStr.charAt(0).toUpperCase() + typeStr.slice(1),
      })
    }
    );
    await Promise.all([...brandCreatorsPromises, ...typesCreatorsPromises]);

    const brands = [...generate(42)];
    const types = [...generate(12)];


    // create SupportedBrands for employees

    const supportedBrandsPromises = brands.map((item) => [
      db.SupportedBrands.create({
        brandId: item,
        employeeId: employees[0].id,
      }),
      db.SupportedBrands.create({
        brandId: item,
        employeeId: employees[1].id,
      })
    ]);

    // create SupportedTypes for employees

    const supportedTypesPromises = types.map((item) => [
      db.SupportedTypes.create({
        typeId: item,
        employeeId: employees[0].id,
      }),
      db.SupportedTypes.create({
        typeId: item,
        employeeId: employees[1].id,
      }),
    ]
    );
    await Promise.all([...supportedBrandsPromises, ...supportedTypesPromises]);

    // create jobs
    const employessIds: { [key: number]: number } = {
      0: 1,
      1: 1,
      2: 2,
      3: 1,
      4: 1,
      5: 2,
    }
    const jobPromises = JOBS_MOCK_DATA.map((job: any, index: number) => (
      db.Jobs.create({
        customerId: сustomers[index].id as number,
        workStatus: job.workStatus,
        startedAt: job.startedAt,
        completedAt: job.completedAt,
        diagnosticSpentTime: job.diagnosticSpentTime,
        brand: job.brand,
        scheduledStart: job.scheduledStart,
        scheduledEnd: job.scheduledEnd,
        technicTypes: job.technicTypes,
        employeeId: employees[index].id as number,
        name: job.name,
        description: job.description,
        notes: job.notes,
        total_amount: job.total_amount,
        outstanding_balance: job.outstanding_balance,
        tags: job.tags,
      })
    ));
    const jobs = await Promise.all(jobPromises);

    // create Addresses for job

    const addressesJobPromises = jobs.map(( job, index ) => db.Addresses.create({
      street: `street${index}`,
      houseNumber: `houseNumber ${index}`,
      city: `seed job ${index}`,
      state: `state${index}`,
      zip: 94022,
      parentId: job.id,
      parentType: addressParentType.Job,
    }));
    await Promise.all(addressesJobPromises);

    return log('-- database: seeding is done');
  } catch (error) {
    throw new Error(error);
  }
};
