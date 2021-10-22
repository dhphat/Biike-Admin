"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pitch = void 0;
const constants_1 = require("../constants");
const isTemplateLoader = (l) => /(\/|\\|@)transform-template/.test(l.path);
const postCSSLoader = (l) => /(\/|\\|@)postcss-loader/.test(l.path);
const cssLoader = (l) => /(\/|\\|@)css-loader/.test(l.path);
const isPitcherLoader = (l) => `${constants_1.NAME}:pitcher` === l.ident;
/*
  * Move the position of the transform-template loader for Vue SFCs.
  *
  * We move it just after the PostCSS loader
  */
const pitch = function (remainingRequest) {
    // remove the pitcher immediately
    const pitcherLoaderIndex = this.loaders.findIndex(isPitcherLoader);
    if (pitcherLoaderIndex !== -1)
        this.loaders.splice(pitcherLoaderIndex, 1);
    // make sure we're dealing with style-loader
    if (!remainingRequest.includes('&type=style'))
        return;
    let newTemplateLoaderIndex = this.loaders.findIndex(postCSSLoader);
    // just in-case they don't have post-css for whatever reason we also search for the css-loader
    if (newTemplateLoaderIndex === -1)
        newTemplateLoaderIndex = this.loaders.findIndex(cssLoader);
    // we couldn't find either PostCSS loader or CSS loader so we bail out
    if (newTemplateLoaderIndex === -1)
        return;
    // remove all instances of the template-loader
    let templateLoaderIndex, templateLoader;
    while ((templateLoaderIndex = this.loaders.findIndex(isTemplateLoader)) !== -1) {
        templateLoader = this.loaders[templateLoaderIndex];
        this.loaders.splice(templateLoaderIndex, 1);
    }
    // re-insert the template-loader in the right spot
    if (templateLoader)
        this.loaders.splice(newTemplateLoaderIndex + 1, 0, templateLoader);
};
exports.pitch = pitch;
