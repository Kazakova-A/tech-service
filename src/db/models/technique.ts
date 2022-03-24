import { Generic } from '../types';

export interface TechniqueData extends Generic {
  name: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Technique',
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
    tableName: 'Technique',
    timestamps: true,
  },
);