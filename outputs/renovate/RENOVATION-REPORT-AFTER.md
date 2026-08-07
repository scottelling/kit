# Renovation Report

> **CLEANUP VERIFIED** — The three approved UI corrections are applied and passed the complete project check plus the repeated production-build visual review. Deployment was not performed.

Project: `/Users/scott/ScottAI/01_Active_Projects/kit`  
Generated: `2026-08-04T20:16:41Z`

## Executive summary

| Status | Findings | Unique LOC | Size |
|---|---:|---:|---:|
| FIX | 0 | — | — |
| SAFE TO REMOVE | 0 | 0 | 0 B |
| UNPROVEN | 163 | — | — |
| REVIEW | 193 | 5,631 | 313.3 KB |
| KEEP | 5 | — | — |

## Coverage

- Rot scan: 224 source files; 21,033 LOC.
- Numeric discovery: 209 source files; 163 unproven islands.
- Freerange: not executed or not supplied.
- UI review: 4 routes; 4 viewports; 5 findings.

## Ranked findings

| ID | Lane | Status | Risk | Location | Finding | Evidence / proof |
|---|---|---|---|---|---|---|
| NUM-001 | Numbers | **UNPROVEN** | medium | `app/elements/element-showroom.tsx:32` | potential-index-boundary at app/elements/element-showroom.tsx:32 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-002 | Numbers | **UNPROVEN** | medium | `app/elements/element-showroom.tsx:52` | potential-index-boundary at app/elements/element-showroom.tsx:52 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-003 | Numbers | **UNPROVEN** | medium | `app/elements/page.tsx:16` | potential-index-boundary at app/elements/page.tsx:16 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-005 | Numbers | **UNPROVEN** | medium | `app/kit/component-preview.tsx:298` | potential-index-boundary at app/kit/component-preview.tsx:298 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-006 | Numbers | **UNPROVEN** | medium | `app/kit/component-preview.tsx:324` | potential-zero-divisor at app/kit/component-preview.tsx:324 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-008 | Numbers | **UNPROVEN** | medium | `app/kit/jade/jade-experience.tsx:241` | potential-index-boundary at app/kit/jade/jade-experience.tsx:241 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-007 | Numbers | **UNPROVEN** | medium | `app/kit/jade/jade-experience.tsx:94` | potential-index-boundary at app/kit/jade/jade-experience.tsx:94 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-010 | Numbers | **UNPROVEN** | medium | `app/kit/kit-experience.tsx:165` | potential-zero-divisor at app/kit/kit-experience.tsx:165 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-011 | Numbers | **UNPROVEN** | medium | `app/kit/kit-experience.tsx:202` | potential-index-boundary at app/kit/kit-experience.tsx:202 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-012 | Numbers | **UNPROVEN** | medium | `app/kit/kit-experience.tsx:202` | potential-zero-divisor at app/kit/kit-experience.tsx:202 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-009 | Numbers | **UNPROVEN** | medium | `app/kit/kit-experience.tsx:42` | potential-index-boundary at app/kit/kit-experience.tsx:42 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-013 | Numbers | **UNPROVEN** | medium | `app/kit/os/os-workbench.tsx:13` | potential-index-boundary at app/kit/os/os-workbench.tsx:13 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-014 | Numbers | **UNPROVEN** | medium | `app/kit/os/os-workbench.tsx:18` | potential-index-boundary at app/kit/os/os-workbench.tsx:18 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-015 | Numbers | **UNPROVEN** | medium | `app/labs/creative-labs.tsx:28` | potential-index-boundary at app/labs/creative-labs.tsx:28 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-016 | Numbers | **UNPROVEN** | medium | `app/labs/theme-workshop.tsx:141` | potential-index-boundary at app/labs/theme-workshop.tsx:141 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-019 | Numbers | **UNPROVEN** | medium | `app/preview/page.tsx:22` | potential-index-boundary at app/preview/page.tsx:22 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-020 | Numbers | **UNPROVEN** | medium | `app/preview/preview-experience.tsx:13` | potential-index-boundary at app/preview/preview-experience.tsx:13 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-021 | Numbers | **UNPROVEN** | medium | `app/projects/projects-room.tsx:45` | potential-index-boundary at app/projects/projects-room.tsx:45 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-022 | Numbers | **UNPROVEN** | medium | `app/quality/quality-room.tsx:43` | potential-index-boundary at app/quality/quality-room.tsx:43 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-028 | Numbers | **UNPROVEN** | medium | `app/studio/studio-experience.tsx:135` | potential-index-boundary at app/studio/studio-experience.tsx:135 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-029 | Numbers | **UNPROVEN** | medium | `app/studio/studio-experience.tsx:195` | potential-index-boundary at app/studio/studio-experience.tsx:195 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-023 | Numbers | **UNPROVEN** | medium | `app/studio/studio-experience.tsx:62` | potential-index-boundary at app/studio/studio-experience.tsx:62 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-024 | Numbers | **UNPROVEN** | medium | `app/studio/studio-experience.tsx:88` | potential-index-boundary at app/studio/studio-experience.tsx:88 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-025 | Numbers | **UNPROVEN** | medium | `app/studio/studio-experience.tsx:89` | potential-index-boundary at app/studio/studio-experience.tsx:89 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-026 | Numbers | **UNPROVEN** | medium | `app/studio/studio-experience.tsx:90` | potential-index-boundary at app/studio/studio-experience.tsx:90 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-027 | Numbers | **UNPROVEN** | medium | `app/studio/studio-experience.tsx:91` | potential-index-boundary at app/studio/studio-experience.tsx:91 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-030 | Numbers | **UNPROVEN** | medium | `app/templates/template-foundry.tsx:22` | potential-index-boundary at app/templates/template-foundry.tsx:22 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-031 | Numbers | **UNPROVEN** | medium | `app/templates/template-foundry.tsx:58` | potential-zero-divisor at app/templates/template-foundry.tsx:58 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-032 | Numbers | **UNPROVEN** | medium | `app/templates/template-foundry.tsx:59` | potential-index-boundary at app/templates/template-foundry.tsx:59 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-033 | Numbers | **UNPROVEN** | medium | `components/site-header.tsx:113` | potential-index-boundary at components/site-header.tsx:113 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-034 | Numbers | **UNPROVEN** | medium | `lib/project-studio.ts:182` | potential-index-boundary at lib/project-studio.ts:182 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-035 | Numbers | **UNPROVEN** | medium | `lib/project-studio.ts:255` | potential-index-boundary at lib/project-studio.ts:255 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-037 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:211` | potential-zero-divisor at lib/theme-workshop.ts:211 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-038 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:262` | potential-zero-divisor at lib/theme-workshop.ts:262 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-039 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:280` | potential-zero-divisor at lib/theme-workshop.ts:280 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-041 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:290` | potential-zero-divisor at lib/theme-workshop.ts:290 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-042 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:291` | potential-zero-divisor at lib/theme-workshop.ts:291 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-043 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:297` | potential-index-boundary at lib/theme-workshop.ts:297 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-045 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:308` | potential-zero-divisor at lib/theme-workshop.ts:308 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-047 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:320` | potential-zero-divisor at lib/theme-workshop.ts:320 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-048 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:353` | potential-zero-divisor at lib/theme-workshop.ts:353 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-049 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:354` | potential-zero-divisor at lib/theme-workshop.ts:354 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-052 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:523` | potential-zero-divisor at lib/theme-workshop.ts:523 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-053 | Numbers | **UNPROVEN** | medium | `lib/theme-workshop.ts:524` | potential-zero-divisor at lib/theme-workshop.ts:524 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-069 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:106` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:106 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-071 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:109` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:109 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-072 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:110` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:110 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-074 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:110` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:110 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-075 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:117` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:117 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-079 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:122` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:122 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-080 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:123` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:123 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-082 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:132` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:132 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-083 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:134` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:134 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-086 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:138` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:138 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-088 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:138` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:138 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-092 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:145` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:145 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-093 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:146` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:146 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-095 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:150` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:150 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-096 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:151` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:151 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-098 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:151` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:151 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-099 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:158` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:158 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-102 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:182` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:182 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-104 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:183` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:183 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-106 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:184` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:184 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-107 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:202` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:202 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-112 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:217` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:217 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-113 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:218` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:218 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-115 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:236` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:236 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-116 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:236` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:236 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-120 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:266` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:266 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-122 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:268` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:268 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-123 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:269` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:269 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-136 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:369` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:369 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-137 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:371` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:371 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-138 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:374` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:374 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-139 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:376` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:376 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-140 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:391` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:391 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-141 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:397` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:397 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-143 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:407` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:407 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-147 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:438` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:438 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-150 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:594` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:594 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-055 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:70` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:70 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-058 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:76` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:76 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-059 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:76` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:76 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-060 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:77` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:77 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-061 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:77` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:77 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-062 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:78` | potential-index-boundary at registry/elements/larson-scanner/larson-scanner.tsx:78 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-063 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:78` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:78 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-064 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:79` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:79 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-066 | Numbers | **UNPROVEN** | medium | `registry/elements/larson-scanner/larson-scanner.tsx:98` | potential-zero-divisor at registry/elements/larson-scanner/larson-scanner.tsx:98 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-151 | Numbers | **UNPROVEN** | medium | `registry/os/patterns/command-bar.tsx:33` | potential-zero-divisor at registry/os/patterns/command-bar.tsx:33 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-152 | Numbers | **UNPROVEN** | medium | `registry/os/patterns/command-bar.tsx:34` | potential-zero-divisor at registry/os/patterns/command-bar.tsx:34 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-153 | Numbers | **UNPROVEN** | medium | `registry/os/patterns/command-bar.tsx:35` | potential-index-boundary at registry/os/patterns/command-bar.tsx:35 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-154 | Numbers | **UNPROVEN** | medium | `registry/os/patterns/dock.tsx:22` | potential-index-boundary at registry/os/patterns/dock.tsx:22 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-155 | Numbers | **UNPROVEN** | medium | `registry/os/patterns/master-detail.tsx:21` | potential-index-boundary at registry/os/patterns/master-detail.tsx:21 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-156 | Numbers | **UNPROVEN** | medium | `registry/os/patterns/master-detail.tsx:24` | potential-index-boundary at registry/os/patterns/master-detail.tsx:24 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-157 | Numbers | **UNPROVEN** | medium | `registry/os/patterns/settings-sheet.tsx:11` | potential-index-boundary at registry/os/patterns/settings-sheet.tsx:11 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-158 | Numbers | **UNPROVEN** | medium | `scripts/verify-elements.mjs:21` | potential-index-boundary at scripts/verify-elements.mjs:21 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-159 | Numbers | **UNPROVEN** | medium | `scripts/verify-os.mjs:15` | potential-index-boundary at scripts/verify-os.mjs:15 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-160 | Numbers | **UNPROVEN** | medium | `scripts/verify-os.mjs:19` | potential-zero-divisor at scripts/verify-os.mjs:19 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-163 | Numbers | **UNPROVEN** | medium | `scripts/verify-os.mjs:41` | potential-zero-divisor at scripts/verify-os.mjs:41 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-004 | Numbers | **UNPROVEN** | low | `app/kit/component-preview.tsx:211` | range-sensitive-math at app/kit/component-preview.tsx:211 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-017 | Numbers | **UNPROVEN** | low | `app/labs/theme-workshop.tsx:256` | range-sensitive-math at app/labs/theme-workshop.tsx:256 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-018 | Numbers | **UNPROVEN** | low | `app/labs/theme-workshop.tsx:297` | ui-geometry at app/labs/theme-workshop.tsx:297 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-036 | Numbers | **UNPROVEN** | low | `lib/theme-workshop.ts:169` | range-sensitive-math at lib/theme-workshop.ts:169 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-040 | Numbers | **UNPROVEN** | low | `lib/theme-workshop.ts:285` | range-sensitive-math at lib/theme-workshop.ts:285 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-044 | Numbers | **UNPROVEN** | low | `lib/theme-workshop.ts:307` | range-sensitive-math at lib/theme-workshop.ts:307 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-046 | Numbers | **UNPROVEN** | low | `lib/theme-workshop.ts:320` | range-sensitive-math at lib/theme-workshop.ts:320 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-050 | Numbers | **UNPROVEN** | low | `lib/theme-workshop.ts:375` | range-sensitive-math at lib/theme-workshop.ts:375 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-051 | Numbers | **UNPROVEN** | low | `lib/theme-workshop.ts:377` | range-sensitive-math at lib/theme-workshop.ts:377 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-067 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:101` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:101 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-068 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:105` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:105 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-070 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:109` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:109 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-073 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:110` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:110 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-076 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:120` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:120 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-077 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:121` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:121 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-078 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:122` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:122 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-081 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:123` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:123 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-084 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:135` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:135 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-085 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:137` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:137 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-087 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:138` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:138 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-089 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:140` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:140 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-090 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:143` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:143 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-091 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:145` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:145 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-094 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:150` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:150 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-097 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:151` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:151 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-100 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:162` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:162 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-101 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:177` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:177 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-103 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:183` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:183 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-105 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:184` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:184 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-108 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:204` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:204 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-109 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:205` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:205 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-110 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:206` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:206 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-111 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:217` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:217 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-114 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:219` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:219 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-117 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:243` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:243 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-118 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:248` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:248 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-119 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:262` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:262 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-121 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:268` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:268 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-124 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:289` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:289 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-125 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:321` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:321 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-126 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:347` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:347 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-127 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:347` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:347 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-128 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:348` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:348 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-129 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:348` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:348 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-130 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:349` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:349 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-131 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:350` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:350 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-132 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:350` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:350 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-133 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:351` | ui-geometry at registry/elements/larson-scanner/larson-scanner.tsx:351 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-134 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:351` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:351 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-135 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:369` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:369 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-142 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:404` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:404 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-144 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:407` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:407 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-145 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:437` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:437 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-146 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:438` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:438 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-148 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:450` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:450 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-054 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:57` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:57 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-149 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:573` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:573 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-056 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:71` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:71 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-057 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:72` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:72 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-065 | Numbers | **UNPROVEN** | low | `registry/elements/larson-scanner/larson-scanner.tsx:97` | range-sensitive-math at registry/elements/larson-scanner/larson-scanner.tsx:97 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-161 | Numbers | **UNPROVEN** | low | `scripts/verify-os.mjs:28` | range-sensitive-math at scripts/verify-os.mjs:28 | Syntax discovery only; numeric range or behavioral proof is required. |
| NUM-162 | Numbers | **UNPROVEN** | low | `scripts/verify-os.mjs:41` | range-sensitive-math at scripts/verify-os.mjs:41 | Syntax discovery only; numeric range or behavioral proof is required. |
| ROT-173 | Rot | **REVIEW** | medium | `app/demo/page.tsx:15` | DemoPage from app/demo/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-174 | Rot | **REVIEW** | medium | `app/elements/page.tsx:15` | ElementsPage from app/elements/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-175 | Rot | **REVIEW** | medium | `app/kit/jade/compare/page.tsx:11` | JadeComparePage from app/kit/jade/compare/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-176 | Rot | **REVIEW** | medium | `app/kit/jade/page.tsx:15` | JadePage from app/kit/jade/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-177 | Rot | **REVIEW** | medium | `app/kit/os/page.tsx:15` | OsKitPage from app/kit/os/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-178 | Rot | **REVIEW** | medium | `app/kit/page.tsx:14` | KitPage from app/kit/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-179 | Rot | **REVIEW** | medium | `app/kit/shadow/page.tsx:11` | ShadowPage from app/kit/shadow/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-180 | Rot | **REVIEW** | medium | `app/labs/page.tsx:13` | LabsPage from app/labs/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-001 | Rot | **REVIEW** | medium | `app/labs/theme-workshop.tsx` | app/labs/theme-workshop.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-181 | Rot | **REVIEW** | medium | `app/layout.tsx:29` | RootLayout from app/layout.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-182 | Rot | **REVIEW** | medium | `app/preview/page.tsx:18` | PreviewPage from app/preview/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-183 | Rot | **REVIEW** | medium | `app/projects/page.tsx:10` | ProjectsPage from app/projects/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-184 | Rot | **REVIEW** | medium | `app/quality/page.tsx:10` | QualityPage from app/quality/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-185 | Rot | **REVIEW** | medium | `app/studio/page.tsx:13` | StudioPage from app/studio/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-186 | Rot | **REVIEW** | medium | `app/templates/page.tsx:12` | TemplatesPage from app/templates/page.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-187 | Rot | **REVIEW** | medium | `components/copy-command.tsx:12` | CopyCommand from components/copy-command.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-003 | Rot | **REVIEW** | medium | `components/project-canvas.tsx` | components/project-canvas.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-004 | Rot | **REVIEW** | medium | `components/site-footer.tsx` | components/site-footer.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-005 | Rot | **REVIEW** | medium | `components/site-header.tsx` | components/site-header.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-006 | Rot | **REVIEW** | medium | `components/studio-nav.tsx` | components/studio-nav.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-007 | Rot | **REVIEW** | medium | `components/ui/badge.tsx` | components/ui/badge.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-008 | Rot | **REVIEW** | medium | `components/ui/button.tsx` | components/ui/button.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-009 | Rot | **REVIEW** | medium | `components/ui/card.tsx` | components/ui/card.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-010 | Rot | **REVIEW** | medium | `components/ui/dialog.tsx` | components/ui/dialog.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-011 | Rot | **REVIEW** | medium | `components/ui/input.tsx` | components/ui/input.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-012 | Rot | **REVIEW** | medium | `lib/project-studio.ts` | lib/project-studio.ts | Not proven against a green baseline in a disposable copy. |
| ROT-189 | Rot | **REVIEW** | medium | `lib/project-studio.ts:131` | defaultBriefs from lib/project-studio.ts | Not proven against a green baseline in a disposable copy. |
| ROT-188 | Rot | **REVIEW** | medium | `lib/project-studio.ts:34` | TemplateFamily from lib/project-studio.ts | Not proven against a green baseline in a disposable copy. |
| ROT-013 | Rot | **REVIEW** | medium | `lib/shadow-system.ts` | lib/shadow-system.ts | Not proven against a green baseline in a disposable copy. |
| ROT-014 | Rot | **REVIEW** | medium | `lib/studio-library.ts` | lib/studio-library.ts | Not proven against a green baseline in a disposable copy. |
| ROT-015 | Rot | **REVIEW** | medium | `lib/theme-workshop.ts` | lib/theme-workshop.ts | Not proven against a green baseline in a disposable copy. |
| ROT-191 | Rot | **REVIEW** | medium | `lib/theme-workshop.ts:317` | contrastRatio from lib/theme-workshop.ts | Not proven against a green baseline in a disposable copy. |
| ROT-193 | Rot | **REVIEW** | medium | `lib/theme-workshop.ts:496` | workshopCssVars from lib/theme-workshop.ts | Not proven against a green baseline in a disposable copy. |
| ROT-192 | Rot | **REVIEW** | medium | `lib/theme-workshop.ts:55` | themeBases from lib/theme-workshop.ts | Not proven against a green baseline in a disposable copy. |
| ROT-190 | Rot | **REVIEW** | medium | `lib/theme-workshop.ts:6` | OklchColor from lib/theme-workshop.ts | Not proven against a green baseline in a disposable copy. |
| ROT-016 | Rot | **REVIEW** | medium | `lib/use-studio-projects.ts` | lib/use-studio-projects.ts | Not proven against a green baseline in a disposable copy. |
| ROT-017 | Rot | **REVIEW** | medium | `lib/utils.ts` | lib/utils.ts | Not proven against a green baseline in a disposable copy. |
| ROT-018 | Rot | **REVIEW** | medium | `next-env.d.ts` | next-env.d.ts | Not proven against a green baseline in a disposable copy. |
| ROT-167 | Rot | **REVIEW** | medium | `package.json` | @base-ui/react (dependencies) | Not proven against a green baseline in a disposable copy. |
| ROT-168 | Rot | **REVIEW** | medium | `package.json` | @types/node (devDependencies) | Not proven against a green baseline in a disposable copy. |
| ROT-169 | Rot | **REVIEW** | medium | `package.json` | @types/react (devDependencies) | Not proven against a green baseline in a disposable copy. |
| ROT-170 | Rot | **REVIEW** | medium | `package.json` | @types/react-dom (devDependencies) | Not proven against a green baseline in a disposable copy. |
| ROT-171 | Rot | **REVIEW** | medium | `package.json` | react-dom (dependencies) | Not proven against a green baseline in a disposable copy. |
| ROT-172 | Rot | **REVIEW** | medium | `package.json` | typescript (devDependencies) | Not proven against a green baseline in a disposable copy. |
| ROT-019 | Rot | **REVIEW** | medium | `registry/elements/larson-scanner/larson-scanner.tsx` | registry/elements/larson-scanner/larson-scanner.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-020 | Rot | **REVIEW** | medium | `registry/os/patterns/command-bar.tsx` | registry/os/patterns/command-bar.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-021 | Rot | **REVIEW** | medium | `registry/os/patterns/desktop-shell.tsx` | registry/os/patterns/desktop-shell.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-022 | Rot | **REVIEW** | medium | `registry/os/patterns/dock.tsx` | registry/os/patterns/dock.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-023 | Rot | **REVIEW** | medium | `registry/os/patterns/master-detail.tsx` | registry/os/patterns/master-detail.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-024 | Rot | **REVIEW** | medium | `registry/os/patterns/menu-bar.tsx` | registry/os/patterns/menu-bar.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-025 | Rot | **REVIEW** | medium | `registry/os/patterns/settings-sheet.tsx` | registry/os/patterns/settings-sheet.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-026 | Rot | **REVIEW** | medium | `registry/os/patterns/split-view.tsx` | registry/os/patterns/split-view.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-027 | Rot | **REVIEW** | medium | `registry/os/patterns/widget-shell.tsx` | registry/os/patterns/widget-shell.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-028 | Rot | **REVIEW** | medium | `registry/os/patterns/window-shell.tsx` | registry/os/patterns/window-shell.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-029 | Rot | **REVIEW** | medium | `registry/purple-rain/application/application-shell.tsx` | registry/purple-rain/application/application-shell.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-030 | Rot | **REVIEW** | medium | `registry/purple-rain/application/document-surface.tsx` | registry/purple-rain/application/document-surface.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-031 | Rot | **REVIEW** | medium | `registry/purple-rain/application/editor-toolbar.tsx` | registry/purple-rain/application/editor-toolbar.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-032 | Rot | **REVIEW** | medium | `registry/purple-rain/application/mobile-app-nav.tsx` | registry/purple-rain/application/mobile-app-nav.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-033 | Rot | **REVIEW** | medium | `registry/purple-rain/application/status-bar.tsx` | registry/purple-rain/application/status-bar.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-034 | Rot | **REVIEW** | medium | `registry/purple-rain/application/task-board.tsx` | registry/purple-rain/application/task-board.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-035 | Rot | **REVIEW** | medium | `registry/purple-rain/application/task-rail.tsx` | registry/purple-rain/application/task-rail.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-036 | Rot | **REVIEW** | medium | `registry/purple-rain/application/terminal-surface.tsx` | registry/purple-rain/application/terminal-surface.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-037 | Rot | **REVIEW** | medium | `registry/purple-rain/application/viewer-shell.tsx` | registry/purple-rain/application/viewer-shell.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-038 | Rot | **REVIEW** | medium | `registry/purple-rain/application/workspace-tree.tsx` | registry/purple-rain/application/workspace-tree.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-039 | Rot | **REVIEW** | medium | `registry/purple-rain/badge.tsx` | registry/purple-rain/badge.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-040 | Rot | **REVIEW** | medium | `registry/purple-rain/button.tsx` | registry/purple-rain/button.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-041 | Rot | **REVIEW** | medium | `registry/purple-rain/card.tsx` | registry/purple-rain/card.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-042 | Rot | **REVIEW** | medium | `registry/purple-rain/dialog.tsx` | registry/purple-rain/dialog.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-043 | Rot | **REVIEW** | medium | `registry/purple-rain/input.tsx` | registry/purple-rain/input.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-044 | Rot | **REVIEW** | medium | `registry/purple-rain/library/accordion.tsx` | registry/purple-rain/library/accordion.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-045 | Rot | **REVIEW** | medium | `registry/purple-rain/library/action-menu.tsx` | registry/purple-rain/library/action-menu.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-046 | Rot | **REVIEW** | medium | `registry/purple-rain/library/activity-feed.tsx` | registry/purple-rain/library/activity-feed.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-047 | Rot | **REVIEW** | medium | `registry/purple-rain/library/agenda.tsx` | registry/purple-rain/library/agenda.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-048 | Rot | **REVIEW** | medium | `registry/purple-rain/library/alert-dialog.tsx` | registry/purple-rain/library/alert-dialog.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-049 | Rot | **REVIEW** | medium | `registry/purple-rain/library/alert.tsx` | registry/purple-rain/library/alert.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-050 | Rot | **REVIEW** | medium | `registry/purple-rain/library/anchor-nav.tsx` | registry/purple-rain/library/anchor-nav.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-051 | Rot | **REVIEW** | medium | `registry/purple-rain/library/app-shell.tsx` | registry/purple-rain/library/app-shell.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-052 | Rot | **REVIEW** | medium | `registry/purple-rain/library/app-switcher.tsx` | registry/purple-rain/library/app-switcher.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-053 | Rot | **REVIEW** | medium | `registry/purple-rain/library/auth-card.tsx` | registry/purple-rain/library/auth-card.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-054 | Rot | **REVIEW** | medium | `registry/purple-rain/library/avatar-group.tsx` | registry/purple-rain/library/avatar-group.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-055 | Rot | **REVIEW** | medium | `registry/purple-rain/library/avatar.tsx` | registry/purple-rain/library/avatar.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-056 | Rot | **REVIEW** | medium | `registry/purple-rain/library/back-link.tsx` | registry/purple-rain/library/back-link.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-057 | Rot | **REVIEW** | medium | `registry/purple-rain/library/banner.tsx` | registry/purple-rain/library/banner.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-058 | Rot | **REVIEW** | medium | `registry/purple-rain/library/bar-chart.tsx` | registry/purple-rain/library/bar-chart.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-059 | Rot | **REVIEW** | medium | `registry/purple-rain/library/bottom-nav.tsx` | registry/purple-rain/library/bottom-nav.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-060 | Rot | **REVIEW** | medium | `registry/purple-rain/library/breadcrumb.tsx` | registry/purple-rain/library/breadcrumb.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-061 | Rot | **REVIEW** | medium | `registry/purple-rain/library/bulk-action-bar.tsx` | registry/purple-rain/library/bulk-action-bar.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-062 | Rot | **REVIEW** | medium | `registry/purple-rain/library/button-group.tsx` | registry/purple-rain/library/button-group.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-063 | Rot | **REVIEW** | medium | `registry/purple-rain/library/calendar.tsx` | registry/purple-rain/library/calendar.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-064 | Rot | **REVIEW** | medium | `registry/purple-rain/library/carousel.tsx` | registry/purple-rain/library/carousel.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-065 | Rot | **REVIEW** | medium | `registry/purple-rain/library/cart-summary.tsx` | registry/purple-rain/library/cart-summary.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-066 | Rot | **REVIEW** | medium | `registry/purple-rain/library/checkbox-group.tsx` | registry/purple-rain/library/checkbox-group.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-067 | Rot | **REVIEW** | medium | `registry/purple-rain/library/checkbox.tsx` | registry/purple-rain/library/checkbox.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-068 | Rot | **REVIEW** | medium | `registry/purple-rain/library/checkout-form.tsx` | registry/purple-rain/library/checkout-form.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-069 | Rot | **REVIEW** | medium | `registry/purple-rain/library/collapsible.tsx` | registry/purple-rain/library/collapsible.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-070 | Rot | **REVIEW** | medium | `registry/purple-rain/library/color-input.tsx` | registry/purple-rain/library/color-input.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-071 | Rot | **REVIEW** | medium | `registry/purple-rain/library/color-swatch.tsx` | registry/purple-rain/library/color-swatch.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-072 | Rot | **REVIEW** | medium | `registry/purple-rain/library/combobox.tsx` | registry/purple-rain/library/combobox.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-073 | Rot | **REVIEW** | medium | `registry/purple-rain/library/command-menu.tsx` | registry/purple-rain/library/command-menu.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-074 | Rot | **REVIEW** | medium | `registry/purple-rain/library/command-palette.tsx` | registry/purple-rain/library/command-palette.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-075 | Rot | **REVIEW** | medium | `registry/purple-rain/library/contact-form.tsx` | registry/purple-rain/library/contact-form.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-076 | Rot | **REVIEW** | medium | `registry/purple-rain/library/container.tsx` | registry/purple-rain/library/container.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-077 | Rot | **REVIEW** | medium | `registry/purple-rain/library/context-menu.tsx` | registry/purple-rain/library/context-menu.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-078 | Rot | **REVIEW** | medium | `registry/purple-rain/library/copy-button.tsx` | registry/purple-rain/library/copy-button.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-079 | Rot | **REVIEW** | medium | `registry/purple-rain/library/data-table.tsx` | registry/purple-rain/library/data-table.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-080 | Rot | **REVIEW** | medium | `registry/purple-rain/library/date-picker.tsx` | registry/purple-rain/library/date-picker.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-081 | Rot | **REVIEW** | medium | `registry/purple-rain/library/description-list.tsx` | registry/purple-rain/library/description-list.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-082 | Rot | **REVIEW** | medium | `registry/purple-rain/library/donut-chart.tsx` | registry/purple-rain/library/donut-chart.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-083 | Rot | **REVIEW** | medium | `registry/purple-rain/library/drawer.tsx` | registry/purple-rain/library/drawer.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-084 | Rot | **REVIEW** | medium | `registry/purple-rain/library/dropdown-menu.tsx` | registry/purple-rain/library/dropdown-menu.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-085 | Rot | **REVIEW** | medium | `registry/purple-rain/library/dropzone.tsx` | registry/purple-rain/library/dropzone.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-086 | Rot | **REVIEW** | medium | `registry/purple-rain/library/empty-state.tsx` | registry/purple-rain/library/empty-state.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-087 | Rot | **REVIEW** | medium | `registry/purple-rain/library/error-state.tsx` | registry/purple-rain/library/error-state.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-088 | Rot | **REVIEW** | medium | `registry/purple-rain/library/favorite-button.tsx` | registry/purple-rain/library/favorite-button.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-089 | Rot | **REVIEW** | medium | `registry/purple-rain/library/feedback-form.tsx` | registry/purple-rain/library/feedback-form.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-090 | Rot | **REVIEW** | medium | `registry/purple-rain/library/field.tsx` | registry/purple-rain/library/field.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-091 | Rot | **REVIEW** | medium | `registry/purple-rain/library/file-upload.tsx` | registry/purple-rain/library/file-upload.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-092 | Rot | **REVIEW** | medium | `registry/purple-rain/library/filter-bar.tsx` | registry/purple-rain/library/filter-bar.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-093 | Rot | **REVIEW** | medium | `registry/purple-rain/library/filter-tabs.tsx` | registry/purple-rain/library/filter-tabs.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-094 | Rot | **REVIEW** | medium | `registry/purple-rain/library/floating-action-button.tsx` | registry/purple-rain/library/floating-action-button.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-095 | Rot | **REVIEW** | medium | `registry/purple-rain/library/focus-ring.tsx` | registry/purple-rain/library/focus-ring.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-096 | Rot | **REVIEW** | medium | `registry/purple-rain/library/forgot-password-form.tsx` | registry/purple-rain/library/forgot-password-form.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-097 | Rot | **REVIEW** | medium | `registry/purple-rain/library/hover-card.tsx` | registry/purple-rain/library/hover-card.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-098 | Rot | **REVIEW** | medium | `registry/purple-rain/library/icon-button.tsx` | registry/purple-rain/library/icon-button.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-099 | Rot | **REVIEW** | medium | `registry/purple-rain/library/inline-edit.tsx` | registry/purple-rain/library/inline-edit.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-100 | Rot | **REVIEW** | medium | `registry/purple-rain/library/invite-form.tsx` | registry/purple-rain/library/invite-form.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-101 | Rot | **REVIEW** | medium | `registry/purple-rain/library/lightbox.tsx` | registry/purple-rain/library/lightbox.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-102 | Rot | **REVIEW** | medium | `registry/purple-rain/library/link-button.tsx` | registry/purple-rain/library/link-button.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-103 | Rot | **REVIEW** | medium | `registry/purple-rain/library/list-item.tsx` | registry/purple-rain/library/list-item.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-104 | Rot | **REVIEW** | medium | `registry/purple-rain/library/list.tsx` | registry/purple-rain/library/list.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-105 | Rot | **REVIEW** | medium | `registry/purple-rain/library/loading-dots.tsx` | registry/purple-rain/library/loading-dots.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-106 | Rot | **REVIEW** | medium | `registry/purple-rain/library/menu-button.tsx` | registry/purple-rain/library/menu-button.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-107 | Rot | **REVIEW** | medium | `registry/purple-rain/library/meter.tsx` | registry/purple-rain/library/meter.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-108 | Rot | **REVIEW** | medium | `registry/purple-rain/library/navigation-menu.tsx` | registry/purple-rain/library/navigation-menu.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-109 | Rot | **REVIEW** | medium | `registry/purple-rain/library/notification-center.tsx` | registry/purple-rain/library/notification-center.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-110 | Rot | **REVIEW** | medium | `registry/purple-rain/library/number-input.tsx` | registry/purple-rain/library/number-input.tsx | Not proven against a green baseline in a disposable copy. |
| ROT-111 | Rot | **REVIEW** | medium | `registry/purple-rain/library/offline-state.tsx` | registry/purple-rain/library/offline-state.tsx | Not proven against a green baseline in a disposable copy. |

