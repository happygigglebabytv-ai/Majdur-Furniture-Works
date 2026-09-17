import React, { useState } from 'react';
import { api } from '../api';
import { Lock, KeyRound, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToWebsite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.login(username, password);
      if (res.token) {
        onLoginSuccess(res.token);
      }
    } catch (err: any) {
      setError(err.message || 'Galat username ya password. Kripya punah prayas karein.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4efe7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Top back button */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5c341b] hover:text-[#1c3b2d] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Website Par Wapas Jayein</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#1c3b2d] text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7 text-[#88ba9e]" />
          </div>
          <h2 className="font-serif-craft text-2xl sm:text-3xl font-bold text-[#14281e]">
            Owner / Admin Portal
          </h2>
          <p className="text-xs sm:text-sm text-[#706456]">
            Majdur Furniture Works • Content & Product Management
          </p>
        </div>

        <div className="mt-6 bg-white py-8 px-6 shadow-sm border border-[#dfd3c4] sm:rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#422514] mb-1.5">
                ADMIN USERNAME
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username daalein"
                className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#422514] mb-1.5">
                ADMIN PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  id="admin-password-input"
                  className="w-full pl-3.5 pr-11 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
                />
                <button
                  type="button"
                  id="admin-password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#706456] hover:text-[#14281e] focus:outline-none transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Password Chhupayein (Hide)' : 'Password Dekhein (Show)'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-[#5c341b]" />
                  ) : (
                    <Eye className="w-4 h-4 text-[#706456]" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                id="admin-login-submit-btn"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white font-semibold text-sm shadow-xs transition-colors disabled:opacity-60"
              >
                <KeyRound className="w-4 h-4 text-[#88ba9e]" />
                <span>{loading ? 'Logging in...' : 'Admin Panel Kholein'}</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};

