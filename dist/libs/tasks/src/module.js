"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksLibModule = void 0;
const users_1 = require("../../users/src");
const common_1 = require("@nestjs/common");
const repositories_1 = require("./repositories");
const tasks_1 = require("./services/tasks");
let TasksLibModule = class TasksLibModule {
};
TasksLibModule = __decorate([
    (0, common_1.Module)({
        providers: [
            tasks_1.TasksLibService,
            { provide: users_1.RepoNames.TASK_REPOSITORY, useClass: repositories_1.TaskRepository },
        ],
        exports: [tasks_1.TasksLibService],
    })
], TasksLibModule);
exports.TasksLibModule = TasksLibModule;
//# sourceMappingURL=module.js.map