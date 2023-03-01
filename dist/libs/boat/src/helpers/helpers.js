"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = exports.isArrayAndHasLength = exports.strBefore = exports.strAfter = void 0;
const uuid_1 = require("uuid");
const exceptions_1 = require("../exceptions");
const expParser_1 = require("../utils/expParser");
const utils_1 = require("./utils");
const csvToJson_1 = require("./csvToJson");
function strAfter(str, substr) {
    return str.split(substr)[1];
}
exports.strAfter = strAfter;
function strBefore(str, substr) {
    return str.split(substr)[0];
}
exports.strBefore = strBefore;
function isArrayAndHasLength(arr) {
    return arr && Array.isArray(arr) && arr.length;
}
exports.isArrayAndHasLength = isArrayAndHasLength;
class Helpers {
    static isUuid(str) {
        return RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(str);
    }
    static uuid() {
        return (0, uuid_1.v4)();
    }
    static o2s(inputs) {
        return expParser_1.ExpParser.buildFromObj(inputs);
    }
    static throwGenericIf(condition, msg) {
        if (condition)
            throw new exceptions_1.GenericException(msg);
    }
    static throwForbiddenIf(condition, error) {
        if (condition)
            throw new exceptions_1.ForbiddenException(error);
    }
    static throwIf(condition, ex) {
        if (condition)
            throw ex;
    }
    static throwValidationIf(condition, msg) {
        if (condition)
            throw new exceptions_1.ValidationFailed(msg);
    }
    static isLocal() {
        return process.env.APP_STAGE === 'local';
    }
    static isObject(value) {
        if (typeof value === 'object' && value !== null) {
            return true;
        }
        return false;
    }
    static isEmpty(value) {
        if (Array.isArray(value) && value.length < 1)
            return true;
        if (this.isObject(value) && Object.keys(value).length < 1)
            return true;
        if (!value)
            return true;
        return false;
    }
    static referenceId(length) {
        const char = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return this.randomString(length, char);
    }
    static randomString(length, str) {
        let result = '';
        const characters = str ? str : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static timeBasedRefId(options) {
        options = options || {};
        const dateObj = new Date();
        const date = dateObj.toISOString().split('T')[0].substr(2).replace(/-/g, '');
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        const timestamp = `${date}${hours}${minutes}`;
        const str = utils_1.Utils.randomString((options === null || options === void 0 ? void 0 : options.len) || 8).toUpperCase();
        const prefix = options.prefix || '';
        return `${prefix.trim()}${timestamp}${str}`;
    }
    static getFormattedEager(include = '', eagerDependencyMapping) {
        const commonEager = {};
        Object.keys(eagerDependencyMapping).filter((val) => {
            const arr = include.split(',');
            const isMatched = arr.includes(val);
            if (isMatched) {
                commonEager[val] = true;
            }
            return isMatched;
        });
        return commonEager;
    }
    static slugify(str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        const to = 'aaaaeeeeiiiioooouuuunc------';
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        return str;
    }
    static getSanitizeKeywordStringForES(str) {
        return str
            .replace('|', '')
            .replace('+', '')
            .replace('-', '')
            .replace('=', '')
            .replace('&', '')
            .replace('>', '')
            .replace('<', '')
            .replace('!', '')
            .replace('(', '')
            .replace(')', '')
            .replace('{', '')
            .replace('}', '')
            .replace('^', '')
            .replace('"', '')
            .replace('*', '')
            .replace('?', '')
            .replace(':', '')
            .replace('/', '')
            .replace(']', '')
            .replace('[', '')
            .replace('~', '')
            .replace('\\', '');
    }
    static csv2json(data) {
        return new csvToJson_1.Csv2Json(data).handle();
    }
}
exports.Helpers = Helpers;
Helpers.groupCSVFieldsToArray = (inputObj, splitBy = 'configuration') => {
    const ToSkipConfiguration = ['FolderLink'];
    const dataMap = {};
    for (let key in inputObj) {
        let splitKeyArr = key.split(splitBy);
        if (splitKeyArr.length !== 2)
            continue;
        let splitKey = splitKeyArr[1];
        if (ToSkipConfiguration.includes(splitKey))
            continue;
        let configNo = splitKey.replace(/[^0-9]/g, '');
        let objKey = splitKey.split(configNo)[1];
        objKey = objKey.toLowerCase();
        if (dataMap.hasOwnProperty(configNo)) {
            dataMap[configNo][objKey] = inputObj[key];
        }
        else {
            dataMap[configNo] = {
                [objKey]: inputObj[key],
                id: configNo,
            };
        }
    }
    const finalConfigArray = [];
    for (let key in dataMap) {
        finalConfigArray.push(dataMap[key]);
    }
    return finalConfigArray;
};
//# sourceMappingURL=helpers.js.map