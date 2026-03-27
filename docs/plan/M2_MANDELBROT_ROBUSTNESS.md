# M2: Mandelbrot Robustness

## Goal
Handle non-UUID input in MandelbrotAvatar without producing NaN-based rendering artifacts.

**Depends on**: —
**Target version**: v0.7.0
**Status**: Complete (commit e41af17)

## Deliverables

### D2.1: Non-hex UUID fallback

**Module**: utils/mandelbrot

When `uuidToJuliaParams` receives non-hex input (e.g. plain strings, usernames), fall back to a simple string hash to derive deterministic Julia set parameters instead of producing `NaN`.

## Verification

1. `bun run lint` — zero warnings
2. `bun run test:run` — all pass
3. `bun run build` — clean build
4. `uuidToJuliaParams("not-a-uuid")` returns valid numeric parameters (no NaN)
