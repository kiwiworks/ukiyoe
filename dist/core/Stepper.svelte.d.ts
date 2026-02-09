import type { Component } from 'svelte';
export type StepState = 'pending' | 'active' | 'completed' | 'error';
export type StepperSize = 'xs' | 'sm' | 'md' | 'lg';
export type StepperOrientation = 'horizontal' | 'vertical';
export interface Step {
    id: string;
    label: string;
    description?: string;
    icon?: Component;
    optional?: boolean;
}
export interface StepperProps {
    /** Array of step definitions */
    steps: Step[];
    /** Current active step ID */
    currentStep: string;
    /** Size variant */
    size?: StepperSize;
    /** Layout orientation */
    orientation?: StepperOrientation;
    /** Compact mode - hides labels/descriptions */
    compact?: boolean;
    /** Allow clicking on completed steps */
    clickable?: boolean;
    /** Step click handler */
    onStepClick?: (stepId: string) => void;
    /** Additional CSS classes */
    class?: string;
}
declare const Stepper: Component<StepperProps, {}, "">;
type Stepper = ReturnType<typeof Stepper>;
export default Stepper;
