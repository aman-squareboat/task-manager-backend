"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusUpdateHistoryTransformer = void 0;
const boat_1 = require("../../../boat/src");
class TaskStatusUpdateHistoryTransformer extends boat_1.Transformer {
    async transform(taskHistory) {
        let data = taskHistory.map((instance) => {
            return {
                id: instance.ulid,
                updatedFromStatus: instance.updatedFromStatus,
                updatedToStatus: instance.updatedToStatus,
                updatedAt: instance.updatedAt,
            };
        });
        return data;
    }
    async includeExtra(user) {
        return { username: user.username };
    }
    async includeAddress(user) {
        return { country: 'INDIA', cityName: 'Gurugram' };
    }
    async includePin(user) {
        return { code: '122002' };
    }
}
exports.TaskStatusUpdateHistoryTransformer = TaskStatusUpdateHistoryTransformer;
//# sourceMappingURL=statusUpdateHistory.js.map