"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
class Package {
    static load(pkgName) {
        try {
            return require(pkgName);
        }
        catch (e) {
            console.error(` ${pkgName} is missing. Please make sure that you have installed the package first `);
            process.exitCode = 1;
            process.exit();
        }
    }
}
exports.Package = Package;
//# sourceMappingURL=packageLoader.js.map