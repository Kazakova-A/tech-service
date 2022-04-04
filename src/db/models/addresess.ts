import { Generic, JobStatuses } from '../types';

export interface AddresessData extends Generic {
  customerId: number;
  type: string;
  street: string;
  streetLine2: string | null;
  city: string;
  state: string;
  zip: number;
  country: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Addresess',
  {
    customerId: {
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        key: 'id',
        model: 'Customers',
      },
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    streetLine2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.INTEGER,
    },
    country: {
      type: DataTypes.STRING,
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
    tableName: 'Addresess',
    timestamps: true,
  },
);
