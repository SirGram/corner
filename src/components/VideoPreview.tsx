import { useState, useRef, useCallback } from "react";

interface VideoPreviewProps {
  src: string;
  preview?: boolean;
}

const VideoPreview = ({ src, preview = true }: VideoPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract YouTube ID from various URL formats
  const getYouTubeId = useCallback((url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }, []);

  const videoId = getYouTubeId(src);
  if (!videoId) return null;

  const handleClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative h-full w-full">
      <div
        className="w-full h-fit overflow-hidden rounded-lg border-2 dark:border-darkBorder shadow-xl transition-all duration-300 hover:shadow-2xl"
        onClick={handleClick}
        role="button"
        aria-label="Play Video"
      >
        {preview && !isPlaying ? (
          // Thumbnail for preview
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            className="w-full h-full object-cover aspect-video"
          />
        ) : (
          // Directly play the video
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=1&rel=0`}
            className="object-contain w-full h-full aspect-video bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="YouTube video player"
            aria-label="Embedded video player"
          />
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
