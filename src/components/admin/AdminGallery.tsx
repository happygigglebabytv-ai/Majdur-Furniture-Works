import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { api } from '../../api';
import { Plus, Trash2, Upload, X, Eye, EyeOff, Camera, Check } from 'lucide-react';

interface AdminGalleryProps {
  gallery: GalleryItem[];
  token: string;
  onRefresh: () => void;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ gallery, token, onRefresh }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState<'SHOP' | 'FURNITURE' | 'WORK PROCESS'>('FURNITURE');
  const [category, setCategory] = useState('Showroom');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(true);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadMedia(file, token);
      if (res.url) {
        setImageUrl(res.url);
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Photo upload karein ya image URL daalein.');
      return;
    }
    if (!title) {
      setError('Title aawashyak hai.');
      return;
    }

    try {
      await api.createGalleryItem(
        {
          title,
          description,
          group,
          category: category as any,
          imageUrl,
          published,
          order: gallery.length + 1,
        },
        token
      );
      onRefresh();
      setShowAddModal(false);
      setTitle('');
      setDescription('');
      setImageUrl('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Gallery me save nahi ho paya.');
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (window.confirm(`Kya aap "${itemTitle}" photo delete karna chahte hain?`)) {
      try {
        await api.deleteGalleryItem(id, token);
        onRefresh();
      } catch (err: any) {
        alert('Delete error: ' + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dfd3c4]">
        <div>
          <h3 className="font-serif-craft text-xl font-bold text-[#14281e]">
            Real Photo Gallery Management
          </h3>
          <p className="text-xs text-[#706456]">
            Workshop, shop interior aur ban rahe furniture ki asli photos upload karein.
          </p>
        </div>

        <button
          id="admin-add-gallery-photo-btn"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#88ba9e]" />
          <span>Real Photo Upload Karein</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-[#fbf9f5] rounded-2xl max-w-lg w-full p-6 border border-[#dfd3c4] shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfd3c4]">
              <h4 className="font-serif-craft text-lg font-bold text-[#14281e]">
                Nayi Real Photo Upload Karein
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-md text-[#786c5f] hover:bg-[#ede5d8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mt-3 p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleAdd} className="mt-4 space-y-4">
              
              {/* Image picker / URL */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Photo (Real Workshop / Furniture) *
                </label>
                <div className="space-y-2">
                  <label className="cursor-pointer flex items-center justify-center gap-2 p-3 bg-white border border-dashed border-[#b8a794] rounded-xl text-xs font-semibold text-[#1c3b2d] hover:bg-[#ede5d8]">
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? 'Uploading...' : 'Mobile / Computer Se Upload Karein'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>

                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Ya Image Link / URL daalein"
                    className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                  />
                </div>

                {imageUrl && (
                  <div className="mt-2 w-28 h-28 rounded-xl overflow-hidden border border-[#dfd3c4]">
                    <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Group */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#422514] mb-1">Gallery Group *</label>
                  <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                  >
                    <option value="SHOP">SHOP (Shop Front / Interior)</option>
                    <option value="FURNITURE">FURNITURE (Finished Pieces)</option>
                    <option value="WORK PROCESS">WORK PROCESS (Making / Cutting)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#422514] mb-1">Sub-Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Bed, Polish, Wood Cutting"
                    className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Workshop mein Saagwan Double Bed ka frame tayyar"
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Kaha aur kis tarah ka kaam hai..."
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                />
              </div>

              {/* Published checkbox */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-[#14281e] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1c3b2d]"
                  />
                  <span>Public website par live dikhayein</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-[#dfd3c4]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs font-semibold text-[#524639]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold rounded-xl"
                >
                  Photo Add Karein
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {gallery.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#d8cdbd] p-8 text-center text-[#706456]">
          <Camera className="w-10 h-10 mx-auto text-[#8c7e6c] mb-2" />
          <p className="text-sm font-semibold">Abhi koi photo upload nahi ki gayi hai.</p>
          <p className="text-xs mt-1">Real workshop aur furniture ki photos upar button se upload karein.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#dfd3c4] overflow-hidden shadow-2xs flex flex-col justify-between"
            >
              <div className="aspect-4/3 bg-[#ede4d5] relative overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase bg-black/70 text-white px-2 py-0.5 rounded">
                  {item.group}
                </span>
              </div>

              <div className="p-3">
                <h4 className="text-xs font-bold text-[#14281e] truncate">{item.title}</h4>
                {item.description && (
                  <p className="text-[11px] text-[#706456] truncate mt-0.5">{item.description}</p>
                )}

                <div className="mt-3 pt-2 border-t border-[#f0e7db] flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                    {item.published ? 'Live' : 'Hidden'}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
