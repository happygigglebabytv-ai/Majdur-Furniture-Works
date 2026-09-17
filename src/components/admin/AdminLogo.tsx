import React, { useState, useRef } from 'react';
import { BusinessSettings, LogoSettings } from '../../types';
import { api } from '../../api';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Check,
  AlertCircle,
  Eye,
  RefreshCw,
  Sparkles,
  Info,
  Layers,
  Monitor,
  Smartphone,
  Save,
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

interface AdminLogoProps {
  business: BusinessSettings;
  token: string;
  onRefresh: () => void;
}

export const AdminLogo: React.FC<AdminLogoProps> = ({ business, token, onRefresh }) => {
  const currentLogo = business.logo || {
    imageUrl: '',
    altText: business.businessName,
    displayName: business.businessName,
    showInHeader: true,
    showInFooter: true,
    showInMobile: true,
  };

  const [settings, setSettings] = useState<LogoSettings>({ ...currentLogo });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [previewTab, setPreviewTab] = useState<'header' | 'footer' | 'mobile' | 'raw'>('header');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setSuccessMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Invalid file format. Kripya PNG, JPG, JPEG ya WebP file chunein.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File ka size bohot bada hai. Kripya 5MB se kam size ki image upload karein.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
  };

  const handleUploadAndSave = async () => {
    if (!selectedFile) return;
    setErrorMsg('');
    setSuccessMsg('');
    setUploading(true);

    try {
      const res = await api.uploadLogo(selectedFile, token);
      setSuccessMsg('Logo safaltapoorvak upload aur save ho gaya!');
      setSelectedFile(null);
      setFilePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSettings(res.logo);
      onRefresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Logo upload karne mein samasya aayi. Kripya punah prayas karein.');
    } finally {
      setUploading(false);
    }
  };

  const handleCancelSelection = () => {
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteLogo = async () => {
    const confirmDelete = window.confirm(
      'Kya aap sach mein website logo hatana chahte hain? Hatane ke baad website par default fallback brand emblem ("M" monogram) activate ho jayega.'
    );
    if (!confirmDelete) return;

    setErrorMsg('');
    setSuccessMsg('');
    setDeleting(true);

    try {
      const res = await api.deleteLogo(token);
      setSuccessMsg('Logo hata diya gaya hai. Default fallback branding active hai.');
      setSettings(res.logo);
      setSelectedFile(null);
      setFilePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onRefresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Logo hatane mein samasya aayi.');
    } finally {
      setDeleting(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSavingSettings(true);

    try {
      const res = await api.updateLogo(settings, token);
      setSuccessMsg('Logo settings safaltapoorvak update ho gayi!');
      setSettings(res.logo);
      onRefresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Settings update karne mein truti.');
    } finally {
      setSavingSettings(false);
    }
  };

  // Construct simulated business for preview
  const previewLogoUrl = filePreview || settings.imageUrl || '';
  const simulatedBusiness: BusinessSettings = {
    ...business,
    logo: {
      ...settings,
      imageUrl: previewLogoUrl,
    },
  };

  const hasActiveCustomLogo = Boolean(settings.imageUrl);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#dfd3c4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1c3b2d] text-white flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-[#88ba9e]" />
            </div>
            <h2 className="font-serif-craft text-xl font-bold text-[#14281e]">
              Website Logo Management
            </h2>
            {hasActiveCustomLogo ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Check className="w-3 h-3" /> Custom Logo Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Default Branding Active
              </span>
            )}
          </div>
          <p className="text-xs text-[#706456]">
            Upload, replace, ya remove karein. Logo website ke Header, Footer aur Mobile menu par live reflect hota hai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
            id="admin-logo-file-input"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Upload className="w-4 h-4 text-[#88ba9e]" />
            <span>{hasActiveCustomLogo ? 'Change / Replace Logo' : 'Upload New Logo'}</span>
          </button>

          {hasActiveCustomLogo && (
            <button
              type="button"
              onClick={handleDeleteLogo}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors disabled:opacity-60"
            >
              <Trash2 className="w-4 h-4" />
              <span>{deleting ? 'Removing...' : 'Delete Logo'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Staged Upload Card (When a new file is chosen) */}
      {selectedFile && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-xs animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {filePreview && (
                <div className="w-16 h-16 rounded-xl bg-white border border-amber-200 flex items-center justify-center p-1.5 shadow-2xs">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              <div>
                <h4 className="text-xs font-bold text-[#422514] uppercase tracking-wider">
                  Naya Logo Selected (Ready to Save)
                </h4>
                <p className="text-sm font-semibold text-[#14281e]">{selectedFile.name}</p>
                <p className="text-[11px] text-[#706456]">
                  Size: {(selectedFile.size / 1024).toFixed(1)} KB • Type: {selectedFile.type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancelSelection}
                disabled={uploading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 border border-[#dfd3c4] text-xs font-medium text-[#5c341b] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUploadAndSave}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#88ba9e]" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#88ba9e]" />
                    <span>Upload & Activate Logo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Preview & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Live Website Simulator Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-[#dfd3c4] overflow-hidden shadow-xs">
            <div className="px-5 py-4 border-b border-[#e6ded3] bg-[#fbf9f5] flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-serif-craft text-base font-bold text-[#14281e] flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#5c341b]" />
                  <span>Live Website Preview</span>
                </h3>
                <p className="text-[11px] text-[#706456]">
                  Dekhein ki aapka logo alag-alag website sections par kaisa dikhta hai.
                </p>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center bg-[#ede5d8] p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewTab('header')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    previewTab === 'header'
                      ? 'bg-white text-[#14281e] shadow-2xs font-semibold'
                      : 'text-[#5c341b] hover:text-[#14281e]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Monitor className="w-3 h-3" /> Header
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('footer')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    previewTab === 'footer'
                      ? 'bg-white text-[#14281e] shadow-2xs font-semibold'
                      : 'text-[#5c341b] hover:text-[#14281e]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Footer
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('mobile')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    previewTab === 'mobile'
                      ? 'bg-white text-[#14281e] shadow-2xs font-semibold'
                      : 'text-[#5c341b] hover:text-[#14281e]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3" /> Mobile
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('raw')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    previewTab === 'raw'
                      ? 'bg-white text-[#14281e] shadow-2xs font-semibold'
                      : 'text-[#5c341b] hover:text-[#14281e]'
                  }`}
                >
                  Raw Asset
                </button>
              </div>
            </div>

            {/* Preview Stage */}
            <div className="p-6">
              {previewTab === 'header' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#706456]">
                    Desktop Header Preview (Light Theme)
                  </span>
                  <div className="bg-[#fbf9f5] border border-[#e6ded3] rounded-xl p-4 flex items-center justify-between shadow-2xs">
                    <BrandLogo business={simulatedBusiness} variant="header" />
                    <div className="hidden sm:flex items-center gap-2 text-xs text-[#5c341b] font-medium">
                      <span className="px-2.5 py-1 rounded-md bg-[#ede5d8]/70">Catalogue</span>
                      <span className="px-2.5 py-1 rounded-md bg-[#ede5d8]/70">Custom Orders</span>
                      <span className="px-2.5 py-1 rounded-md bg-[#1c3b2d] text-white">Contact</span>
                    </div>
                  </div>
                </div>
              )}

              {previewTab === 'footer' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#706456]">
                    Footer Dark Theme Preview
                  </span>
                  <div className="bg-[#14281e] border border-[#25503d] rounded-xl p-5 shadow-2xs">
                    <BrandLogo business={simulatedBusiness} variant="footer" />
                    <p className="text-xs text-[#b8ab9a] mt-3 max-w-md">
                      Munawar Hussain aur Salahuddin Sahab ke netritva mein 20+ saal ka anubhav.
                    </p>
                  </div>
                </div>
              )}

              {previewTab === 'mobile' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#706456]">
                    Mobile Navigation Preview
                  </span>
                  <div className="max-w-xs mx-auto bg-[#fbf9f5] border border-[#e6ded3] rounded-xl p-3 flex items-center justify-between shadow-xs">
                    <BrandLogo business={simulatedBusiness} variant="mobile" />
                    <div className="w-8 h-8 rounded-lg bg-[#1c3b2d] text-white flex items-center justify-center text-xs">
                      ☰
                    </div>
                  </div>
                </div>
              )}

              {previewTab === 'raw' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#706456]">
                    Raw Logo Asset (Checkerboard for transparency)
                  </span>
                  <div
                    className="w-full h-44 rounded-xl border border-[#dfd3c4] flex items-center justify-center p-4"
                    style={{
                      backgroundImage: `radial-gradient(#d1c7b8 0.75px, transparent 0.75px), radial-gradient(#d1c7b8 0.75px, #fbf9f5 0.75px)`,
                      backgroundSize: '16px 16px',
                      backgroundPosition: '0 0, 8px 8px',
                    }}
                  >
                    {previewLogoUrl ? (
                      <img
                        src={previewLogoUrl}
                        alt={settings.altText || 'Logo Asset'}
                        className="max-h-36 max-w-[280px] object-contain drop-shadow-xs"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1c3b2d] to-[#422514] flex items-center justify-center text-white mx-auto mb-2">
                          <span className="font-serif-craft text-2xl font-bold text-[#e6d0b5]">M</span>
                        </div>
                        <p className="text-xs text-[#706456]">No custom image uploaded. Default "M" monogram active.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status Note */}
              <div className="mt-4 pt-4 border-t border-[#f0e9df] flex items-center justify-between text-xs text-[#706456]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#5c341b]" />
                  <span>
                    {hasActiveCustomLogo
                      ? 'Custom logo currently rendered live on the website.'
                      : 'Default typography and monogram fallback currently active.'}
                  </span>
                </div>
                {settings.updatedAt && (
                  <span className="text-[11px] text-[#8e8071]">
                    Updated: {new Date(settings.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tips Box */}
          <div className="bg-[#fbf9f5] border border-[#dfd3c4] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#1c3b2d]/10 text-[#1c3b2d] shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="space-y-1 text-xs text-[#5c341b]">
                <h4 className="font-bold text-[#14281e]">Logo Recommendations & Best Practices</h4>
                <ul className="list-disc list-inside space-y-1 text-[#706456] pt-1">
                  <li>
                    <strong className="text-[#14281e]">Transparent PNG or WebP:</strong> Transparent backgrounds blend naturally into both the light header and dark footer.
                  </li>
                  <li>
                    <strong className="text-[#14281e]">Aspect Ratio:</strong> Landscape or square logos (e.g., 3:1 or 1:1) look best on top navigation bars.
                  </li>
                  <li>
                    <strong className="text-[#14281e]">Automatic Fallback:</strong> Agar aap logo delete kar dete hain ya image load nahi hoti, to website kabhi break nahi hogi aur automatically default Majdur Furniture Works branding dikhayegi.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Logo Display Settings & Visibility Toggles (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#dfd3c4] p-6 shadow-xs">
            <h3 className="font-serif-craft text-base font-bold text-[#14281e] mb-1">
              Logo Display Settings
            </h3>
            <p className="text-xs text-[#706456] mb-5">
              Brand name, SEO alt text, aur section visibility controls configure karein.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#422514] mb-1.5">
                  Brand Display Name
                </label>
                <input
                  type="text"
                  value={settings.displayName || ''}
                  onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
                  placeholder="Majdur Furniture Works"
                  className="w-full px-3.5 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
                />
                <p className="text-[11px] text-[#706456] mt-1">
                  Logo ke paas dikhne wala brand text.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#422514] mb-1.5">
                  Logo Image Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={settings.altText || ''}
                  onChange={(e) => setSettings({ ...settings, altText: e.target.value })}
                  placeholder="Majdur Furniture Works Logo - Custom Wooden Furniture in Motihari"
                  className="w-full px-3.5 py-2 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
                />
                <p className="text-[11px] text-[#706456] mt-1">
                  Google aur screen readers ke liye descriptive text.
                </p>
              </div>

              {/* Section Visibility Toggles */}
              <div className="pt-2 border-t border-[#f0e9df] space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#422514]">
                  Section Visibility Controls
                </span>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#fbf9f5] border border-[#e6ded3] cursor-pointer hover:bg-[#f6f1e8] transition-colors">
                  <div>
                    <span className="text-xs font-semibold text-[#14281e] block">
                      Show in Website Header
                    </span>
                    <span className="text-[11px] text-[#706456]">
                      Desktop top navigation bar par logo dikhayein
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showInHeader !== false}
                    onChange={(e) =>
                      setSettings({ ...settings, showInHeader: e.target.checked })
                    }
                    className="w-4 h-4 text-[#1c3b2d] rounded focus:ring-[#1c3b2d]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#fbf9f5] border border-[#e6ded3] cursor-pointer hover:bg-[#f6f1e8] transition-colors">
                  <div>
                    <span className="text-xs font-semibold text-[#14281e] block">
                      Show in Website Footer
                    </span>
                    <span className="text-[11px] text-[#706456]">
                      Bottom dark footer section par logo dikhayein
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showInFooter !== false}
                    onChange={(e) =>
                      setSettings({ ...settings, showInFooter: e.target.checked })
                    }
                    className="w-4 h-4 text-[#1c3b2d] rounded focus:ring-[#1c3b2d]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#fbf9f5] border border-[#e6ded3] cursor-pointer hover:bg-[#f6f1e8] transition-colors">
                  <div>
                    <span className="text-xs font-semibold text-[#14281e] block">
                      Show on Mobile Screens
                    </span>
                    <span className="text-[11px] text-[#706456]">
                      Smartphone header aur drawer menu par logo dikhayein
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showInMobile !== false}
                    onChange={(e) =>
                      setSettings({ ...settings, showInMobile: e.target.checked })
                    }
                    className="w-4 h-4 text-[#1c3b2d] rounded focus:ring-[#1c3b2d]"
                  />
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={savingSettings}
                  id="save-logo-settings-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-60"
                >
                  <Save className="w-4 h-4 text-[#88ba9e]" />
                  <span>{savingSettings ? 'Saving...' : 'Save Logo Settings'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
