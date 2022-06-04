import { Generic } from '../types';

export interface SupportedBrandsData extends Generic {
  employeeId: number;
  brandId: number
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'SupportedBrands',
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
      brandId: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'Brands',
        },
        type: DataTypes.INTEGER,
      },
      isDeleted: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
  },
  {
    tableName: 'SupportedBrands',
    timestamps: true,
  },
);
