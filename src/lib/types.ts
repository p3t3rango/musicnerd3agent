export interface Artist {
  name: string;
  spotifyId: string;
  twitterHandle?: string;
  bio?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface MusicNerdResponse {
  result: any;
} 