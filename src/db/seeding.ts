import { BRANDS, TYPES, DEFAULT_ZIP } from './constants';

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
    const list = [...generate(50)];

    const employeesPromises = list.map((item, index) => (
      db.Employees.create({
        zip: index === 1 ? DEFAULT_ZIP : (DEFAULT_ZIP + index),
        firstName: `Peter the ${index}`,
        lastName: `Romanov`,
        email: `dummy${index}@example.com`,
        created: now,
        updated: now,
      })
    ));

    const employees = await Promise.all(employeesPromises)
   
    const brandCreatorsPromises = BRANDS.map(brand => db.Brands.create({
      value: brand,
      label: brand.replace(/_/g, " ")
        .replace(/(?:^|\s)\S/g, (symbol) => symbol.toUpperCase()),
      created: now,
      updated: now,
    }));

    const typesCreatorsPromises = TYPES.map(type => {
      const typeStr =  type.replace(/_/g, " ");
      return  db.Types.create({
        value: type,
        label: typeStr.charAt(0).toUpperCase() + typeStr.slice(1),
        created: now,
        updated: now,
      })}
    );

    await Promise.all([...brandCreatorsPromises, ...typesCreatorsPromises])
    
    const brands = [...generate(42)];
    const types = [...generate(12)];

    const supportedBrandsPromises = brands.map((item) => (
        db.SupportedBrands.create({
        brandId: item,
        employeeId: employees[0].id,
        created: now,
        updated: now,
      })
    ));

    const supportedTypesPromises = types.map((item) => (
      db.SupportedTypes.create({
      typeId: item,
      employeeId: employees[0].id,
      created: now,
      updated: now,
    })
  ));

  await Promise.all([...supportedBrandsPromises, ...supportedTypesPromises])

    return log('-- database: seeding is done');
  } catch (error) {
    throw new Error(error);
  }
};
