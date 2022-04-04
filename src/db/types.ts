export interface Generic {
  id: number;
  isDeleted: boolean;
  created: number;
  createdAt: string;
  updated: number;
  updatedAt: string;
};

export enum JobStatuses {
  unscheduled ='unscheduled',
  scheduled ='scheduled',
  in_progress ='in_progress',
  completed ='completed',
}
