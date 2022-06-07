import { Generic } from '../types';

export interface CustomersData extends Generic {
  crmCustomersId: string,
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  homeNumber: string;
  workNumber: string;
  company: string;
  notificationEnabled: boolean;
  tags: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Customers',
  {
    crmCustomersId:{
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
      type: DataTypes.STRING,
    },
    isDeleted: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'Customers',
    timestamps: true,
  },
);
