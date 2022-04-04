import { Generic } from '../types';

export interface SupportedTypesData extends Generic {
  employeeId: number;
  typeId: number
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'SupportedTypes',
  {
      employeeId: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'Employees',
        },
        type: DataTypes.INTEGER,
      },
      typeId: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'Types',
        },
        type: DataTypes.INTEGER,
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
    tableName: 'SupportedTypes',
    timestamps: true,
  },
);
