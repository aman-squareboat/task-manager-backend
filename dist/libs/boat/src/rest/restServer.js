"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestServer = void 0;
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const config_1 = require("@nestjs/config");
const guards_1 = require("./guards");
const exceptions_1 = require("../exceptions");
const Sentry = __importStar(require("@sentry/node"));
const Tracing = __importStar(require("@sentry/tracing"));
const timeoutInterceptor_1 = require("./timeoutInterceptor");
class RestServer {
    static async make(module, options) {
        const app = await core_1.NestFactory.create(module);
        if (options === null || options === void 0 ? void 0 : options.addValidationContainer) {
            (0, class_validator_1.useContainer)(app.select(module), { fallbackOnErrors: true });
        }
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        const config = app.get(config_1.ConfigService, { strict: false });
        const server = app.getHttpServer();
        Sentry.init({
            dsn: config.get('app.sentryDsn'),
            environment: config.get('app.env'),
            enabled: config.get('app.env') === 'prod' ||
                config.get('app.env') === 'production',
            integrations: [
                new Sentry.Integrations.Http({ tracing: true }),
                new Tracing.Integrations.Express({
                    app: server._events.request_router,
                }),
                new Tracing.Integrations.Postgres(),
            ],
            tracesSampleRate: config.get('app.SentrySampleRate'),
        });
        app.use(Sentry.Handlers.requestHandler());
        app.use(Sentry.Handlers.tracingHandler());
        app.useGlobalInterceptors(new timeoutInterceptor_1.TimeoutInterceptor());
        app.useGlobalGuards(new guards_1.RequestGuard());
        const { httpAdapter } = app.get(core_1.HttpAdapterHost);
        app.useGlobalFilters(new exceptions_1.ExceptionFilter(httpAdapter));
        options.globalPrefix && app.setGlobalPrefix(options.globalPrefix);
        const appPort = options.port || config.get('app.port');
        await app.listen(appPort);
        console.log(`🚀 ${module.name} is running on appPort - ${appPort}`);
    }
}
exports.RestServer = RestServer;
//# sourceMappingURL=restServer.js.map