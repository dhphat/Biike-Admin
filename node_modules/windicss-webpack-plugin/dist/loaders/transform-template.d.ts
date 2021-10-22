import type webpack from 'webpack';
declare function TransformTemplate(this: webpack.loader.LoaderContext, source: string): string;
export default TransformTemplate;
