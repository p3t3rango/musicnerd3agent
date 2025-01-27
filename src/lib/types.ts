export interface Artist {
  id: string;
  name: string;
  bio?: string;
  genres?: string[];
  releases?: Release[];
  musicbrainzId?: string;
  // Add any other fields from the API
}

export interface Release {
  title: string;
  year?: number;
  type?: string;
  tracks?: Track[];
}

export interface Track {
  title: string;
  duration?: string;
  position?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface MusicNerdResponse {
  result: any;
  success?: boolean;
  error?: string;
} 