import { DataTypes, Op, Sequelize } from 'sequelize';

import { DATABASE } from '../config';

// models
import Employees, { EmployeesData } from './models/employees';

// export model interfaces
export { EmployeesData };

const {
  database,
  host,
  logging,
  password,
  port,
  username,
} = DATABASE;

const db: any = {};

// create the connection
const connection = new Sequelize(
  database,
  username,
  password,
  {
    dialect: 'postgres',
    host,
    logging,
    pool: {
      idle: 30000,
      max: 100,
    },
    port,
  },
);

// model connection
db.Employees = Employees(connection, DataTypes);


// create associations
Object.keys(db).forEach(
  (modelName: string): void => db[modelName].associate && db[modelName].associate(db),
);

db.connection = db.database = db.sequelize = connection;
db.Op = Op;
db.Sequelize = Sequelize;

export default db;
