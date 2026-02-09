export type { FieldValue, FieldType, FieldOption, FieldSchema, FieldRenderProps, FormValidateFn, FormContext, FormRootProps, FormFieldProps, FormAutoProps } from './types';
export { getFormContext, setFormContext } from './context.svelte';
import Root from './Root.svelte';
import Field from './Field.svelte';
import Auto from './Auto.svelte';
export { Root, Field, Auto };
export declare const Form: import("svelte").Component<import("./types").FormRootProps<Record<string, import("./types").FieldValue>>, {}, ""> & {
    Root: import("svelte").Component<import("./types").FormRootProps<Record<string, import("./types").FieldValue>>, {}, "">;
    Field: import("svelte").Component<import("./types").FormFieldProps, {}, "">;
    Auto: import("svelte").Component<import("./types").FormAutoProps, {}, "">;
};
