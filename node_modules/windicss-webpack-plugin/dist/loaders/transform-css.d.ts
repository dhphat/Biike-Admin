import type webpack from 'webpack';
declare function TransformCss(this: webpack.loader.LoaderContext, source: string): string;
export default TransformCss;
