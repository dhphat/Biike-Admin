"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("../debug"));
function TransformCss(source) {
    if (!this._compiler)
        return source;
    this.cacheable(true);
    const service = this._compiler.$windyCSSService;
    if (!service)
        return source;
    let output = source;
    try {
        output = service.transformCSS(source, this.resource);
        debug_1.default.loader('Transformed CSS', this.resource);
    }
    catch (e) {
        this.emitWarning(`[Windi CSS] Failed to css for resource: ${this.resource}.`);
    }
    return output || source;
}
exports.default = TransformCss;
