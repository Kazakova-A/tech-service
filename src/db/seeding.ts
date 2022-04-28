import {
  BRANDS,
  TYPES,
  DEFAULT_ZIP,
  JOBS_MOCK_DATA,
  ADDRESESSDATA,
} from './constants';
import { TIMEZONE } from '../config';
import log from '../utilities/log';
import getSeconds from '../utilities/get-seconds';
import generate from '../utilities/generator';

export default async (db: any, seeding: boolean = false): Promise<Error | void> => {
  try {
    const now = getSeconds();

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
    const list = [...generate(15)];

    const addresessCreatorPromises = ADDRESESSDATA.map(addres => db.Addresess.create({
      street: addres.street,
      houseNumber: addres.houseNumber,
      city: addres.city,
      state: addres.state,
      adressId: addres.adressId,
      adressType: addres.adressType,
      created: now,
      updated: now,
    }));

    // create customers and their addresses
    const customersPromises = list.map((item, index) => (
      db.Customers.create({
        firstName: `Crisital the ${index}`,
        lastName: `Petrov`,
        email: `user${index}@example.com`,
        created: now,
        updated: now,
      })
    ));

    const [firstCustomer, secondCustomer] = await Promise.all(customersPromises);

    const createdAddresse = await Promise.all([
      db.Addresess.create({
        type: `billing`,
        street: `Almond Ave`,
        city: 'Los Altos',
        state: 'CA',
        zip: 94022,
        country: 'USA',
        created: now,
        updated: now,
      }),
      db.Addresess.create({
        type: `billing`,
        street: `Clinton Rd`,
        city: 'Los Altos',
        state: 'CA',
        zip: 94022,
        country: 'USA',
        created: now,
        updated: now,
      })
    ]);

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
        created: now,
        updated: now,
      })
    });

    const employees = await Promise.all(employeesPromises);

    const brandCreatorsPromises = BRANDS.map(brand => db.Brands.create({
      value: brand,
      label: brand.replace(/_/g, " ")
        .replace(/(?:^|\s)\S/g, (symbol) => symbol.toUpperCase()),
      created: now,
      updated: now,
    }));

    const typesCreatorsPromises = TYPES.map(type => {
      const typeStr = type.replace(/_/g, " ");
      return db.Types.create({
        value: type,
        label: typeStr.charAt(0).toUpperCase() + typeStr.slice(1),
        created: now,
        updated: now,
      })
    }
    );

    await Promise.all([...brandCreatorsPromises, ...typesCreatorsPromises]);

    const brands = [...generate(42)];
    const types = [...generate(12)];

    const supportedBrandsPromises = brands.map((item) => [
      db.SupportedBrands.create({
        brandId: item,
        employeeId: employees[0].id,
        created: now,
        updated: now,
      }),
      db.SupportedBrands.create({
        brandId: item,
        employeeId: employees[1].id,
        created: now,
        updated: now,
      })
    ]);

    const supportedTypesPromises = types.map((item) => [
      db.SupportedTypes.create({
        typeId: item,
        employeeId: employees[0].id,
        created: now,
        updated: now,
      }),
      db.SupportedTypes.create({
        typeId: item,
        employeeId: employees[1].id,
        created: now,
        updated: now,
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
        invoiceNumber: job.invoiceNumber,
        description: job.description,
        customerId: index === 1 ? firstCustomer.id : secondCustomer.id,
        note: job.note,
        workStatus: job.workStatus,
        onMyWayAt: job.onMyWayAt,
        startedAt: job.startedAt,
        completedAt: job.completedAt,
        scheduledStart: job.scheduledStart,
        scheduledEnd: job.scheduledEnd,
        arrivalWindow: job.arrivalWindow,
        totalAmount: job.totalAmount,
        outstandingBalance: job.outstandingBalance,
        employeeId: employessIds[index] as number,
        created: now,
        updated: now,
      })
    ));

    await Promise.all(jobPromises);

    return log('-- database: seeding is done');
  } catch (error) {
    throw new Error(error);
  }
};
