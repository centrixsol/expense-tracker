# Finance Tracker

A clean, responsive personal finance tracker built with React 19 and Vite. Add transactions, categorize them, filter by type or category, and see a live summary of your income, expenses, and net balance.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

- **Live summary** — income, expenses, and net balance update instantly as you add transactions
- **Category badges** — color-coded labels (Food, Housing, Utilities, Transport, Entertainment, Salary, Other)
- **Filtering** — narrow the transaction list by type (Income / Expense) and by category
- **Formatted currency** — amounts displayed with commas and two decimal places
- **Responsive layout** — works on desktop and mobile

---

## Getting Started

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

### Other commands

| Command | Description |
|---|---|
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Architecture

This is a **React 19 + Vite** single-page app with no external state management, routing, or backend. All data lives in memory and resets on page reload.

### Component tree

```
App
├── Summary
├── TransactionForm
└── TransactionList
```

### Data flow

`App` is the single source of truth. It owns the `transactions` array in state and passes it down as props:

```
App (owns transactions[])
 ├── Summary          ← receives transactions[], derives totals
 ├── TransactionForm  ← receives onAdd(); manages its own field state
 └── TransactionList  ← receives transactions[]; manages its own filter state
```

### Component responsibilities

| Component | Owns state | Derives from props |
|---|---|---|
| `App` | `transactions[]` | — |
| `Summary` | nothing | `totalIncome`, `totalExpenses`, `balance` |
| `TransactionForm` | `description`, `amount`, `type`, `category` | — |
| `TransactionList` | `filterType`, `filterCategory` | filtered transaction list |

### Key design decisions

- **No shared category module** — `categories` is defined locally in both `TransactionForm` and `TransactionList`. This keeps each component self-contained without introducing a shared module for a small constant.
- **No derived state** — `Summary` and `TransactionList` compute their values directly from the `transactions` prop on each render rather than caching them in state. The dataset is small enough that this is cheaper than synchronizing derived state.
- **Form resets on submit** — `TransactionForm` resets all fields back to defaults after a successful `onAdd()` call, keeping the UX ready for the next entry.

### Styling

Global design tokens (colors, shadows, radii) are defined as CSS custom properties in `index.css`. Component styles live in `App.css` and are imported by `App.jsx`. There is no CSS-in-JS or utility class framework — plain CSS with a BEM-influenced naming convention.

---

## Project Structure

```
src/
├── main.jsx            # React entry point
├── App.jsx             # Root component, owns transaction state
├── App.css             # All component styles + design tokens
├── index.css           # Global reset + CSS variables + font
├── Summary.jsx         # Income / expenses / balance cards
├── TransactionForm.jsx # Add-transaction form
└── TransactionList.jsx # Filterable transaction table
```

---

## License

MIT
