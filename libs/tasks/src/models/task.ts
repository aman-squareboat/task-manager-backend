import { BaseModel } from '@libs/database';

export class TaskModel extends BaseModel {
  static tableName = 'tasks';
  static connection = 'pg';
}
