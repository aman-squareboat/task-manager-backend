"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksApiModule = void 0;
const task_eta_update_history_1 = require("../../../../libs/task-eta-update-history/src");
const task_status_update_history_1 = require("../../../../libs/task-status-update-history/src");
const tasks_1 = require("../../../../libs/tasks/src");
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
const services_1 = require("./services");
let TasksApiModule = class TasksApiModule {
};
TasksApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            tasks_1.TasksLibModule,
            task_status_update_history_1.TaskStatusUpdateHistoryLibModule,
            task_eta_update_history_1.TaskEtaUpdateHistoryLibModule,
        ],
        providers: [services_1.TasksApiService],
        controllers: [controllers_1.TasksController],
    })
], TasksApiModule);
exports.TasksApiModule = TasksApiModule;
//# sourceMappingURL=module.js.map