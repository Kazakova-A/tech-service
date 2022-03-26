import { Generic } from '../types';

export interface TypesData extends Generic {
  value: string;
  label: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Types',
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
    tableName: 'Types',
    timestamps: true,
  },
);