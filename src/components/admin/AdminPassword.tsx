import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { KeyRound, Shield, Check, AlertCircle, User, Lock } from 'lucide-react';

interface AdminPasswordProps {
  token: string;
}

export const AdminPassword: React.FC<AdminPasswordProps> = ({ token }) => {
  // Username update state
  const [currentUsername, setCurrentUsername] = useState('Admin');
  const [newUsername, setNewUsername] = useState('');
  const [userConfirmPass, setUserConfirmPass] = useState('');
  const [userStatus, setUserStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [userMessage, setUserMessage] = useState('');

  // Password update state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passStatus, setPassStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [passMessage, setPassMessage] = useState('');

  useEffect(() => {
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setCurrentUsername(data.username);
        }
      })
      .catch(() => {});
  }, [token]);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserStatus('idle');
    setUserMessage('');

    const cleanUser = newUsername.trim();
    if (!cleanUser || cleanUser.length < 3) {
      setUserStatus('error');
      setUserMessage('Naya username kam se kam 3 characters ka hona chahiye.');
      return;
    }

    setUserStatus('saving');
    try {
      const res = await api.updateCredentials(
        {
          currentPassword: userConfirmPass,
          newUsername: cleanUser,
        },
        token
      );
      setUserStatus('success');
      setUserMessage(`Admin username safalta-purvak badal kar "${res.username}" kar diya gaya hai!`);
      setCurrentUsername(res.username);
      setNewUsername('');
      setUserConfirmPass('');
    } catch (err: any) {
      setUserStatus('error');
      setUserMessage(err.message || 'Username badalne mein samasya aayi. Kripya apna sahi password darj karein.');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassStatus('idle');
    setPassMessage('');

    if (newPassword !== confirmPassword) {
      setPassStatus('error');
      setPassMessage('Naya password aur confirm password aapas mein match nahi kar rahe hain.');
      return;
    }

    if (newPassword.length < 6) {
      setPassStatus('error');
      setPassMessage('Naya password kam se kam 6 characters ka hona chahiye.');
      return;
    }

    setPassStatus('saving');
    try {
      await api.updateCredentials(
        {
          currentPassword,
          newPassword,
        },
        token
      );
      setPassStatus('success');
      setPassMessage('Aapka Admin Password safalta-purvak badal diya gaya hai! Agli baar naye password se login karein.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPassStatus('error');
      setPassMessage(err.message || 'Password badalne mein samasya aayi. Kripya apna sahi current password darj karein.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      
      {/* 1. Change Admin Username */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#dfd3c4] shadow-2xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#dfd3c4]">
          <div className="w-10 h-10 rounded-xl bg-[#25503d] text-white flex items-center justify-center">
            <User className="w-5 h-5 text-[#88ba9e]" />
          </div>
          <div>
            <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">
              1. Admin Username Badlein
            </h3>
            <p className="text-xs text-[#706456]">
              Current Username: <span className="font-mono font-bold text-[#1c3b2d] bg-[#ede5d8] px-2 py-0.5 rounded">{currentUsername}</span>
            </p>
          </div>
        </div>

        {userStatus === 'success' && (
          <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl flex items-start gap-2">
            <Check className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{userMessage}</span>
          </div>
        )}

        {userStatus === 'error' && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{userMessage}</span>
          </div>
        )}

        <form onSubmit={handleUpdateUsername} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">
              Naya Admin Username
            </label>
            <input
              type="text"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="e.g. MajdurAdmin"
              className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">
              Suraksha Hetu Current Password Darj Karein
            </label>
            <input
              type="password"
              required
              value={userConfirmPass}
              onChange={(e) => setUserConfirmPass(e.target.value)}
              placeholder="Current password"
              className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={userStatus === 'saving'}
              id="admin-update-username-btn"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-[#25503d] hover:bg-[#14281e] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-60"
            >
              <User className="w-4 h-4 text-[#88ba9e]" />
              <span>{userStatus === 'saving' ? 'Username Update Ho Raha Hai...' : 'Username Save Karein'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Change Admin Password */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#dfd3c4] shadow-2xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#dfd3c4]">
          <div className="w-10 h-10 rounded-xl bg-[#1c3b2d] text-white flex items-center justify-center">
            <KeyRound className="w-5 h-5 text-[#88ba9e]" />
          </div>
          <div>
            <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">
              2. Admin Password Badlein
            </h3>
            <p className="text-xs text-[#706456]">
              Portal ko surakshit rakhne ke liye naya password set karein.
            </p>
          </div>
        </div>

        {passStatus === 'success' && (
          <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl flex items-start gap-2">
            <Check className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{passMessage}</span>
          </div>
        )}

        {passStatus === 'error' && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{passMessage}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">
              Purana Password (Current Password)
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
              className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">
              Naya Password (New Password)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Kam se kam 6 characters"
              className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">
              Naya Password Confirm Karein
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Naya password punah darj karein"
              className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={passStatus === 'saving'}
              id="admin-update-password-btn"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-60"
            >
              <Shield className="w-4 h-4 text-[#88ba9e]" />
              <span>{passStatus === 'saving' ? 'Password Update Ho Raha Hai...' : 'Password Update Karein'}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

