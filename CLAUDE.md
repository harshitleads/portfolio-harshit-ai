# harshit.ai — Portfolio Website

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS, Vercel, pnpm
- Repo: harshitleads/harshit.ai

## Code Rules
- No em dashes anywhere in copy
- No placeholder content in production
- Gmail compose links only, never mailto links
- Filter logic is AND, must match all selected tags
- All case study pages must use shared case study components
- Traction pills: always Sentence Case, Sidebar icons: 24px
- NEVER run git commit/push/reset/checkout
- NEVER delete files unless task spec explicitly names the file

---

## ACTIVE TASK: Fix ScreenshotGallery lightbox navigation

### Context
The `ScreenshotGallery` component at `components/case-study/ScreenshotGallery.tsx` is used on all case study pages (eval-studio, claude-code-bridge, explainable-ai, dear-her, pm-salary-ace, job-market-pulse). Currently when a user clicks an image, the lightbox opens but there are NO left/right arrows to navigate between images. The user has to close the lightbox, go back to the grid, and click the next image. This is broken UX.

The homepage `projects-section.tsx` already has a full lightbox implementation with arrows, keyboard navigation, dots, zoom, and pan. Use it as reference.

### The Fix
In `components/case-study/ScreenshotGallery.tsx`:

1. Replace `openSrc` (string | null) state with `lightboxIdx` (number) state, similar to how `projects-section.tsx` does it
2. Add `ChevronLeft` and `ChevronRight` imports from lucide-react
3. Add left/right arrow buttons in the lightbox overlay (only show when screenshots.length > 1)
4. Add keyboard navigation: ArrowLeft, ArrowRight, Escape
5. Add dot indicators at the bottom showing which image is active
6. Keep the existing caption display
7. Do NOT add zoom/pan — keep it simpler than the homepage lightbox

### Reference
Look at the lightbox section in `components/projects-section.tsx` starting at the comment `{/* ---- LIGHTBOX (over everything) ---- */}` for the arrow buttons, keyboard handler, and dot indicators.

### Files to touch
- `components/case-study/ScreenshotGallery.tsx` — the only file that needs changes

### Acceptance Criteria
- Clicking any image opens lightbox at that image's index
- Left/right arrows visible in lightbox when more than 1 image
- ArrowLeft/ArrowRight keyboard keys navigate between images
- Escape closes lightbox
- Dot indicators show current position
- Caption updates when navigating
- Clicking outside the image closes the lightbox
- No zoom/pan needed
- All existing case study pages work without changes (the component interface stays the same)
