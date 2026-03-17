# Project AI Instructions

Before starting any task, read @CLAUDE.md for project context, conventions, and architecture.

## Workflow
This project uses a structured development workflow. When the user invokes a command, 
read and follow the instructions in the corresponding file exactly as written:

- /create-issue → @.claude/commands/create-issue.md
- /explore → @.claude/commands/explore.md
- /create-plan → @.claude/commands/create-plan.md
- /execute → @.claude/commands/execute.md
- /review → @.claude/commands/review.md
- /peer-review → @.claude/commands/peer-review.md
- /document → @.claude/commands/document.md
- /learning-opportunity → @.claude/commands/learning-opportunity.md

## General Rules
- Read the relevant command file fully before responding
- Ask clarifying questions before writing any code
- Work one step at a time — don't jump ahead
- Only touch files relevant to the current task
- When reviewing code, be honest — don't sugarcoat issues
- Default language: [your language, e.g. TypeScript]
- Default framework: [your framework, e.g. Next.js]