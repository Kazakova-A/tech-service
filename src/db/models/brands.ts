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