import { Generic } from '../types';

export interface EmployeesData extends Generic {
  zip: number;
  firstName: string;
  lastName: string;
  email: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Employees',
  {
    zip: {
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    created: {
      type: DataTypes.INTEGER,
    },
    updated: {
      type: DataTypes.INTEGER,
    },
 
  },
  {
    tableName: 'Employees',
    timestamps: true,
  },
);
