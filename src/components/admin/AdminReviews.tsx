import React, { useState } from 'react';
import { CustomerReview } from '../../types';
import { api } from '../../api';
import {
  Plus,
  Trash2,
  Edit2,
  MessageSquareQuote,
  X,
  Check,
  Upload,
  Video,
  Image as ImageIcon,
  Star,
  Eye,
  EyeOff,
  Play,
  Link as LinkIcon,
} from 'lucide-react';

interface AdminReviewsProps {
  reviews: CustomerReview[];
  token: string;
  onRefresh: () => void;
}

export const AdminReviews: React.FC<AdminReviewsProps> = ({ reviews, token, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [product, setProduct] = useState('');
  const [date, setDate] = useState(
    new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  );
  const [rating, setRating] = useState<number>(5);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [published, setPublished] = useState(true);

  // Upload loaders
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [videoTab, setVideoTab] = useState<'upload' | 'url'>('upload');

  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const openAddModal = () => {
    setEditingReviewId(null);
    setCustomerName('');
    setReviewText('');
    setProduct('');
    setDate(new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }));
    setRating(5);
    setImageUrl('');
    setVideoUrl('');
    setPublished(true);
    setError('');
    setShowModal(true);
  };

  const openEditModal = (rev: CustomerReview) => {
    setEditingReviewId(rev.id);
    setCustomerName(rev.customerName || '');
    setReviewText(rev.reviewText || '');
    setProduct(rev.product || '');
    setDate(rev.date || '');
    setRating(rev.rating || 5);
    setImageUrl(rev.imageUrl || '');
    setVideoUrl(rev.videoUrl || '');
    setPublished(rev.published !== false);
    setError('');
    setShowModal(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');
    try {
      const res = await api.uploadMedia(file, token);
      setImageUrl(res.url);
      setStatusMessage('Customer photo upload ho gayi!');
    } catch (err: any) {
      setError(err.message || 'Image upload karne me truti aayi.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    setError('');
    try {
      const res = await api.uploadMedia(file, token);
      setVideoUrl(res.url);
      setStatusMessage('Customer review video upload ho gaya!');
    } catch (err: any) {
      setError(err.message || 'Video upload karne me truti aayi.');
    } finally {
      setUploadingVideo(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim()) {
      setError('Customer Name aur Review Text aawashyak hain.');
      return;
    }

    try {
      const payload: Omit<CustomerReview, 'id' | 'createdAt'> = {
        customerName: customerName.trim(),
        reviewText: reviewText.trim(),
        product: product.trim() || undefined,
        date: date.trim() || undefined,
        rating,
        imageUrl: imageUrl.trim() || undefined,
        videoUrl: videoUrl.trim() || undefined,
        published,
      };

      if (editingReviewId) {
        await api.updateReview(editingReviewId, payload, token);
        setStatusMessage('Review safalta-purvak update ho gaya!');
      } else {
        await api.createReview(payload, token);
        setStatusMessage('Naya asli review safalta-purvak add ho gaya!');
      }

      onRefresh();
      setShowModal(false);
    } catch (err: any) {
      setError(err.message || 'Review save karne me truti.');
    }
  };

  const handleTogglePublished = async (rev: CustomerReview) => {
    try {
      const nextStatus = !rev.published;
      await api.updateReview(rev.id, { published: nextStatus }, token);
      onRefresh();
    } catch (err: any) {
      alert('Status change error: ' + err.message);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Kya aap "${name}" ka review delete karna chahte hain?`)) {
      try {
        await api.deleteReview(id, token);
        onRefresh();
        setStatusMessage(`Review delete ho gaya.`);
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
            Customer Feedback & Reviews
          </h3>
          <p className="text-xs text-[#706456]">
            Jin grahakon ne workshop se furniture banwaya hai, unka satya feedback, customer/furniture photo aur delivery video attach karein.
          </p>
        </div>

        <button
          id="admin-add-review-btn"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-[#88ba9e]" />
          <span>Asli Review Add Karein</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-medium">
          {statusMessage}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-[#fbf9f5] rounded-2xl max-w-xl w-full p-6 border border-[#dfd3c4] shadow-2xl relative max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfd3c4]">
              <h4 className="font-serif-craft text-lg font-bold text-[#14281e] flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-[#1c3b2d]" />
                <span>{editingReviewId ? 'Review Edit Karein' : 'Naya Review Darj Karein'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowModal(false)}
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

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 overflow-y-auto flex-1 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#422514] mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar (Janpul, Motihari)"
                    className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#422514] mb-1">
                    Product Banwaya (Optional)
                  </label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g. 6x6 Saagwan King Size Bed"
                    className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#422514] mb-1">
                    Date / Month (Optional)
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Nov 2024"
                    className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#422514] mb-1">Rating</label>
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="p-1 hover:scale-110 transition-transform"
                        title={`${s} Star`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            s <= rating
                              ? 'text-amber-500 fill-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-[#5c341b] ml-1">
                      {rating} / 5
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#422514] mb-1">
                  Customer Ka Review / Feedback *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Customer ne furniture ki lakdi, finishing, majbooti aur workshop ke vyavahar ke baare mein kya kaha..."
                  className="w-full px-3 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs sm:text-sm text-[#26221f]"
                />
              </div>

              {/* MEDIA SECTION: IMAGE */}
              <div className="p-3.5 bg-white rounded-xl border border-[#dfd3c4] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14281e] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#1c3b2d]" />
                    <span>Customer Photo / Product Photo (Optional)</span>
                  </span>
                  <div className="flex items-center gap-1 bg-[#f4efe7] p-0.5 rounded-lg text-[10px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setImageTab('upload')}
                      className={`px-2 py-0.5 rounded ${
                        imageTab === 'upload' ? 'bg-[#1c3b2d] text-white' : 'text-[#706456]'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('url')}
                      className={`px-2 py-0.5 rounded ${
                        imageTab === 'url' ? 'bg-[#1c3b2d] text-white' : 'text-[#706456]'
                      }`}
                    >
                      Photo URL
                    </button>
                  </div>
                </div>

                {imageTab === 'upload' ? (
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f4efe7] hover:bg-[#ede4d5] text-[#1c3b2d] text-xs font-semibold rounded-lg border border-[#dfd3c4] transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Choose Image (JPG, PNG, WebP)'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... ya image link"
                      className="flex-1 px-3 py-1.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-lg text-xs"
                    />
                  </div>
                )}

                {imageUrl && (
                  <div className="flex items-center gap-3 pt-1">
                    <img
                      src={imageUrl}
                      alt="Customer/Product preview"
                      className="w-16 h-16 object-cover rounded-lg border border-[#dfd3c4]"
                    />
                    <div className="text-xs">
                      <p className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Photo Attached
                      </p>
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="text-red-600 hover:underline text-[11px] mt-1"
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MEDIA SECTION: VIDEO */}
              <div className="p-3.5 bg-white rounded-xl border border-[#dfd3c4] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14281e] flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#7b4624]" />
                    <span>Customer Video / Delivery Video (Optional)</span>
                  </span>
                  <div className="flex items-center gap-1 bg-[#f4efe7] p-0.5 rounded-lg text-[10px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setVideoTab('upload')}
                      className={`px-2 py-0.5 rounded ${
                        videoTab === 'upload' ? 'bg-[#1c3b2d] text-white' : 'text-[#706456]'
                      }`}
                    >
                      Upload Video
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoTab('url')}
                      className={`px-2 py-0.5 rounded ${
                        videoTab === 'url' ? 'bg-[#1c3b2d] text-white' : 'text-[#706456]'
                      }`}
                    >
                      Video Link / URL
                    </button>
                  </div>
                </div>

                {videoTab === 'upload' ? (
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f4efe7] hover:bg-[#ede4d5] text-[#1c3b2d] text-xs font-semibold rounded-lg border border-[#dfd3c4] transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingVideo ? 'Uploading...' : 'Choose Short Video (MP4, WebM up to 50MB)'}</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoFileUpload}
                        disabled={uploadingVideo}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="YouTube link, Instagram Reel link, ya MP4 video link..."
                      className="flex-1 px-3 py-1.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-lg text-xs"
                    />
                  </div>
                )}

                {videoUrl && (
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-16 h-12 bg-black/80 rounded-lg flex items-center justify-center text-white">
                      <Play className="w-5 h-5 fill-white" />
                    </div>
                    <div className="text-xs">
                      <p className="text-emerald-700 font-semibold flex items-center gap-1 truncate max-w-xs">
                        <Check className="w-3.5 h-3.5" /> Video Attached: {videoUrl.slice(0, 30)}...
                      </p>
                      <button
                        type="button"
                        onClick={() => setVideoUrl('')}
                        className="text-red-600 hover:underline text-[11px] mt-1"
                      >
                        Remove Video
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Published Switch */}
              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#14281e]">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1c3b2d]"
                  />
                  <span>Public Website Par Dikhayein (Published)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#dfd3c4]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-white border border-[#dfd3c4] rounded-xl text-xs font-semibold text-[#524639]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage || uploadingVideo}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold rounded-xl shadow-xs disabled:opacity-60"
                >
                  <Check className="w-4 h-4 text-[#88ba9e]" />
                  <span>{editingReviewId ? 'Update Review' : 'Review Save Karein'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#d8cdbd] p-8 text-center text-[#706456]">
          <MessageSquareQuote className="w-10 h-10 mx-auto text-[#8c7e6c] mb-2" />
          <p className="text-sm font-semibold">Abhi koi review add nahi kiya gaya hai.</p>
          <p className="text-xs mt-1">
            Jab grahak workshop se feedback dein ya unka photo/video ho to upar diye gaye button se add karein.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dfd3c4] shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {rev.imageUrl ? (
                      <img
                        src={rev.imageUrl}
                        alt={rev.customerName}
                        className="w-10 h-10 rounded-full object-cover border border-[#dfd3c4]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#1c3b2d]/10 text-[#1c3b2d] flex items-center justify-center font-bold text-sm">
                        {rev.customerName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#14281e]">
                        {rev.customerName}
                      </h4>
                      {rev.product && (
                        <span className="text-[11px] text-[#7b4624] font-medium block">
                          {rev.product}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    {rev.date && (
                      <span className="text-[10px] text-[#786c5f] block">{rev.date}</span>
                    )}
                    {rev.rating && (
                      <div className="flex items-center justify-end gap-0.5 mt-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-400" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#4a3f33] mt-3 italic leading-relaxed">
                  "{rev.reviewText}"
                </p>

                {/* Attached Media Indicators */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-[#f6f2eb]">
                  {rev.imageUrl && (
                    <div className="relative group">
                      <img
                        src={rev.imageUrl}
                        alt="Attached customer feedback"
                        className="w-14 h-14 object-cover rounded-lg border border-[#dfd3c4]"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center py-0.5 rounded-b-lg">
                        Photo
                      </span>
                    </div>
                  )}

                  {rev.videoUrl && (
                    <div className="h-14 px-3 bg-[#1c3b2d]/5 border border-[#1c3b2d]/20 rounded-lg flex items-center gap-2 text-xs text-[#1c3b2d]">
                      <div className="w-7 h-7 rounded-full bg-[#1c3b2d] text-white flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <div>
                        <span className="font-bold block text-[11px]">Video Attached</span>
                        <a
                          href={rev.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[#5c341b] hover:underline"
                        >
                          Watch Clip
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f0e7db] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleTogglePublished(rev)}
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
                    rev.published !== false
                      ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                      : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                  }`}
                  title="Click to toggle Live/Hidden status"
                >
                  {rev.published !== false ? (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Live On Site</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(rev)}
                    className="p-1.5 rounded-lg bg-[#f4efe7] hover:bg-[#ede5d8] text-[#14281e] transition-colors"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(rev.id, rev.customerName)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    title="Delete Review"
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
