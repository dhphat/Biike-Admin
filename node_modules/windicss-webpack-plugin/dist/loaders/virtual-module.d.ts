import type webpack from 'webpack';
declare function VirtualModule(this: webpack.loader.LoaderContext, source: string): Promise<void>;
export default VirtualModule;
