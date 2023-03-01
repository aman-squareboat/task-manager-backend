"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const objection_1 = require("objection");
exports.default = (0, config_1.registerAs)('db', () => ({
    isGlobal: true,
    default: 'pg',
    connections: {
        pg: Object.assign({ client: 'pg', debug: !!+process.env.DB_DEBUG, connection: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                charset: 'utf8',
            }, useNullAsDefault: true }, (0, objection_1.knexSnakeCaseMappers)()),
    },
}));
//# sourceMappingURL=database.js.map