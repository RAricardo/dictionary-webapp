import { useRef } from "react";
import "./AudioPlayer.css";

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer = ({ url }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current !== null) {
      const audio = audioRef.current;

      if (audio.readyState >= 2) {
        if (audio.paused) {
          audio.play().catch((error) => {
            console.error("Error occurred while playing audio:", error);
          });
        } else {
          audio.pause();
        }
      } else {
        console.error("Audio source is not loaded or ready.");
      }
    }
  };

  return (
    <div className="audio_player">
      <audio ref={audioRef} src={url}></audio>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="75"
        height="75"
        viewBox="0 0 75 75"
        onClick={togglePlay}
      >
        <g fill="#A445ED" fillRule="evenodd">
          <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
          <path d="M29 27v21l21-10.5z" />
        </g>
      </svg>
    </div>
  );
};

export default AudioPlayer;
