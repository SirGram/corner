import { useRef, useEffect, useState } from "react";

const VideoPreview = ({
  src,
  preview = true,
}: {
  src: string;
  preview?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [gradientStyle, setGradientStyle] = useState<string | null>(null);

  useEffect(() => {
    if (!preview) return;
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const playVideo = () => {
      videoElement.currentTime = 0;
      videoElement.play();
    };

    const checkTime = () => {
      if (videoElement.currentTime >= 10) {
        videoElement.currentTime = 0;
      }
    };

    videoElement.addEventListener("loadeddata", playVideo);
    videoElement.addEventListener("timeupdate", checkTime);

    return () => {
      videoElement.removeEventListener("loadeddata", playVideo);
      videoElement.removeEventListener("timeupdate", checkTime);
    };
  }, [src, preview]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    const mouseX = clientX - left;
    const mouseY = clientY - top;
    const gradient = `radial-gradient(circle at ${mouseX}px ${mouseY}px, #6fe5ffa9, #010103ff)`;
    setGradientStyle(gradient);
  };

  const handleMouseLeave = () => {
    setGradientStyle(null);
  };

  return (
    <div className="relative  ">
      {preview ? (
        <video
          ref={videoRef}
          src={src}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="border-border rounded-base border-base w-full h-fit"
        />
      ) : (
        <video
          controls
          ref={videoRef}
          src={src}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="border-border rounded-base border-base w-full h-fit"
        />
      )}
      {preview && (
        <div
          className="cursor-custom absolute top-0 left-0 right-0 bottom-0 bg-gray-500 hover:bg-transparent hover:opacity-75 opacity-0 transition-opacity duration-300 h-full w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ background: gradientStyle || "" }}
        />
      )}
    </div>
  );
};

export default VideoPreview;
