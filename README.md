# harshit.ai

Source code for [harshit.ai](https://harshit.ai), the personal portfolio of Harshit Sharma.

Five AI products shipped in 12 weeks. Each one is live, functioning, and documented with product decisions explaining what was built, why, and what was rejected.

## What's on the site

- **PM Salary Ace** ([pmquiz.harshit.ai](https://pmquiz.harshit.ai)) -- 336 scenario-based PM interview questions across 5 salary tiers. 49% activation rate, zero paid distribution.
- **Eval Studio** ([eval.harshit.ai](https://eval.harshit.ai)) -- Browser-based LLM evaluation tool. Test prompts and models on your own data with multi-model judge council, cost tracking, and ranked results.
- **Dear Her** ([dearher.harshit.ai](https://dearher.harshit.ai)) -- AI letter generator. 59% conversion rate, 10 countries, shipped in 3 hours.
- **Explainable Coding Assistant** ([trust.harshit.ai](https://trust.harshit.ai)) -- Three-panel web app surfacing reasoning behind AI code suggestions.
- **claude-code-bridge** ([GitHub](https://github.com/harshitleads/claude-code-bridge)) -- Local MCP server bridging Claude Mac app and Cursor. Eliminates copy-paste between strategy and execution.

Each project has a full case study on the site with product decisions, design rationale, and honest limitations.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Deployed on Vercel, pnpm
- Shared case study component system (CaseStudySidebar, ScreenshotGallery, CaseStudyLayout)
- AND filter logic for project filtering
- Hero canvas animation (GPU optimized: 78% to 47%)

## Repo files

**CLAUDE.md** -- technical context for Claude Code. Stack, architecture, code rules, and a log of technical decisions.

**docs/decisions.md** -- product decision log. Why certain decisions were made, what tradeoffs were accepted, what alternatives were rejected.

---

Built by [Harshit Sharma](https://harshit.ai).
