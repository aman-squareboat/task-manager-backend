"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const database_1 = require("../../../database/src");
class TaskModel extends database_1.BaseModel {
}
exports.TaskModel = TaskModel;
TaskModel.tableName = 'tasks';
TaskModel.connection = 'pg';
//# sourceMappingURL=task.js.map