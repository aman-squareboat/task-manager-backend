"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateTasksTransformer = void 0;
const boat_1 = require("../../../boat/src");
class PaginateTasksTransformer extends boat_1.Transformer {
    async transform(paginatedTasks) {
        let pagination = paginatedTasks.pagination;
        let data = paginatedTasks.data.map((task) => {
            return {
                id: task.ulid,
                eta: task.eta,
                title: task.title,
                status: task.status,
            };
        });
        return {
            pagination,
            data,
        };
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
exports.PaginateTasksTransformer = PaginateTasksTransformer;
//# sourceMappingURL=paginateTasks.js.map