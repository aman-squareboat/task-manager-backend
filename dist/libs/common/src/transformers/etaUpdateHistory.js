"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEtaUpdateHistoryTransformer = void 0;
const boat_1 = require("../../../boat/src");
class TaskEtaUpdateHistoryTransformer extends boat_1.Transformer {
    async transform(taskHistory) {
        let data = taskHistory.map((instance) => {
            return {
                id: instance.ulid,
                updatedFromEta: instance.updatedFromEta,
                updatedToEta: instance.updatedToEta,
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
exports.TaskEtaUpdateHistoryTransformer = TaskEtaUpdateHistoryTransformer;
//# sourceMappingURL=etaUpdateHistory.js.map