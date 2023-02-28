import { BaseModel } from '@libs/database';

export class TaskEtaUpdateHistoryModel extends BaseModel {
  static tableName = 'tasks_eta_update_history';
  static connection = 'pg';
}
