import type { FormContext, FieldValue } from './types';
export declare function setFormContext<T = Record<string, FieldValue>>(ctx: FormContext<T>): void;
export declare function getFormContext<T = Record<string, FieldValue>>(): FormContext<T>;
