export type { FormRootProps } from './types';
import type { FormRootProps as FormRootPropsType, FieldValue } from './types';
declare const Root: import("svelte").Component<FormRootPropsType<Record<string, FieldValue>>, {}, "context">;
type Root = ReturnType<typeof Root>;
export default Root;
