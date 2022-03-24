import { BRANDS, TECHNIQUE, DEFAULT_ZIP } from './constants';

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
    const list = [...generate(50)];

    const employeesPromises = list.map((item, index) => (
      db.Employees.create({
        zip: (DEFAULT_ZIP + index),
        firstName: `Peter the ${index}`,
        lastName: `Romanov`,
        email: `dummy${index}@example.com`,
        created: now,
        updated: now,
      })
    ));

    const employees = await Promise.all(employeesPromises)

   
    const brandCreatorsPromises = BRANDS.map(brand => db.Brands.create({
      name: brand,
      created: now,
      updated: now,
    }));

    const techniqueCreatorsPromises = TECHNIQUE.map(technique => db.Technique.create({
      name: technique,
      created: now,
      updated: now,
    }));

    await Promise.all([...brandCreatorsPromises, ...techniqueCreatorsPromises])
    await Promise.all([...brandCreatorsPromises, ...techniqueCreatorsPromises])
    
    const brandsAndTypes = [...generate(42)];

    const supportedBrandsPromises = brandsAndTypes.map((item) => (
        db.SupportedBrands.create({
        brandId: item,
        employeeId: employees[0].id,
        created: now,
        updated: now,
      })
    ));

    const supportedTechniquePromises = brandsAndTypes.map((item) => (
      db.SupportedTechnique.create({
      techniqueId: item,
      employeeId: employees[0].id,
      created: now,
      updated: now,
    })
  ));

  await Promise.all(supportedBrandsPromises)

    return log('-- database: seeding is done');
  } catch (error) {
    throw new Error(error);
  }
};
