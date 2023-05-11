import { useSpeech } from "@/hooks/UseSpeech";
import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import TextToSpeechButton from "./TextToSpeechButton";
import { Article } from "@/models/Article";
import { useIsMount } from "@/hooks/UseIsMount";
import { generateTextToSpeechText } from "@/helpers/ArticleHelper";

interface TextToSpeechPlayerProps {
  articles: Article[];
  multi?: boolean;
}

function TextToSpeechPlayer({ articles, multi = false }: TextToSpeechPlayerProps) {
  const isMount = useIsMount();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const { audioURL, loading, getAudio } = useSpeech(generateTextToSpeechText(articles[currentArticleIndex]));
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

        if (multi) {
          nextArticle();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef.current]);

  // Next article
  const nextArticle = () => {
    if (currentArticleIndex < articles.length - 1) {
      setCurrentArticleIndex(currentArticleIndex + 1);
    } else {
      setCurrentArticleIndex(0);
    }
  };

  // Previous article
  const previousArticle = () => {
    if (currentArticleIndex > 0) {
      setCurrentArticleIndex(currentArticleIndex - 1);
    } else {
      setCurrentArticleIndex(articles.length - 1);
    }
  };

  // Reset audio and load new article
  useEffect(() => {
    if (multi && !isMount) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      getAudio();
    }
  }, [currentArticleIndex]);

  return (
    <div>
      {/* Title */}
      {multi && <h2 className="leading-6 font-medium text-slate-900 text-center mb-3">{articles[currentArticleIndex].title}</h2>}

      <div className="flex items-center justify-center space-x-5">
        {/* Previous button */}
        {multi && (
          <button className="text-xl text-slate-600 h-10 w-10 flex justify-center items-center">
            <IoPlayBack onClick={previousArticle} />
          </button>
        )}

        {/* Play / pause button */}
        {loading ? (
          <ClipLoader
            color={"rgb(5 122 85)"}
            loading={true}
            size={40}
          />
        ) : !isPlaying ? (
          <TextToSpeechButton onClick={handleClickPlay}>
            <IoPlay />
          </TextToSpeechButton>
        ) : (
          <TextToSpeechButton onClick={handleClickPause}>
            <IoPause />
          </TextToSpeechButton>
        )}

        {/* Next button */}
        {multi && (
          <button className="text-xl text-slate-600 h-10 w-10 flex justify-center items-center">
            <IoPlayForward onClick={nextArticle} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TextToSpeechPlayer;
