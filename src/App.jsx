import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Check, X } from 'lucide-react';

export default function App() {
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const rules = [
    { test: (p) => p.length >= 8, label: 'At least 8 characters' },
    { test: (p) => /[A-Z]/.test(p), label: 'One uppercase letter' },
    { test: (p) => /[a-z]/.test(p), label: 'One lowercase letter' },
    { test: (p) => /[0-9]/.test(p), label: 'One number' },
    { test: (p) => /[^A-Za-z0-9]/.test(p), label: 'One special character' },
  ];

  const passedRules = rules.filter(rule => rule.test(password)).length;

  let strength = '';
  let strengthColor = '';
  let strengthBg = '';
  
  if (passedRules <= 2) {
    strength = 'Weak';
    strengthColor = 'text-red-500';
    strengthBg = 'bg-red-500';
  } else if (passedRules <= 4) {
    strength = 'Moderate';
    strengthColor = 'text-yellow-500';
    strengthBg = 'bg-yellow-500';
  } else {
    strength = 'Strong';
    strengthColor = 'text-green-500';
    strengthBg = 'bg-green-500';
  }

  const strengthPercentage = (passedRules / rules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Password Strength</h1>
            <p className="text-slate-300 text-sm">Create a secure password for your account</p>
          </div>

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouched(true);
              }}
              className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              type="button"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Strength Indicator */}
          {touched && password && (
            <div className="space-y-6">
              {/* Strength Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Password Strength</span>
                  <span className={`text-sm font-semibold ${strengthColor}`}>{strength}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${strengthBg} transition-all duration-500 ease-out rounded-full`}
                    style={{ width: `${strengthPercentage}%` }}
                  />
                </div>
              </div>

              {/* Requirements List */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate-300">Requirements:</h3>
                <div className="space-y-2">
                  {rules.map((rule, index) => {
                    const passed = rule.test(password);
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                          passed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white/10 border border-white/20'
                        }`}>
                          {passed ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3 text-slate-400" />
                          )}
                        </div>
                        <span className={`text-sm transition-colors duration-200 ${
                          passed ? 'text-green-400' : 'text-slate-400'
                        }`}>
                          {rule.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Tips */}
              {strength === 'Strong' && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium text-sm">Excellent! Your password is strong and secure.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          {!touched && (
            <div className="text-center text-slate-400 text-xs mt-6">
              Start typing to see your password strength
            </div>
          )}
        </div>
      </div>
    </div>
  );
}