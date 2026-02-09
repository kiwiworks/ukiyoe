export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'card';
export type SkeletonAnimation = 'pulse' | 'shimmer' | 'none';
export interface SkeletonProps {
    variant?: SkeletonVariant;
    animation?: SkeletonAnimation;
    width?: string;
    height?: string;
    class?: string;
}
declare const Skeleton: import("svelte").Component<SkeletonProps, {}, "">;
type Skeleton = ReturnType<typeof Skeleton>;
export default Skeleton;