The Markdown report shows the first 300 ranked findings; the CSV contains all 361 findings.

## Renovation approval checkpoint

No cleanup has been applied. Select exact IDs and paths, keep rot, numeric, and UI work in separate causal batches, and approve the exact verification commands before real changes.

```text
Approved IDs: _______________________________
Approved paths: _____________________________
Approved verification commands: ____________
Deployment included: no
```

## Scope and limitations

- Static analysis cannot prove absence of dynamic, reflective, operational, platform-specific, or external use.
- Import resolution is intentionally conservative and does not implement every alias, package export, or framework convention.
- Unused dependencies and exports remain leads until project-native tooling and focused proof support removal.
- No target-project command, package binary, or application code was executed.
- Every candidate is UNPROVEN; syntax discovery is neither a bug report nor a safety proof.
- The dependency-free parser is heuristic and can miss or misclassify complex TypeScript, JSX, templates, regexes, generated syntax, aliases, and minified code.
- UI geometry relevance requires rendered-state review; numeric relevance requires Freerange, tests, assertions, or manual reasoning.
- The corrected review covers the four public kit showrooms at four meaningful sizes and the changed interaction states. It does not claim exhaustive visual review of every state of every component.
- Deployment, publication, committing, and pushing were not included in the approved correction batch and were not performed.
