"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusUpdateHistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../database/src");
const models_1 = require("../../models");
let TaskStatusUpdateHistoryRepository = class TaskStatusUpdateHistoryRepository extends database_1.DatabaseRepository {
};
__decorate([
    (0, database_1.InjectModel)(models_1.TaskStatusUpdateHistoryModel),
    __metadata("design:type", models_1.TaskStatusUpdateHistoryModel)
], TaskStatusUpdateHistoryRepository.prototype, "model", void 0);
TaskStatusUpdateHistoryRepository = __decorate([
    (0, common_1.Injectable)()
], TaskStatusUpdateHistoryRepository);
exports.TaskStatusUpdateHistoryRepository = TaskStatusUpdateHistoryRepository;
//# sourceMappingURL=database.js.map