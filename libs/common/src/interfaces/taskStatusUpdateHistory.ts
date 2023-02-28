export interface ITaskStatusUpdateHistoryModel {
  id?: number;
  ulid?: string;
  updatedFromStatus?: number;
  taskId?: number;
  updatedToStatus?: number;
  updatedAt?: string;
}
