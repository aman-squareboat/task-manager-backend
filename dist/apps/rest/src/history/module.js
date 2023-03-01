"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryApiModule = void 0;
const common_1 = require("@nestjs/common");
const history_1 = require("./services/history");
const history_2 = require("./controllers/history");
const task_eta_update_history_1 = require("../../../../libs/task-eta-update-history/src");
const task_status_update_history_1 = require("../../../../libs/task-status-update-history/src");
const tasks_1 = require("../../../../libs/tasks/src");
let HistoryApiModule = class HistoryApiModule {
};
HistoryApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            task_eta_update_history_1.TaskEtaUpdateHistoryLibModule,
            task_status_update_history_1.TaskStatusUpdateHistoryLibModule,
            tasks_1.TasksLibModule,
        ],
        providers: [history_1.HistoryApiService],
        controllers: [history_2.HistoryController],
    })
], HistoryApiModule);
exports.HistoryApiModule = HistoryApiModule;
//# sourceMappingURL=module.js.map