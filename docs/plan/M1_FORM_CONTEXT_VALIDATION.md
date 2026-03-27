# M1: Form Context & Validation

## Goal
Expose form context to parent components and fix Zod 4 validation edge cases.

**Depends on**: —
**Target version**: v0.7.0
**Status**: Complete (commit a2204ab)

## Deliverables

### D1.1: Bindable `context` prop on Form.Root

**Module**: core/form

Add `context` as a bindable prop on `Form.Root` so parents can access `isSubmitting`, `isValid`, `isDirty`, `reset()`, `validate()` etc. via `bind:context`.

### D1.2: Schema-seeded initial values

**Module**: core/form

Seed all schema-declared fields with `''` during init so Zod never receives `undefined` for declared fields. Merged under user-provided `initialValues`.

### D1.3: Zod 4 type cast fix

**Module**: core/form

Cast individual field schemas through `z.ZodType` before calling `safeParse`, fixing type narrowing issues with Zod 4's stricter types.

## Verification

1. `bun run lint` — zero warnings
2. `bun run test:run` — all pass
3. `bun run build` — clean build
4. `bind:context` exposes form state to parent
5. Empty form with schema does not produce `undefined` validation errors
