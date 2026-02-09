import type { DataTableContext } from './types';
export declare function setDataTableContext<T>(ctx: DataTableContext<T>): void;
export declare function getDataTableContext<T = Record<string, unknown>>(): DataTableContext<T>;
