"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentParser = void 0;
class ArgumentParser {
    constructor(exp) {
        this.exp = exp;
    }
    static from(exp) {
        const parser = new ArgumentParser(exp);
        return parser.handle();
    }
    handle() {
        const words = this.exp.split(' ');
        const obj = {
            name: words.splice(0, 1)[0],
            arguments: [],
            options: [],
        };
        for (const word of words) {
            if (!word)
                continue;
            const input = word.substring(1, word.length - 1);
            const startsWithDoubleHyphen = input.substring(0, 2) === '--';
            startsWithDoubleHyphen
                ? obj.options.push(Object.assign(Object.assign({}, this.parseExpression(input.substring(2))), { isRequired: false }))
                : obj.arguments.push(this.parseExpression(input));
        }
        return obj;
    }
    parseExpression(expression) {
        const [arg, defaultValue = null] = expression.split('=');
        const specialCharMatch = arg.match(/[?\*]/i);
        return {
            name: specialCharMatch
                ? arg.substring(0, arg.indexOf(specialCharMatch[0]))
                : arg,
            isRequired: !!!arg.includes('?'),
            isArray: arg.includes('*'),
            defaultValue: defaultValue != undefined ? defaultValue : 'secret_default_value',
            expression,
        };
    }
}
exports.ArgumentParser = ArgumentParser;
//# sourceMappingURL=argumentParser.js.map