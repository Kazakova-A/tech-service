import { Generic } from '../types';

export interface BrandsData extends Generic {
  value: string;
  label: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Brands',
  {
    value: {
      type: DataTypes.STRING,
    },
    label: {
      type: DataTypes.STRING,
    },
    created: {
      type: DataTypes.INTEGER,
    },
    updated: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'Brands',
    timestamps: true,
  },
);
