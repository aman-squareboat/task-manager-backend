"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEtaUpdateHistoryModel = void 0;
const database_1 = require("../../../database/src");
class TaskEtaUpdateHistoryModel extends database_1.BaseModel {
}
exports.TaskEtaUpdateHistoryModel = TaskEtaUpdateHistoryModel;
TaskEtaUpdateHistoryModel.tableName = 'tasks_eta_update_history';
TaskEtaUpdateHistoryModel.connection = 'pg';
//# sourceMappingURL=taskEtaUpdateHistory.js.map