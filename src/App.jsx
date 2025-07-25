import React, { useState } from 'react';

export default function App() {
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const rules = [
    {
      label: 'At least 8 characters',
      test: (p) => p.length >= 8,
    },
    {
      label: 'At least one uppercase letter',
      test: (p) => /[A-Z]/.test(p),
    },
    {
      label: 'At least one lowercase letter',
      test: (p) => /[a-z]/.test(p),
    },
    {
      label: 'At least one digit',
      test: (p) => /[0-9]/.test(p),
    },
    {
      label: 'At least one special character',
      test: (p) => /[^A-Za-z0-9]/.test(p),
    },
  ];

  const passedRules = rules.filter(rule => rule.test(password)).length;

  let strength = '';
  if (passedRules <= 2) strength = 'Weak';
  else if (passedRules === 3 || passedRules === 4) strength = 'Moderate';
  else if (passedRules === 5) strength = 'Strong';

  const getStrengthColor = () => {
    if (strength === 'Weak') return 'red';
    if (strength === 'Moderate') return 'orange';
    if (strength === 'Strong') return 'green';
    return 'gray';
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '100px auto',
      padding: 24,
      border: '1px solid #ccc',
      borderRadius: 8,
      fontFamily: 'sans-serif'
    }}>
      <h2>Password Validator</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched(true)}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 16,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #aaa'
        }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rules.map((rule, i) => (
          <li key={i} style={{ color: rule.test(password) ? 'green' : 'red', marginBottom: 4 }}>
            {rule.test(password) ? '✓' : '✗'} {rule.label}
          </li>
        ))}
      </ul>
      {touched && (
        <div style={{ marginTop: 12 }}>
          <strong>Password Strength: </strong>
          <span style={{ color: getStrengthColor() }}>{strength}</span>
        </div>
      )}
    </div>
  );
}
