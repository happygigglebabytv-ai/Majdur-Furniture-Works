import React, { useState } from 'react';
import { BusinessSettings } from '../../types';
import { api } from '../../api';
import { Save, Check, Phone, MessageCircle, MapPin, Clock, Mail, Shield, Instagram, Facebook, Youtube, KeyRound, User, Lock, AlertCircle } from 'lucide-react';

interface AdminSettingsProps {
  business: BusinessSettings;
  token: string;
  onRefresh: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ business, token, onRefresh }) => {
  const [form, setForm] = useState<BusinessSettings>({ ...business });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Security Credentials state
  const [secUsername, setSecUsername] = useState('');
  const [secPassword, setSecPassword] = useState('');
  const [secCurrentPassword, setSecCurrentPassword] = useState('');
  const [secSaving, setSecSaving] = useState(false);
  const [secSuccess, setSecSuccess] = useState('');
  const [secError, setSecError] = useState('');

  const handleUpdateSecurityCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecSuccess('');
    setSecError('');

    if (!secCurrentPassword) {
      setSecError('Credentials update karne ke liye apna current password darj karna zaroori hai.');
      return;
    }

    if (!secUsername && !secPassword) {
      setSecError('Kripya naya username ya naya password me se koi ek ya dono darj karein.');
      return;
    }

    if (secPassword && secPassword.length < 6) {
      setSecError('Naya password kam se kam 6 characters ka hona chahiye.');
      return;
    }

    if (secUsername && secUsername.trim().length < 3) {
      setSecError('Naya username kam se kam 3 characters ka hona chahiye.');
      return;
    }

    setSecSaving(true);
    try {
      const res = await api.updateCredentials(
        {
          currentPassword: secCurrentPassword,
          newUsername: secUsername.trim() || undefined,
          newPassword: secPassword.trim() || undefined,
        },
        token
      );
      setSecSuccess(`Admin credentials safalta-purvak update ho gaye hain! (Username: ${res.username})`);
      setSecUsername('');
      setSecPassword('');
      setSecCurrentPassword('');
    } catch (err: any) {
      setSecError(err.message || 'Credentials update karne mein samasya aayi.');
    } finally {
      setSecSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      await api.updateSettings(form, token);
      setSuccess('Business settings safalta-purvak update ho gayi hain!');
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Settings update karne mein truti.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dfd3c4]">
        <div>
          <h3 className="font-serif-craft text-xl font-bold text-[#14281e]">
            Business Settings & Contact Details
          </h3>
          <p className="text-xs text-[#706456]">
            Workshop ka naam, phone number, WhatsApp numbers, address, aur texts yahan se customize karein.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          id="admin-save-settings-top-btn"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4 text-[#88ba9e]" />
          <span>{saving ? 'Saving...' : 'Settings Save Karein'}</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-medium">
          {success}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* 1. Basic Business Identity */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfd3c4] space-y-4">
        <h4 className="font-serif-craft text-base font-bold text-[#14281e] pb-2 border-b border-[#f0e8dc]">
          1. Business Identity & Owners
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Business Name</label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Owners / Proprietors</label>
            <input
              type="text"
              value={form.owners.join(', ')}
              onChange={(e) =>
                setForm({
                  ...form,
                  owners: e.target.value.split(',').map((s) => s.trim()),
                })
              }
              placeholder="Munawar Hussain, Salahuddin Sahab"
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Experience</label>
            <input
              type="text"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              placeholder="20+ Years"
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Business Type</label>
            <input
              type="text"
              value={form.businessType}
              onChange={(e) => setForm({ ...form, businessType: e.target.value })}
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="pt-2 space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Hero Main Slogan</label>
            <input
              type="text"
              value={form.slogan}
              onChange={(e) => setForm({ ...form, slogan: e.target.value })}
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Hero Subtext</label>
            <textarea
              rows={2}
              value={form.sloganSubtext}
              onChange={(e) => setForm({ ...form, sloganSubtext: e.target.value })}
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>
        </div>
      </div>

      {/* 2. Phone & WhatsApp Contacts */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfd3c4] space-y-4">
        <h4 className="font-serif-craft text-base font-bold text-[#14281e] pb-2 border-b border-[#f0e8dc]">
          2. Phone & WhatsApp Contacts (Priority Wise)
        </h4>

        {/* WhatsApp Numbers */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-[#422514]">
            WhatsApp Numbers (Priority 1 & 2 prominent)
          </label>
          {form.whatsAppNumbers.map((wa, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={wa.number}
                onChange={(e) => {
                  const updated = [...form.whatsAppNumbers];
                  updated[idx].number = e.target.value;
                  setForm({ ...form, whatsAppNumbers: updated });
                }}
                placeholder="Phone Number"
                className="px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
              />
              <input
                type="text"
                value={wa.label}
                onChange={(e) => {
                  const updated = [...form.whatsAppNumbers];
                  updated[idx].label = e.target.value;
                  setForm({ ...form, whatsAppNumbers: updated });
                }}
                placeholder="Label (e.g. Munawar Hussain)"
                className="px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
              />
              <div className="flex items-center text-xs text-[#706456]">
                Priority {wa.priority}
              </div>
            </div>
          ))}
        </div>

        {/* Regular Phone numbers */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-[#422514] mb-1">
            Calling Phone Numbers (Comma separated)
          </label>
          <input
            type="text"
            value={form.phoneNumbers.join(', ')}
            onChange={(e) =>
              setForm({
                ...form,
                phoneNumbers: e.target.value.split(',').map((s) => s.trim()),
              })
            }
            className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
          />
        </div>

        {/* Alternative numbers */}
        <div>
          <label className="block text-xs font-bold text-[#422514] mb-1">
            Alternative Numbers (Comma separated)
          </label>
          <input
            type="text"
            value={(form.alternativeNumbers || []).join(', ')}
            onChange={(e) =>
              setForm({
                ...form,
                alternativeNumbers: e.target.value.split(',').map((s) => s.trim()),
              })
            }
            className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
          />
        </div>
      </div>

      {/* 3. Address & Maps */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfd3c4] space-y-4">
        <h4 className="font-serif-craft text-base font-bold text-[#14281e] pb-2 border-b border-[#f0e8dc]">
          3. Address, Google Maps & Timings
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Street / Area</label>
            <input
              type="text"
              value={form.address.street}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, street: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Landmark</label>
            <input
              type="text"
              value={form.address.landmark}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, landmark: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">City</label>
            <input
              type="text"
              value={form.address.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, city: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Pincode</label>
            <input
              type="text"
              value={form.address.pincode}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, pincode: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#422514] mb-1">Google Maps Link</label>
          <input
            type="text"
            value={form.googleMapsUrl}
            onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
            className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Opening Days</label>
            <input
              type="text"
              value={form.openingHours.days}
              onChange={(e) =>
                setForm({
                  ...form,
                  openingHours: { ...form.openingHours, days: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">Opening Hours</label>
            <input
              type="text"
              value={form.openingHours.hours}
              onChange={(e) =>
                setForm({
                  ...form,
                  openingHours: { ...form.openingHours, hours: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>
        </div>
      </div>

      {/* 4. Optional Email & Social Media */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfd3c4] space-y-4">
        <h4 className="font-serif-craft text-base font-bold text-[#14281e] pb-2 border-b border-[#f0e8dc]">
          4. Email & Social Media (Jab accounts ban jayein tab add karein)
        </h4>

        <div>
          <label className="block text-xs font-bold text-[#422514] mb-1">
            Email Address (Khaali chhodne par public website par display nahi hoga)
          </label>
          <input
            type="email"
            value={form.email || ''}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="e.g. majdurfurniture@example.com (Optional)"
            className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram URL</span>
            </label>
            <input
              type="text"
              value={form.socialMedia?.instagram || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialMedia: { ...form.socialMedia, instagram: e.target.value },
                })
              }
              placeholder="https://instagram.com/..."
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1 flex items-center gap-1.5">
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook URL</span>
            </label>
            <input
              type="text"
              value={form.socialMedia?.facebook || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialMedia: { ...form.socialMedia, facebook: e.target.value },
                })
              }
              placeholder="https://facebook.com/..."
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1 flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube URL</span>
            </label>
            <input
              type="text"
              value={form.socialMedia?.youtube || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialMedia: { ...form.socialMedia, youtube: e.target.value },
                })
              }
              placeholder="https://youtube.com/..."
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>
        </div>
      </div>

      {/* 5. Optional Warranty & Service */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfd3c4] space-y-4">
        <h4 className="font-serif-craft text-base font-bold text-[#14281e] pb-2 border-b border-[#f0e8dc]">
          5. Warranty & Service Information (Optional)
        </h4>

        <div>
          <label className="block text-xs font-bold text-[#422514] mb-1">
            Warranty Policy (Agar add karenge to public page par dikhegi)
          </label>
          <input
            type="text"
            value={form.warrantyInfo || ''}
            onChange={(e) => setForm({ ...form, warrantyInfo: e.target.value })}
            placeholder="e.g. 5 saal structural warranty solid wood beds par"
            className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#422514] mb-1">
            Service Policy (Optional)
          </label>
          <input
            type="text"
            value={form.serviceInfo || ''}
            onChange={(e) => setForm({ ...form, serviceInfo: e.target.value })}
            placeholder="e.g. Motihari shahar ke andar delivery aur assembly suvidha"
            className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
          />
        </div>
      </div>

      {/* 6. Admin Security & Login Credentials Settings */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#dfd3c4] space-y-4 shadow-2xs">
        <div className="flex items-center gap-3 pb-3 border-b border-[#f0e8dc]">
          <div className="w-9 h-9 rounded-xl bg-[#1c3b2d] text-white flex items-center justify-center">
            <KeyRound className="w-4 h-4 text-[#88ba9e]" />
          </div>
          <div>
            <h4 className="font-serif-craft text-base font-bold text-[#14281e]">
              6. Security & Credentials Settings (Admin Username & Password)
            </h4>
            <p className="text-xs text-[#706456]">
              Yahan se aap apna Admin Username aur Admin Password badal sakte hain.
            </p>
          </div>
        </div>

        {secSuccess && (
          <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl flex items-start gap-2">
            <Check className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{secSuccess}</span>
          </div>
        )}

        {secError && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{secError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">
              Naya Admin Username (Optional)
            </label>
            <input
              type="text"
              value={secUsername}
              onChange={(e) => setSecUsername(e.target.value)}
              placeholder="Naya username darj karein"
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422514] mb-1">
              Naya Admin Password (Optional)
            </label>
            <input
              type="password"
              value={secPassword}
              onChange={(e) => setSecPassword(e.target.value)}
              placeholder="Kam se kam 6 characters"
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#422514] mb-1">
              Suraksha Hetu Current Password (Zaroori)
            </label>
            <input
              type="password"
              value={secCurrentPassword}
              onChange={(e) => setSecCurrentPassword(e.target.value)}
              placeholder="Apna abhi ka password darj karein"
              className="w-full px-3 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-start">
          <button
            type="button"
            onClick={handleUpdateSecurityCredentials}
            disabled={secSaving}
            id="admin-update-security-credentials-btn"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25503d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-60"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#88ba9e]" />
            <span>{secSaving ? 'Updating...' : 'Admin Credentials Update Karein'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          id="admin-save-settings-bottom-btn"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-sm font-semibold shadow-xs transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4 text-[#88ba9e]" />
          <span>{saving ? 'Saving...' : 'Tamam Settings Save Karein'}</span>
        </button>
      </div>

    </form>
  );
};
