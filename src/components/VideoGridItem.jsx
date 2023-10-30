import Proptype from "prop-types";
import { formatDuration } from "../ustils/formatDuration";
import { useEffect, useRef, useState } from "react";
import { formatTimeAgo } from "../ustils/formatTimeAgo";

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export default function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        />
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            className="w-12 h-12 rounded-full"
            alt=""
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.title}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} View * {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

VideoGridItem.propTypes = {
  id: Proptype.string,
  title: Proptype.string,
  channel: Proptype.object,
  views: Proptype.number,
  postedAt: Proptype.instanceOf(Date),
  duration: Proptype.number,
  thumbnailUrl: Proptype.string,
  videoUrl: Proptype.string,
};
