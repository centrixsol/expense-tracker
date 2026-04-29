import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const formatDate = (dateStr) =>
  new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

const fmt = (n) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function TransactionList({ transactions }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  let filtered = transactions;
  if (filterType !== 'all')     filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== 'all') filtered = filtered.filter(t => t.category === filterCategory);

  return (
    <div className="card">
      <div className="transactions-header">
        <p className="card-title">Transactions</p>
        <span className="transaction-count">
          {filtered.length} {filtered.length === 1 ? 'transaction' : 'transactions'}
        </span>
      </div>

      <div className="filters">
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{capitalize(cat)}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No transactions match your filters.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="col-amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="date-cell">{formatDate(t.date)}</td>
                <td className="desc-cell">{t.description}</td>
                <td>
                  <span className={`badge badge-${t.category}`}>{t.category}</span>
                </td>
                <td className={`amount-cell ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                  {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList
