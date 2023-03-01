"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = require("../../../database/src");
class UserModel extends database_1.BaseModel {
}
exports.UserModel = UserModel;
UserModel.tableName = "users";
UserModel.connection = "pg";
//# sourceMappingURL=user.js.map