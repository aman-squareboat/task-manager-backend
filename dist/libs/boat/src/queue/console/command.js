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
exports.QueueConsoleCommands = void 0;
const console_1 = require("../../console");
const common_1 = require("@nestjs/common");
const worker_1 = require("../worker");
let QueueConsoleCommands = class QueueConsoleCommands {
    async startQueueWork(_cli) {
        const sleep = _cli.option('sleep');
        const connection = _cli.option('connection');
        const queue = _cli.option('queue');
        const options = {};
        if (sleep)
            options['sleep'] = sleep;
        if (connection)
            options['connection'] = connection;
        if (queue)
            options['queue'] = queue;
        _cli.info('Starting queue worker');
        await worker_1.QueueWorker.init(options).listen();
        return;
    }
    async getQueueLength(_cli) {
        const sleep = _cli.option('sleep');
        const connection = _cli.option('connection');
        const queue = _cli.option('queue');
        const options = {};
        if (sleep)
            options['sleep'] = sleep;
        if (connection)
            options['connection'] = connection;
        if (queue)
            options['queue'] = queue;
        const response = await worker_1.QueueWorker.init(options).count();
        _cli.info(`Number of messages in queue is ${response}`);
        return;
    }
    async purgeQueue(_cli) {
        const sleep = _cli.option('sleep');
        const connection = _cli.option('connection');
        const queue = _cli.option('queue');
        const options = {};
        if (sleep)
            options['sleep'] = sleep;
        if (connection)
            options['connection'] = connection;
        if (queue)
            options['queue'] = queue;
        const answer = await _cli.ask(`Do you really want to purge queue? Please be sure as this action is irreversible!\nWrite "yes,delete it" to purge the queue`);
        if (answer === 'yes,delete it') {
            await worker_1.QueueWorker.init(options).purge();
            _cli.info(' queue succesfully purged ');
            return;
        }
        _cli.error(' wrong key, exiting... ');
        return;
    }
};
__decorate([
    (0, console_1.Command)('queue:work {--sleep=} {--connection=} {--queue=}', {
        desc: 'Command to run the queue worker, starts processing the jobs',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], QueueConsoleCommands.prototype, "startQueueWork", null);
__decorate([
    (0, console_1.Command)('queue:length {--connection=} {--queue=}', {
        desc: 'Command to get the length of the specified queue',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], QueueConsoleCommands.prototype, "getQueueLength", null);
__decorate([
    (0, console_1.Command)('queue:purge {--sleep=} {--connection=} {--queue=}', {
        desc: 'Command to purge the queue',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], QueueConsoleCommands.prototype, "purgeQueue", null);
QueueConsoleCommands = __decorate([
    (0, common_1.Injectable)()
], QueueConsoleCommands);
exports.QueueConsoleCommands = QueueConsoleCommands;
//# sourceMappingURL=command.js.map