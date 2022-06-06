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
    isDeleted: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'Brands',
    timestamps: true,
  },
);
