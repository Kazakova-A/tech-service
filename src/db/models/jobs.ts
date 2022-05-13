import { Generic, JobStatuses } from '../types';

export interface JobsData extends Generic {
  customerId: number;
  workStatus: JobStatuses;
  startedAt: Date | null;
  completedAt: Date | null;
  employeeId: number;
  diagnosticSpentTime: number | null;
  brand: string;
  scheduledStart: Date | null;
  scheduledEnd: Date | null;
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
      type: DataTypes.DATE,
    },
    completedAt: {
      type: DataTypes.DATE,
    },
    scheduledStart: {
      type: DataTypes.DATE,
    },
    scheduledEnd: {
      type: DataTypes.DATE,
    },
    diagnosticSpentTime: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'Jobs',
    timestamps: true,
  },
);
