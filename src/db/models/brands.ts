import { Generic } from '../types';

export interface BrandsData extends Generic {
  name: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Brands',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Brands',
    timestamps: true,
  },
);