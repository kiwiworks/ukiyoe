import type { Snippet, Component } from 'svelte';
export interface TabItem {
    value: string;
    label: string;
    disabled?: boolean;
    /** Icon component to render before the label */
    icon?: Component;
    /** Count displayed after the label */
    count?: number;
}
export type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
export type TabsVariant = 'pill' | 'underline';
export interface TabsProps {
    value?: string;
    tabs: TabItem[] | string[];
    size?: TabsSize;
    /** Visual variant */
    variant?: TabsVariant;
    class?: string;
    onValueChange?: (value: string) => void;
    children?: Snippet<[string]>;
    /** Custom trigger snippet for full control over tab rendering */
    trigger?: Snippet<[{
        tab: TabItem;
        active: boolean;
    }]>;
}
import { Tabs } from 'bits-ui';
declare const Tabs: Component<TabsProps, {}, "value">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
