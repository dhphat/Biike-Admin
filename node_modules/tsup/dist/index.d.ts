import { InputOption } from 'rollup';
import { BuildOptions, Plugin, BuildResult } from 'esbuild';

/** Mark some properties as required, leaving others unchanged */
declare type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> & Required<Pick<T, RK>>;

declare type Format = 'cjs' | 'esm' | 'iife';
declare type Options = {
    entryPoints?: string[];
    /**
     * Output different formats to differen folder instead of using different extensions
     */
    legacyOutput?: boolean;
    /**
     * Compile target
     *
     * default to `node12`
     */
    target?: string;
    minify?: boolean;
    minifyWhitespace?: boolean;
    minifyIdentifiers?: boolean;
    minifySyntax?: boolean;
    keepNames?: boolean;
    watch?: boolean | string | (string | boolean)[];
    ignoreWatch?: string[] | string;
    onSuccess?: string;
    jsxFactory?: string;
    jsxFragment?: string;
    outDir?: string;
    format?: Format[];
    globalName?: string;
    env?: {
        [k: string]: string;
    };
    define?: {
        [k: string]: string;
    };
    dts?: boolean | string | {
        entry?: InputOption;
        /** Resolve external types used in dts files from node_modules */
        resolve?: boolean | (string | RegExp)[];
    };
    sourcemap?: BuildOptions['sourcemap'];
    /** Don't bundle these packages */
    external?: (string | RegExp)[];
    /** Transform the result with `@babel/core` */
    babel?: boolean;
    /**
     * Replace `process.env.NODE_ENV` with `production` or `development`
     * `production` when the bundled is minified, `development` otherwise
     */
    replaceNodeEnv?: boolean;
    /**
     * Code splitting
     * Default to `true`
     * You may want to disable code splitting sometimes: #255
     */
    splitting?: boolean;
    /**
     * Clean output directory before each build
     */
    clean?: boolean | string[];
    esbuildPlugins?: Plugin[];
    /**
     * Supress non-error logs (excluding "onSuccess" process output)
     */
    silent?: boolean;
    /**
     * Skip node_modules bundling
     */
    skipNodeModulesBundle?: boolean;
    /**
     * @see https://esbuild.github.io/api/#pure
     */
    pure?: string | string[];
    /**
     * Disable bunlding, default to true
     */
    bundle?: boolean;
};
declare type NormalizedOptions = MarkRequired<Options, 'entryPoints' | 'format' | 'outDir'>;
declare const defineConfig: (options: Options) => Options;
declare function runEsbuild(options: NormalizedOptions, { format, css }: {
    format: Format;
    css?: Map<string, string>;
}): Promise<BuildResult | undefined>;
declare function build(_options: Options): Promise<void>;

export { Format, NormalizedOptions, Options, build, defineConfig, runEsbuild };
