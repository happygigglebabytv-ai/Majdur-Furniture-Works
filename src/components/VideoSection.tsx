import React, { useState } from 'react';
import { VideoItem, BusinessSettings } from '../types';
import { Video, Play, Film, Sparkles, ExternalLink, X } from 'lucide-react';

interface VideoSectionProps {
  videos: VideoItem[];
  business: BusinessSettings;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos, business }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Helper to convert YouTube URL to embed if applicable
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <section id="videos" className="py-16 bg-[#fbf9f5] border-b border-[#e6ded3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b4624] bg-[#7b4624]/10 px-3 py-1 rounded-full border border-[#7b4624]/20">
            Karyashala & Process
          </span>
          <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e]">
            Videos & Work Process
          </h2>
          <p className="text-sm sm:text-base text-[#615344]">
            Furniture banne ke tarike, wood cutting, polishing aur workshop ka seedha nazara.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10">
          {videos.length === 0 ? (
            /* Clean Authentic Placeholder */
            <div className="bg-[#f4efe7] rounded-2xl border border-dashed border-[#d8cdbd] p-10 text-center max-w-xl mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#ede4d5] text-[#7b4624] flex items-center justify-center mx-auto">
                <Film className="w-7 h-7" />
              </div>
              <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">
                Workshop Work Process Videos
              </h3>
              <p className="text-sm text-[#615344] leading-relaxed">
                {business.placeholders?.videosText ||
                  'Furniture making aur workshop videos jald yahan dekhein.'}
              </p>
              <p className="text-xs text-[#8c7e6c]">
                Workshop mein ban rahe furniture ki live short clips aur customer installation videos owner ke dwara add kiye jayenge.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#dfd3c4] shadow-2xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-16/9 bg-[#14281e] flex items-center justify-center group overflow-hidden">
                    {vid.thumbnailUrl ? (
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1c3b2d] flex items-center justify-center">
                        <Film className="w-12 h-12 text-[#88ba9e]/50" />
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setActiveVideo(vid)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1c3b2d]/85 text-white flex items-center justify-center hover:scale-110 hover:bg-[#14281e] transition-all shadow-lg backdrop-blur-xs"
                      aria-label="Play video"
                    >
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </button>

                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                      {vid.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-craft text-base font-bold text-[#14281e]">
                        {vid.title}
                      </h4>
                      {vid.description && (
                        <p className="text-xs text-[#635547] mt-1 line-clamp-2">
                          {vid.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#f0e7db] flex items-center justify-between">
                      <button
                        onClick={() => setActiveVideo(vid)}
                        className="text-xs font-semibold text-[#25503d] hover:text-[#14281e] flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Watch Video</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs">
          <div className="relative max-w-3xl w-full bg-[#14281e] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/9 bg-black">
              {activeVideo.videoUrl.includes('youtube') || activeVideo.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={getEmbedUrl(activeVideo.videoUrl)}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                ></video>
              )}
            </div>

            <div className="p-4 bg-[#14281e] text-white">
              <span className="text-xs text-[#88ba9e] font-semibold uppercase tracking-wider block">
                {activeVideo.category}
              </span>
              <h3 className="font-serif-craft text-lg font-bold mt-0.5">{activeVideo.title}</h3>
              {activeVideo.description && (
                <p className="text-xs text-[#ded3c5] mt-1">{activeVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
