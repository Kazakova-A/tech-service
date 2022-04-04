import { Generic } from '../types';

export interface CustomersData extends Generic {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  homeNumber: string;
  workNumber: string;
  company: string;
  notificationEnabled: boolean;
  tags: any; // TODO: set valid format
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Customers',
  { 
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
    homeNumber: {
      type: DataTypes.STRING,
    },
    workNumber: {
      type: DataTypes.STRING,
    },
    company: {
      type: DataTypes.STRING,
    },
    notificationEnabled: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    tags: {
      type: DataTypes.STRING, // TODO: set valid format
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
    tableName: 'Customers',
    timestamps: true,
  },
);
