import { Options } from './index';
import 'rollup';
import 'esbuild';

declare function main(options?: Options): Promise<void>;

export { main };
