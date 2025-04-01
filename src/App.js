import React, { useState } from 'react';

const denominations = [
  { label: '$100s', key: '100s', value: 100 },
  { label: '$50s', key: '50s', value: 50 },
  { label: '$20s', key: '20s', value: 20 },
  { label: '$10s', key: '10s', value: 10 },
  { label: '$5s', key: '5s', value: 5 },
  { label: '$1s', key: '1s', value: 1 },
  { label: 'Quarter Rolls', key: 'qRolls', value: 10 },
  { label: 'Dime Rolls', key: 'dRolls', value: 5 },
  { label: 'Nickel Rolls', key: 'nRolls', value: 2 },
  { label: 'Penny Rolls', key: 'pRolls', value: 0.5 },
];

function App() {
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(denominations.map(d => [d.key, 0]))
  );
  const [totals, setTotals] = useState({});
  const [safeTotal, setSafeTotal] = useState(null);
  const [discrepancy, setDiscrepancy] = useState(null);

  const handleChange = (key, val) => {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setCounts(prev => ({ ...prev, [key]: num }));
    }
  };

  const calculate = () => {
    const newTotals = {};
    let total = 0;

    denominations.forEach(({ key, value }) => {
      const subTotal = (counts[key] || 0) * value;
      newTotals[key] = subTotal;
      total += subTotal;
    });

    setTotals(newTotals);
    setSafeTotal(total);
    setDiscrepancy(total - 600);
  };

  const clear = () => {
    setCounts(Object.fromEntries(denominations.map(d => [d.key, 0])));
    setTotals({});
    setSafeTotal(null);
    setDiscrepancy(null);
  };

  const formatCurrency = num =>
    typeof num === 'number' ? `$${num.toFixed(2)}` : '';

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1>🧮 Safe Counter</h1>

      {denominations.map(({ label, key }) => (
        <div key={key} style={{ marginBottom: '0.5rem' }}>
          <label>
            {label}:
            <input
              type="number"
              min="0"
              value={counts[key]}
              onChange={e => handleChange(key, e.target.value)}
              style={{ marginLeft: '1rem', width: '80px' }}
            />
            <span style={{ marginLeft: '1rem' }}>{formatCurrency(totals[key])}</span>
          </label>
        </div>
      ))}

      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={calculate} style={{ marginRight: '1rem' }}>Calculate</button>
        <button onClick={clear}>Clear</button>
      </div>

      {safeTotal !== null && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Safe Total: {formatCurrency(safeTotal)}</h2>
          <h3
            style={{
              color:
                discrepancy === 0
                  ? 'green'
                  : 'red'
            }}
          >
            Discrepancy: {discrepancy > 0 ? '+' : ''}{formatCurrency(discrepancy)}
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
