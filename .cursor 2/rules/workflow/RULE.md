---
description: "AI development workflow - maps slash commands to prompt files"
alwaysApply: true
---

## Workflow Commands
When the user types a slash command, read and follow the corresponding file:
- /create-issue → @.claude/commands/create-issue.md
- /explore → @.claude/commands/explore.md
- /create-plan → @.claude/commands/create-plan.md
- /execute → @.claude/commands/execute.md
- /review → @.claude/commands/review.md
- /peer-review → @.claude/commands/peer-review.md
- /document → @.claude/commands/document.md
- /learning-opportunity → @.claude/commands/learning-opportunity.md

## General Behavior
- Always read @CLAUDE.md before starting any task
- Ask clarifying questions before writing code, not after
- Make one change at a time and confirm before proceeding
- Never touch files outside the scope of the current task