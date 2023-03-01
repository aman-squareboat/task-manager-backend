"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusUpdateHistoryModel = void 0;
const database_1 = require("../../../database/src");
class TaskStatusUpdateHistoryModel extends database_1.BaseModel {
}
exports.TaskStatusUpdateHistoryModel = TaskStatusUpdateHistoryModel;
TaskStatusUpdateHistoryModel.tableName = 'tasks_status_update_history';
TaskStatusUpdateHistoryModel.connection = 'pg';
//# sourceMappingURL=taskStatusUpdateHistory.js.map