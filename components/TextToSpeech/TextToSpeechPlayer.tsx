import { useSpeech } from "@/hooks/UseSpeech";
import { log } from "console";
import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import TextToSpeechButton from "./TextToSpeechButton";

interface TextToSpeechPlayerProps {
  text: string;
}

function TextToSpeechPlayer({ text }: TextToSpeechPlayerProps) {
  const { audioURL, loading, getAudio } = useSpeech(text);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play
  const handleClickPlay = () => {
    if (!audioURL) {
      getAudio();
    } else {
      setIsPlaying(true);
    }
  };

  // Pause
  const handleClickPause = () => {
    setIsPlaying(false);
  };

  // Play audio when audioURL is updated
  useEffect(() => {
    if (audioURL) {
      audioRef.current = new Audio(audioURL);
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioURL]);

  // Play / pause audio when isPlaying is updated
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Pause audio when audio is ended
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  }, [audioRef.current]);

  // Pause audio when component is unmounted
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (loading) {
    return (
      <ClipLoader
        color={"rgb(5 122 85)"}
        loading={true}
        size={40}
      />
    );
  }

  return (
    <div>
      {!isPlaying ? (
        <TextToSpeechButton onClick={handleClickPlay}>
          <IoPlay />
        </TextToSpeechButton>
      ) : (
        <TextToSpeechButton onClick={handleClickPause}>
          <IoPause />
        </TextToSpeechButton>
      )}
    </div>
  );
}

export default TextToSpeechPlayer;
