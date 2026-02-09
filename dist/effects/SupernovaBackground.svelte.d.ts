import { type BgQualityPreset } from '../stores/theme.svelte';
interface Props {
    /** Override quality settings (for preview in settings) */
    qualityOverride?: BgQualityPreset;
    /** Show FPS overlay (for settings preview) */
    showStats?: boolean;
}
declare const SupernovaBackground: import("svelte").Component<Props, {}, "">;
type SupernovaBackground = ReturnType<typeof SupernovaBackground>;
export default SupernovaBackground;
