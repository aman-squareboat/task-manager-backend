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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MailmanService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailmanService = void 0;
const nodemailer = __importStar(require("nodemailer"));
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let MailmanService = MailmanService_1 = class MailmanService {
    constructor(options) {
        MailmanService_1.options = options;
        MailmanService_1.transporter = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            auth: { user: options.username, pass: options.password },
        }, { from: options.from });
    }
    static getConfig() {
        return MailmanService_1.options;
    }
    static async send(options) {
        const config = MailmanService_1.options;
        const mailData = await options.mail.getMailData();
        await MailmanService_1.transporter.sendMail({
            to: options.receipents,
            cc: options.cc,
            bcc: options.bcc,
            from: options.sender || config.from,
            html: mailData.html,
            subject: mailData.subject,
            attachments: mailData.attachments,
        });
    }
};
MailmanService = MailmanService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.MAILABLE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MailmanService);
exports.MailmanService = MailmanService;
//# sourceMappingURL=service.js.map