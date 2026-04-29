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

This is a React 19 + Vite app with no external state management, routing, or backend — all data is in-memory and resets on page reload.

`App` owns the single source of truth: the `transactions` array. It passes data down to three child components:

- `Summary` — calculates and displays total income, expenses, and balance from `transactions`
- `TransactionForm` — manages its own form field state; calls `onAdd(transaction)` prop on submit; converts `amount` to a number before passing it up
- `TransactionList` — manages its own filter state (`filterType`, `filterCategory`); derives the filtered list internally from the `transactions` prop

The `categories` array is defined locally in both `TransactionForm` and `TransactionList` (not shared via a module yet).

**Known intentional issue (course material):**
- "Freelance Work" is seeded as `type: "expense"` instead of `"income"`.

`App.css` contains a `.delete-btn` style that has no corresponding button in the JSX yet — it's pre-staged for a delete feature to be added.
