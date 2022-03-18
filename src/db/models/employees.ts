import { Generic } from '../types';

export interface EmployeesData extends Generic {
  zip: number;
  technique: string;
  brands: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Users',
  {
    zip: {
      type: DataTypes.INTEGER,
    },
    technique: {
      type: DataTypes.STRING,
    },
    brands: {
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
    entity: {
      defaultValue: 'Employees',
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Employees',
    timestamps: true,
  },
);