import type { ButtonVariant, ButtonSize, ButtonType } from '../Button.svelte';
type $$ComponentProps = {
    text?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
    loading?: boolean;
    active?: boolean;
    fullWidth?: boolean;
    href?: string;
    ariaLabel?: string;
    onclick?: (e: MouseEvent) => void;
};
declare const ButtonTest: import("svelte").Component<$$ComponentProps, {}, "">;
type ButtonTest = ReturnType<typeof ButtonTest>;
export default ButtonTest;
