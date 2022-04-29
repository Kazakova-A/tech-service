import { Generic, JobStatuses } from '../types';

export interface JobsData extends Generic {
  customerId: number;
  workStatus: JobStatuses;
  startedAt: number | null;
  completedAt: number | null;
  employeeId: number;
  diagnosticSpentTime: number | null;
  brand: string;
  scheduledStart: number | null;
  scheduledEnd: number | null;
  technicTypes: string;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Jobs',
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
    workStatus: {
      type: DataTypes.STRING,
    },
    startedAt: {
      type: DataTypes.BIGINT,
    },
    completedAt: {
      type: DataTypes.BIGINT,
    },
    scheduledStart: {
      type: DataTypes.BIGINT,
    },
    scheduledEnd: {
      type: DataTypes.BIGINT,
    },
    diagnosticSpentTime: {
      type: DataTypes.BIGINT,
    },
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
    brand: {
      type: DataTypes.STRING,
    },
    technicTypes: {
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
    tableName: 'Jobs',
    timestamps: true,
  },
);
