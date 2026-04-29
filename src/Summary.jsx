const fmt = (n) =>
  '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const balancePositive = balance >= 0;

  return (
    <div className="summary">
      <div className="summary-card card-income">
        <p className="card-label">Total Income</p>
        <p className="card-value income-amount">{fmt(totalIncome)}</p>
      </div>
      <div className="summary-card card-expenses">
        <p className="card-label">Total Expenses</p>
        <p className="card-value expense-amount">{fmt(totalExpenses)}</p>
      </div>
      <div className={`summary-card ${balancePositive ? 'card-balance' : 'card-balance-neg'}`}>
        <p className="card-label">Net Balance</p>
        <p className={`card-value ${balancePositive ? 'balance-pos' : 'balance-neg'}`}>
          {balancePositive ? '' : '−'}{fmt(balance)}
        </p>
      </div>
    </div>
  );
}

export default Summary
