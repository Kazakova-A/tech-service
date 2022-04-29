import { Generic, JobStatuses } from '../types';

export interface AddresessData extends Generic {
  street: string;
  houseNumber: number;
  city: string;
  state: string;
  adressId: number;
  adressType: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Addresess',
  {
    street: {
      type: DataTypes.STRING,
    },
    houseNumber: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    adressId: {
      type: DataTypes.INTEGER,
    },
    adressType: {
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
    tableName: 'Addresess',
    timestamps: true,
  }
  );
