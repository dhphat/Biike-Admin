import { Compiler, Options } from './interfaces';
declare class WindiCSSWebpackPlugin {
    options: Options;
    constructor(options?: Options);
    apply(compiler: Compiler): void;
}
export default WindiCSSWebpackPlugin;
