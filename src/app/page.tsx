import Chat from '../components/Chat';
import { testArtistSearch } from '../lib/api';

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Music Nerd: Zane Lowe</h1>
        <p className="text-gray-600">Ask Zane anything</p>
        <button 
          onClick={() => testArtistSearch()}
          className="mt-2 px-4 py-2 bg-gray-200 rounded"
        >
          Test API
        </button>
      </div>
      <Chat />
    </main>
  );
} 