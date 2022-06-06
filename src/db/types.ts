export interface Generic {
  id: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export enum JobStatuses {
  unscheduled ='unscheduled',
  scheduled ='scheduled',
  in_progress ='in_progress',
  completed ='completed',
}
