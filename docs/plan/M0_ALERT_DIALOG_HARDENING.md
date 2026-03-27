# M0: AlertDialog Hardening

## Goal
Stabilize AlertDialog with outside-click control, correct cancel semantics, and simplified button rendering.

**Depends on**: —
**Target version**: v0.7.0
**Status**: Complete (commit c6cfb58)

## Deliverables

### D0.1: `interactOutsideBehavior` prop

**Module**: core/AlertDialog

Add `interactOutsideBehavior` prop (`'close' | 'ignore'`, default `'close'`) forwarded to bits-ui `AlertDialog.Content`. Enables strict modals that require explicit user choice.

### D0.2: Fix confirm-vs-cancel callback

**Module**: core/AlertDialog

Closing via confirm button no longer fires `onCancel`. Uses a `closingFromConfirm` guard in `handleOpenChange` to distinguish confirm-close from dismiss-close.

### D0.3: Simplify button rendering

**Module**: core/AlertDialog

Replace `AlertDialog.Cancel`/`AlertDialog.Action` wrapper components with plain `Button` components. Reduces indirection and removes the `child` snippet boilerplate.

### D0.4: Demo — strict modal example

**Module**: demo

Add "Strict Modal" section to AlertDialog demo page showing `interactOutsideBehavior="ignore"` usage. Update PropsTable with the new prop.

## Verification

1. `bun run lint` — zero warnings
2. `bun run test:run` — all pass
3. `bun run build` — clean build
4. AlertDialog demo page shows strict modal example
5. Confirming does not fire `onCancel`; dismissing/cancelling does
