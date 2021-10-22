"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE_ID_VIRTUAL_MODULES = exports.MODULE_ID_VIRTUAL_PREFIX = exports.MODULE_ID_VIRTUAL_TEST = exports.MODULE_ID = exports.NAME = void 0;
exports.NAME = 'windicss-webpack-plugin';
exports.MODULE_ID = 'windi.css';
exports.MODULE_ID_VIRTUAL_TEST = /virtual:windi-?(.*?)\.css/;
exports.MODULE_ID_VIRTUAL_PREFIX = 'virtual:windi';
exports.MODULE_ID_VIRTUAL_MODULES = [
    `${exports.MODULE_ID_VIRTUAL_PREFIX}.css`,
    `${exports.MODULE_ID_VIRTUAL_PREFIX}-base.css`,
    `${exports.MODULE_ID_VIRTUAL_PREFIX}-utilities.css`,
    `${exports.MODULE_ID_VIRTUAL_PREFIX}-components.css`,
];
