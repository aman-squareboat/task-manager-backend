"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('notifications', () => {
    return {
        mailman: {
            host: process.env.MAIL_HOST,
            port: +process.env.MAIL_PORT,
            username: process.env.MAIL_USERNAME,
            password: process.env.MAIL_PASSWORD,
            from: process.env.MAIL_SENDER_ID,
            path: 'apps/notification-jobs/src/resources',
        },
    };
});
//# sourceMappingURL=notification.js.map