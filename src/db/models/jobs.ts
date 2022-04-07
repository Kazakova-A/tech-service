import { Generic, JobStatuses } from '../types';

export interface JobsData extends Generic {
  invoiceNumber: string;
  description: string;
  customerId: number;
  note: string | null;
  workStatus: JobStatuses;
  onMyWayAt: number | null;
  startedAt: number | null;
  completedAt: number | null;
  scheduledStart: number | null;
  scheduledEnd: number | null;
  arrivalWindow: number;
  totalAmount: number;
  outstandingBalance: number;
  employeeId: number;
};

export default (
  database: any,
  DataTypes: any,
) => database.define(
  'Jobs',
  {
    invoiceNumber: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
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
    note: {
      type: DataTypes.STRING,
    },
    workStatus: {
      type: DataTypes.STRING,
    },
    onMyWayAt: {
      type: DataTypes.BIGINT,
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
    arrivalWindow: {
      type: DataTypes.INTEGER,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
    },
    outstandingBalance: {
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