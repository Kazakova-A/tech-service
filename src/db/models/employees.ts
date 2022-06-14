import { Generic } from '../types';

export interface EmployeesData extends Generic {
  crmEmployeeId: string,
  role: string;
  zip: number;
  avatarUrl: string;
  colorHex: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  startTime: number;
  endTime: number;
  timezone: string;
  tags: string;
};


export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Employees',
  {
    crmEmployeeId: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.INTEGER,
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
    colorHex: {
      type: DataTypes.STRING,
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
    mobileNumber: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.INTEGER,
    },
    endTime: {
      type: DataTypes.INTEGER,
    },
    timezone: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    tags: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Employees',
    timestamps: true,
  },
);
