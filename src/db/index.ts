import { DataTypes, Op, Sequelize } from 'sequelize';

import { DATABASE } from '../config';

// models
import Employees, { EmployeesData } from './models/employees';
import Brands, { BrandsData } from './models/brands';
import Technique, { TechniqueData } from './models/technique';
import SupportedBrands, { SupportedBrandsData } from './models/supportedBrands';
import SupportedTechnique, { supportedTechniqueData } from './models/supportedTechnique';

// export model interfaces
export {
  EmployeesData,
  BrandsData,
  TechniqueData,
  SupportedBrandsData,
  supportedTechniqueData,
};

const {
  host,
  logging,
  port,
} = DATABASE;

const db: any = {};

// create the connection
const connection = new Sequelize(DATABASE.databaseUrl, {
  dialect: 'postgres',
  host,
  logging,
  pool: {
    idle: 30000,
    max: 100,
  },
  port,
  dialectOptions: {
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false,
    }
  }
},)


// model connection
db.Employees = Employees(connection, DataTypes);
db.Brands = Brands(connection, DataTypes);
db.Technique = Technique(connection, DataTypes);
db.SupportedBrands = SupportedBrands(connection, DataTypes);
db.SupportedTechnique = SupportedTechnique(connection, DataTypes);



// create associations
Object.keys(db).forEach(
  (modelName: string): void => db[modelName].associate && db[modelName].associate(db),
);

db.connection = db.database = db.sequelize = connection;
db.Op = Op;
db.Sequelize = Sequelize;

export default db;
