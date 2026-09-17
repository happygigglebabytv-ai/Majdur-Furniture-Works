import React, { useState } from 'react';
import { VideoItem } from '../../types';
import { api } from '../../api';
import { Plus, Trash2, Video, X, Play, Film } from 'lucide-react';

interface AdminVideosProps {
  videos: VideoItem[];
  token: string;
  onRefresh: () => void;
}

export const AdminVideos: React.FC<AdminVideosProps> = ({ videos, token, onRefresh }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Furniture Making');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [published, setPublished] = useState(true);
  const [error, setError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      setError('Video URL aawashyak hai (e.g. YouTube link ya video file link).');
      return;
    }
    if (!title) {
      setError('Video title aawashyak hai.');
      return;
    }

    try {
      await api.createVideo(
        {
          title,
          description,
          category: category as any,
          videoUrl,
          thumbnailUrl,
          published,
        },
        token
      );
      onRefresh();
      setShowAddModal(false);
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Video add karne mein truti.');
    }
  };

  const handleDelete = async (id: string, vidTitle: string) => {
    if (window.confirm(`Kya aap video "${vidTitle}" ko delete karna chahte hain?`)) {
      try {
        await api.deleteVideo(id, token);
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
            Video & Work Process Management
          </h3>
          <p className="text-xs text-[#706456]">
            Workshop clips, furniture making process aur finished furniture ke videos manage karein.
          </p>
        </div>

        <button
          id="admin-add-video-btn"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#88ba9e]" />
          <span>Naya Video Add Karein</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-[#fbf9f5] rounded-2xl max-w-md w-full p-6 border border-[#dfd3c4] shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfd3c4]">
              <h4 className="font-serif-craft text-lg font-bold text-[#14281e]">Naya Video Add Karein</h4>
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

            <form onSubmit={handleAdd} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Saagwan Wood Sanding & Polishing Process"
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                >
                  <option value="Furniture Making">Furniture Making</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Finished Product">Finished Product</option>
                  <option value="Customer Installation">Customer Installation</option>
                  <option value="Before / After">Before / After</option>
                  <option value="Short Reels">Short Reels</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Video URL (YouTube link ya mp4 video link) *
                </label>
                <input
                  type="text"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... ya direct video link"
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">Thumbnail Photo URL (Optional)</label>
                <input
                  type="text"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Video ke baare mein choti jankari..."
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs text-[#26221f]"
                />
              </div>

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
                  Video Add Karein
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Videos List */}
      {videos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#d8cdbd] p-8 text-center text-[#706456]">
          <Film className="w-10 h-10 mx-auto text-[#8c7e6c] mb-2" />
          <p className="text-sm font-semibold">Abhi koi video add nahi kiya gaya hai.</p>
          <p className="text-xs mt-1">Upar diye gaye button se YouTube video link add karein.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-xl border border-[#dfd3c4] overflow-hidden shadow-2xs flex flex-col justify-between"
            >
              <div className="aspect-16/9 bg-[#14281e] flex items-center justify-center relative">
                {vid.thumbnailUrl ? (
                  <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                ) : (
                  <Film className="w-8 h-8 text-[#88ba9e]/50" />
                )}
                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase bg-black/70 text-white px-2 py-0.5 rounded">
                  {vid.category}
                </span>
              </div>

              <div className="p-3">
                <h4 className="text-xs font-bold text-[#14281e] truncate">{vid.title}</h4>
                {vid.description && (
                  <p className="text-[11px] text-[#706456] truncate mt-0.5">{vid.description}</p>
                )}

                <div className="mt-3 pt-2 border-t border-[#f0e7db] flex items-center justify-between">
                  <a
                    href={vid.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#1c3b2d] font-semibold hover:underline"
                  >
                    Open Link
                  </a>
                  <button
                    onClick={() => handleDelete(vid.id, vid.title)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Delete Video"
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
