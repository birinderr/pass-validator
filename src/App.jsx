import React, { useState } from 'react';

export default function App() {
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const rules = [
    (p) => p.length >= 8,
    (p) => /[A-Z]/.test(p),
    (p) => /[a-z]/.test(p),
    (p) => /[0-9]/.test(p),
    (p) => /[^A-Za-z0-9]/.test(p),
  ];

  const passedRules = rules.filter(test => test(password)).length;

  let strength = '';
  if (passedRules <= 2) strength = 'Weak';
  else if (passedRules <= 4) strength = 'Moderate';
  else strength = 'Strong';

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
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setTouched(true);
        }}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 16,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #aaa'
        }}
      />
      {touched && password && (
        <div style={{ marginTop: 12 }}>
          <strong>Password Strength: </strong>
          <span style={{ color: getStrengthColor(), fontWeight: 'bold' }}>{strength}</span>
        </div>
      )}
    </div>
  );
}
