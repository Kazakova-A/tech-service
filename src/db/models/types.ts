import { Generic } from '../types';

export interface TypesData extends Generic {
  name: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Types',
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
    tableName: 'Types',
    timestamps: true,
  },
);