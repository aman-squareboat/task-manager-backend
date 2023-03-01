"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
const settings_1 = __importDefault(require("./settings"));
const cache_1 = __importDefault(require("./cache"));
const queue_1 = __importDefault(require("./queue"));
const auth_1 = __importDefault(require("./auth"));
const notification_1 = __importDefault(require("./notification"));
exports.default = [
    app_1.default,
    database_1.default,
    settings_1.default,
    cache_1.default,
    queue_1.default,
    auth_1.default,
    notification_1.default,
];
//# sourceMappingURL=index.js.map