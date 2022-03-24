import { Generic } from '../types';

export interface supportedTechniqueData extends Generic {
  employeeId: number;
  techniqueId: number
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'SupportedTechnique',
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
      techniqueId: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'Technique',
        },
        type: DataTypes.INTEGER,
      },
      created: {
        type: DataTypes.INTEGER,
      },
      updated: {
        type: DataTypes.INTEGER,
      },
  },
  {
    tableName: 'SupportedTechnique',
    timestamps: true,
  },
);