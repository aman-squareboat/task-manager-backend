"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boat_1 = require("../../../libs/boat/src");
const module_1 = require("./module");
boat_1.RestServer.make(module_1.AppModule, {
    addValidationContainer: true,
    port: +process.env.APP_PORT,
});
//# sourceMappingURL=main.js.map