"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineConfig = void 0;
const plugin_utils_1 = require("@windicss/plugin-utils");
Object.defineProperty(exports, "defineConfig", { enumerable: true, get: function () { return plugin_utils_1.defineConfig; } });
const plugin_1 = __importDefault(require("./plugin"));
exports.default = plugin_1.default;
