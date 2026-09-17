import React, { useState } from 'react';
import { CustomerReview, BusinessSettings } from '../types';
import { MessageSquareQuote, CheckCircle, Star, Play, X, Image as ImageIcon, Video } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  business: BusinessSettings;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, business }) => {
  const [selectedMedia, setSelectedMedia] = useState<{
    type: 'image' | 'video';
    url: string;
    title: string;
  } | null>(null);

  // Filter only published reviews for public view
  const publicReviews = reviews.filter((rev) => rev.published !== false);

  // Helper to convert YouTube / Vimeo / Direct video to embed URL if applicable
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=') || url.includes('youtube.com/embed/')) {
      const id = url.includes('v=')
        ? url.split('v=')[1]?.split('&')[0]
        : url.split('embed/')[1]?.split('?')[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
    }
    return url;
  };

  const isEmbeddable = (url: string) => {
    return (
      url.includes('youtube.com') ||
      url.includes('youtu.be') ||
      url.includes('vimeo.com')
    );
  };

  return (
    <section id="reviews" className="py-16 bg-[#f5efe7] border-b border-[#ded3c2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#25503d] bg-[#1c3b2d]/10 px-3 py-1 rounded-full border border-[#1c3b2d]/15">
            Grahakon Ki Raye
          </span>
          <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e]">
            Customer Feedback & Reviews
          </h2>
          <p className="text-sm sm:text-base text-[#615344]">
            Motihari aur aas-paas ke parivaron ka satya anubhav, delivered furniture aur feedback.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10">
          {publicReviews.length === 0 ? (
            /* Clean Authentic Placeholder - Zero Fake Reviews */
            <div className="bg-white/80 rounded-2xl border border-dashed border-[#d8cdbd] p-10 text-center max-w-xl mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#ede4d5] text-[#1c3b2d] flex items-center justify-center mx-auto">
                <MessageSquareQuote className="w-7 h-7" />
              </div>
              <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">
                Asli Grahak Feedback
              </h3>
              <p className="text-sm text-[#615344] leading-relaxed">
                {business.placeholders?.reviewsText ||
                  'Customer feedback yahan workshop admin ke dwara add kiya jayega.'}
              </p>
              <p className="text-xs text-[#8c7e6c]">
                Hum internet se fake reviews ya banawati star ratings generate nahi karte. Jo grahak workshop se furniture banwate hain, unka satya feedback hi yahan dikhaya jata hai.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-[#dfd3c4] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3.5">
                    {/* Header with avatar / name / stars */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        {rev.imageUrl ? (
                          <img
                            src={rev.imageUrl}
                            alt={rev.customerName}
                            className="w-10 h-10 rounded-full object-cover border border-[#dfd3c4] cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() =>
                              setSelectedMedia({
                                type: 'image',
                                url: rev.imageUrl!,
                                title: `${rev.customerName} - Furniture Photo`,
                              })
                            }
                            title="Click to zoom photo"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#1c3b2d]/10 text-[#1c3b2d] flex items-center justify-center font-bold text-sm">
                            {rev.customerName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-[#14281e]">{rev.customerName}</h4>
                          {rev.product && (
                            <p className="text-[11px] text-[#7b4624] font-medium">{rev.product}</p>
                          )}
                        </div>
                      </div>

                      {/* Rating stars */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-xs sm:text-sm text-[#4d4236] leading-relaxed italic">
                      "{rev.reviewText}"
                    </p>

                    {/* Attached Photo Display */}
                    {rev.imageUrl && (
                      <div
                        onClick={() =>
                          setSelectedMedia({
                            type: 'image',
                            url: rev.imageUrl!,
                            title: `${rev.customerName} - Delivered Furniture Photo`,
                          })
                        }
                        className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#dfd3c4] bg-[#fbf9f5]"
                      >
                        <img
                          src={rev.imageUrl}
                          alt={`${rev.customerName} furniture`}
                          className="w-full h-44 object-cover group-hover:scale-103 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-2xs">
                          <ImageIcon className="w-4 h-4" />
                          <span>Photo Badi Karein</span>
                        </div>
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-2xs">
                          Customer / Furniture Photo
                        </span>
                      </div>
                    )}

                    {/* Attached Video Display */}
                    {rev.videoUrl && (
                      <div className="rounded-xl overflow-hidden border border-[#dfd3c4] bg-black">
                        {isEmbeddable(rev.videoUrl) ? (
                          <div className="relative aspect-video">
                            <iframe
                              src={getEmbedUrl(rev.videoUrl)}
                              title={`${rev.customerName} review video`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <video
                              src={rev.videoUrl}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-44 object-cover bg-black"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedMedia({
                                  type: 'video',
                                  url: rev.videoUrl!,
                                  title: `${rev.customerName} - Feedback Video`,
                                })
                              }
                              className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-lg text-xs flex items-center gap-1 backdrop-blur-2xs transition-colors"
                              title="Full Screen / Badi Screen par dekhein"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span className="text-[10px]">Popout</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card footer */}
                  <div className="mt-4 pt-3 border-t border-[#f0e7db] flex items-center justify-between text-[11px] text-[#786c5f]">
                    <div className="flex items-center gap-1 text-[#25503d] font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-[#25503d]" />
                      <span>Verified Customer</span>
                    </div>
                    {rev.date && <span>{rev.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Media Lightbox / Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs">
            <div className="relative max-w-4xl w-full bg-transparent flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-white pb-3">
                <span className="text-sm font-semibold">{selectedMedia.title}</span>
                <button
                  type="button"
                  onClick={() => setSelectedMedia(null)}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                />
              ) : (
                <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
                  {isEmbeddable(selectedMedia.url) ? (
                    <iframe
                      src={getEmbedUrl(selectedMedia.url)}
                      title={selectedMedia.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={selectedMedia.url}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
