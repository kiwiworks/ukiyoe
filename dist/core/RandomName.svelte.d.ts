export interface RandomNameConfig {
    /** Custom adjective list */
    adjectives?: string[];
    /** Custom noun list */
    nouns?: string[];
    /** Include number suffix */
    includeNumber?: boolean;
    /** Separator between words */
    separator?: string;
    /** Capitalize each word */
    capitalize?: boolean;
}
/** Generate a random name from word lists. */
export declare function generateName(config?: RandomNameConfig): string;
interface Props {
    /** Current name value */
    value: string;
    /** Callback when name changes */
    onchange?: (name: string) => void;
    /** Placeholder for manual input */
    placeholder?: string;
    /** Configuration for name generation */
    config?: RandomNameConfig;
    /** Disable interaction */
    disabled?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
}
declare const RandomName: import("svelte").Component<Props, {}, "value">;
type RandomName = ReturnType<typeof RandomName>;
export default RandomName;
