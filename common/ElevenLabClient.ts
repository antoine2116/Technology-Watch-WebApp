import queryString from "query-string";

const API_KEY = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;
const API_URL = "https://api.elevenlabs.io/v1/";

export interface InputError {
  field: string;
  error: string;
}

export class ElevenLabError {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleResponse = async (res: Response) => {
  if (res.ok) {
    return await res.blob();
  } else {
    const json = await res.json();

    if (json.error === undefined) throw new ElevenLabError(res.status, "Something went wrong. Please try again later");
    else throw new ElevenLabError(res.status, json.error.message);
  }
};

const generateHeaders = (): HeadersInit => {
  if (!API_KEY) {
    throw new ElevenLabError(403, "Eleven Labs API Key not set in .env file");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "audio/mpeg",
    "xi-api-key": API_KEY,
  };

  return headers;
};

export const ElevenLabClient = {
  postBlob : (endpoint: string, body: any): Promise<Blob> =>
    fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: generateHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),
};
