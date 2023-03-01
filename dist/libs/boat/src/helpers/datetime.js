"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addingInDate = exports.endTimeOfDay = exports.startTimeOfDay = exports.dateForHuman = exports.timestampForHuman = exports.dateToTz = exports.getTime = exports.getDate = exports.getDateDiff = exports.getIsoDate = exports.getCurrentTimestamp = void 0;
const moment_1 = __importDefault(require("moment"));
function getCurrentTimestamp(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (date) {
        return (0, moment_1.default)(date).format(format);
    }
    else {
        return (0, moment_1.default)().format(format);
    }
}
exports.getCurrentTimestamp = getCurrentTimestamp;
function getIsoDate(date) {
    return date.toISOString().split('T')[0];
}
exports.getIsoDate = getIsoDate;
function getDateDiff(firstDate, secondDate, unit) {
    return (0, moment_1.default)(firstDate).diff((0, moment_1.default)(secondDate), unit);
}
exports.getDateDiff = getDateDiff;
function getDate(date, delimitter = '-') {
    return (date.getFullYear().toString().padStart(2, '0') +
        delimitter +
        (date.getUTCMonth() + 1).toString().padStart(2, '0') +
        delimitter +
        date.getDate().toString().padStart(2, '0'));
}
exports.getDate = getDate;
function getTime(date, delimitter = '-') {
    return (date.getHours().toString().padStart(2, '0') +
        delimitter +
        date.getMinutes().toString().padStart(2, '0') +
        delimitter +
        date.getSeconds().toString().padStart(2, '0'));
}
exports.getTime = getTime;
function dateToTz(date, timeZone) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Date(d.toLocaleString('en-US', { timeZone }));
}
exports.dateToTz = dateToTz;
function timestampForHuman(date) {
    return (0, moment_1.default)(date).format('ll LT');
}
exports.timestampForHuman = timestampForHuman;
function dateForHuman(date) {
    return (0, moment_1.default)(date).format('ll');
}
exports.dateForHuman = dateForHuman;
function startTimeOfDay(date) {
    return (0, moment_1.default)(date).startOf('day').toDate();
}
exports.startTimeOfDay = startTimeOfDay;
function endTimeOfDay(date) {
    return (0, moment_1.default)(date).endOf('day').toDate();
}
exports.endTimeOfDay = endTimeOfDay;
function addingInDate(currentDate, amount, unit) {
    return (0, moment_1.default)(currentDate).add(amount, unit);
}
exports.addingInDate = addingInDate;
//# sourceMappingURL=datetime.js.map