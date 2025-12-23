# AI Experiments - Project Context

## Project Overview
This repository, `ai-experiments`, serves as a testing ground for AI agents to perform software engineering tasks. It is a TypeScript-based project currently focused on a billing logic system, designed to simulate real-world business rule implementation and complexity management.

## Tech Stack
*   **Language:** TypeScript (ES Modules)
*   **Runtime:** Node.js
*   **Linting & Formatting:** [Biome](https://biomejs.dev/)
*   **Type Checking:** Experimental `@typescript/native-preview` (using `tsgo` command)

## Key Files & Directories
*   **`src/logic.ts`**: Contains the core business logic for calculating final prices, applying discounts, and handling coupons.
*   **`src/utils.ts`**: Provides helper functions for formatting currency and logging.
*   **`biome.json`**: Configuration for the Biome linter and formatter.

## Development & Usage

### Installation
Ensure dependencies are installed:
```bash
npm install
```

### Quality Assurance
The project includes a `quality-check` script that runs both the Biome linter/formatter and the TypeScript compiler.
```bash
npm run quality-check
```
*   **Biome**: Checks for formatting and linting errors.
*   **TypeScript**: Uses `tsgo --noEmit` to verify type safety.

## Coding Conventions
*   **Style**: Strictly adhere to Biome formatting rules.
*   **Architecture**: Keep business logic separated from utility functions.
*   **Complexity**: Be mindful of code complexity. The `nervous_system.json` file imposes thresholds. When adding features, ensure logic remains readable and doesn't exceed these limits. Refactor if necessary.
*   **Testing**: While no specific test runner is currently configured in `scripts`, code should be written to be easily testable.

