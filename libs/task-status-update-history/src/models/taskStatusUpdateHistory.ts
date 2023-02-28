import { BaseModel } from '@libs/database';

export class TaskStatusUpdateHistoryModel extends BaseModel {
  static tableName = 'tasks_status_update_history';
  static connection = 'pg';
}
