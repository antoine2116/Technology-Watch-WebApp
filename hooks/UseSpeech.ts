import { ElevenLabClient } from "@/common/ElevenLabClient";
import { log } from "console";
import { useEffect, useState } from "react";

const voiceId = "ErXwobaYiN019PkySvjV";

export const useSpeech = (text: string) => {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAudio = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ElevenLabClient.postBlob(`text-to-speech/${voiceId}`, {
        text: text,
        voice_settings: {
          stability: 1,
          similarity_boost: 1,
        },
      });

      const url = URL.createObjectURL(response);
      setAudioURL(url);
    } catch (error) {
      console.log(error);
      setError("error");
    } finally {
      setLoading(false);
    }
  };

  return { audioURL, loading, error, getAudio };
};
