import { Generic, JobStatuses } from '../types';

export interface AddressesData extends Generic {
  crmAddressId: string;
  street: string;
  houseNumber: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  parentId: number;
  parentType: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Addresses',
  {
    crmAddressId: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    houseNumber: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    parentId: {
      type: DataTypes.INTEGER,
    },
    parentType: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'Addresses',
    timestamps: true,
  }
  );
