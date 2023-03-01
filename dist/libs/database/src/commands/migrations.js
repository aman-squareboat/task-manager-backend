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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbOperationsCommand = void 0;
const common_1 = require("@nestjs/common");
const pc = __importStar(require("picocolors"));
const service_1 = require("../service");
const console_1 = require("../../../boat/src/console");
let DbOperationsCommand = class DbOperationsCommand {
    constructor() {
        this.migratorConfig = {
            directory: './database/migrations',
            loadExtensions: ['.js'],
        };
    }
    async migrateStatus(_cli) {
        const knex = service_1.ObjectionService.connection();
        const [completed, pending] = await knex.migrate.list(this.migratorConfig);
        const statusList = [];
        for (const migration of completed) {
            statusList.push({ migration: migration.name, status: pc.green('Y') });
        }
        for (const migration of pending) {
            statusList.push({ migration: migration.file, status: pc.red('N') });
        }
        _cli.table(statusList);
    }
    async migrationUp(_cli) {
        const knex = service_1.ObjectionService.connection();
        const [batch, migrations] = await knex.migrate.latest(this.migratorConfig);
        if (migrations.length === 0) {
            _cli.info('No migrations to run');
            return;
        }
        _cli.info(`Batch Number: ${batch}`);
        for (const migration of migrations) {
            _cli.success(migration);
        }
    }
    async migrateRollback(_cli) {
        const knex = service_1.ObjectionService.connection();
        const [batch, migrations] = await knex.migrate.rollback(this.migratorConfig);
        if (migrations.length === 0) {
            _cli.info('No migrations to rollback. Already at the base migration');
            return;
        }
        _cli.info(`Reverted Batch: ${batch}`);
        for (const migration of migrations) {
            _cli.success(migration);
        }
    }
    async migrateReset(_cli) {
        const knex = service_1.ObjectionService.connection();
        const confirm = await _cli.confirm('Are you sure you want to reset your database? This action is irreversible.');
        if (!confirm) {
            _cli.info('Thank you! Exiting...');
            return;
        }
        const password = await _cli.password('Please enter the password of the database to proceed');
        const [, migrations] = await knex.migrate.down(this.migratorConfig);
        if (migrations.length === 0) {
            _cli.info('No migrations to rollback. Already at the base migration');
            return;
        }
        _cli.info('Rollback of following migrations are done:');
        for (const migration of migrations) {
            _cli.success(migration);
        }
    }
    async makeMigration(_cli) {
        const knex = service_1.ObjectionService.connection();
        const res = await knex.migrate.make(_cli.argument('name'), {
            directory: this.migratorConfig.directory,
            extension: 'js',
        });
        const paths = res.split('/');
        _cli.success(paths[paths.length - 1]);
    }
};
__decorate([
    (0, console_1.Command)('migrate:status', {
        desc: 'Command to show the status of all migrations',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], DbOperationsCommand.prototype, "migrateStatus", null);
__decorate([
    (0, console_1.Command)('migrate', { desc: 'Command to run the pending migrations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], DbOperationsCommand.prototype, "migrationUp", null);
__decorate([
    (0, console_1.Command)('migrate:rollback', {
        desc: 'Command to rollback the previous batch of migrations',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], DbOperationsCommand.prototype, "migrateRollback", null);
__decorate([
    (0, console_1.Command)('migrate:reset', {
        desc: 'Command to reset the migration',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], DbOperationsCommand.prototype, "migrateReset", null);
__decorate([
    (0, console_1.Command)('make:migration {name}', {
        desc: 'Command to create a new migration',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [console_1.ConsoleIO]),
    __metadata("design:returntype", Promise)
], DbOperationsCommand.prototype, "makeMigration", null);
DbOperationsCommand = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DbOperationsCommand);
exports.DbOperationsCommand = DbOperationsCommand;
//# sourceMappingURL=migrations.js.map