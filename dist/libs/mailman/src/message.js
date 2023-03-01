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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailMessage = void 0;
const constants_1 = require("./constants");
const service_1 = require("./service");
const ejs = __importStar(require("ejs"));
const path = __importStar(require("path"));
const mjml_1 = __importDefault(require("mjml"));
const html_minifier_1 = require("html-minifier");
class MailMessage {
    constructor() {
        this.attachments = {};
        this.compiledHtml = '';
        this.mailType = constants_1.RAW_MAIL;
    }
    static init() {
        return new MailMessage();
    }
    subject(subject) {
        this.mailSubject = subject;
        return this;
    }
    view(viewFile, payload) {
        this.mailType = constants_1.VIEW_BASED_MAIL;
        this.viewFile = viewFile;
        this.payload = payload;
        return this;
    }
    raw(template, payload) {
        this.mailType = constants_1.RAW_MAIL;
        this.templateString = template;
        this.payload = payload;
        return this;
    }
    attach(filename, content) {
        this.attachments[filename] = Object.assign(Object.assign({}, content), { filename });
        return this;
    }
    greeting(text, style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({ type: 'greeting', payload: { text, style } });
        return this;
    }
    line(text, style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({ type: 'line', payload: { text, style } });
        return this;
    }
    action(options, style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({
            type: 'action',
            payload: Object.assign(Object.assign({}, options), { style }),
        });
        return this;
    }
    image(options, style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({
            type: 'image',
            payload: Object.assign(Object.assign({}, options), { style }),
        });
        return this;
    }
    divider(style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({ type: 'divider', payload: { style } });
        return this;
    }
    table(options, style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({
            type: 'table',
            payload: Object.assign({ style }, options),
        });
        return this;
    }
    card(options, style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({
            type: 'card',
            payload: Object.assign({ style }, options),
        });
        return this;
    }
    regards(style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({
            type: 'regard',
            payload: { style, text: 'Team TM' },
        });
        return this;
    }
    markdown(text, style) {
        this._setGenericMailProperties();
        style = style || {};
        this.payload._fields.push({ type: 'raw', payload: { style, text } });
        return this;
    }
    _setGenericMailProperties() {
        this.mailType = constants_1.GENERIC_MAIL;
        if (!this.payload || !this.payload._fields) {
            this.payload = { _fields: [] };
        }
    }
    async _compileTemplate() {
        if (this.compiledHtml)
            return this.compiledHtml;
        const config = service_1.MailmanService.getConfig();
        const header = ejs.renderFile(path.join(config.path || '', '_common/header.ejs'), {}, { root: config.path });
        const footer = ejs.renderFile(path.join(config.path || '', '_common/footer.ejs'), {}, { root: config.path });
        let content = '';
        if (this.mailType === constants_1.VIEW_BASED_MAIL) {
            content = await ejs.renderFile(path.join(config.path || '', this.viewFile), this.payload, { root: config.path });
        }
        else {
            content = await ejs.renderFile(path.join(config.path || '', `_common/generic.ejs`), this.payload, { root: config.path });
        }
        const [c1, c2, c3] = await Promise.all([header, content, footer]);
        const template = (0, mjml_1.default)(`${c1}${c2}${c3}`);
        this.compiledHtml = (0, html_minifier_1.minify)(template.html, {
            minifyCSS: true,
            removeAttributeQuotes: true,
        });
        return this.compiledHtml;
    }
    async getMailData() {
        if (typeof this.handle === 'function') {
            this['handle']();
        }
        return {
            subject: this.mailSubject,
            html: await this._compileTemplate(),
            attachments: Object.values(this.attachments),
        };
    }
    async render() {
        return this._compileTemplate();
    }
}
exports.MailMessage = MailMessage;
//# sourceMappingURL=message.js.map