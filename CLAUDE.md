# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run ESLint
```

No test suite is configured.

## Architecture

This is a React 19 + Vite app. The entire application lives in a single component: `src/App.jsx`.

`App` holds all state: the `transactions` array plus form inputs (`description`, `amount`, `type`, `category`) and filter state (`filterType`, `filterCategory`). There is no external state management, routing, or backend — all data is in-memory and resets on page reload.

**Known intentional issues (course material — fix as instructed):**
- `amount` is stored as a string, so `reduce` does string concatenation instead of addition, breaking the Income/Expenses/Balance summary totals.
- "Freelance Work" is seeded as `type: "expense"` instead of `"income"`.
- The UI is intentionally plain and the code is intentionally monolithic — refactoring into components is part of the course exercises.

`App.css` contains a `.delete-btn` style that has no corresponding button in the JSX yet — it's pre-staged for a delete feature to be added.
