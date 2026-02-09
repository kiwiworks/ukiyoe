export interface RefreshInterval {
    label: string;
    value: number | null;
}
export declare const DEFAULT_INTERVALS: RefreshInterval[];
interface Props {
    loading?: boolean;
    lastUpdated?: Date | null;
    interval?: number | null;
    intervals?: RefreshInterval[];
    onrefresh: () => void;
    onintervalchange?: (interval: number | null) => void;
}
declare const RefreshControl: import("svelte").Component<Props, {}, "">;
type RefreshControl = ReturnType<typeof RefreshControl>;
export default RefreshControl;
