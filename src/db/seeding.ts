import log from '../utilities/log';
import getSeconds from '../utilities/get-seconds';
import generate from '../utilities/generator';
import {
  BrandsData as BrandsInterface,
  TechniqueData as TechniqueInterface,
} from '../db';


export default async (db: any, seeding: boolean = false): Promise<Error | void> => {
  try {
    const now = getSeconds();
    const DEFAULT_ZIP = 11940;

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
    const list = [...generate(5)];
    for await (let i of list) {
      await db.Employees.create({
        zip: (DEFAULT_ZIP + i),
        firstName: `Peter the ${i}`,
        lastName: `Romanov`,
        email: `dummy${i}@example.com`,
        created: now,
        updated: now,
      });
    }

    await Promise.all([
    db.Brands.create({
      name: 'Samsung',
      created: now,
      updated: now,
    }),

    db.Technique.create({
      name: 'TV',
    }),

    db.SupportedBrands.create({
      brandId: 1,
      employeeId: 1,
    }),

    db.SupportedTechnique.create({
      techniqueId: 1,
      employeeId: 1,
    }),
  ])

    return log('-- database: seeding is done');
  } catch (error) {
    throw new Error(error);
  }
};
