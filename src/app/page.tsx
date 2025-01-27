import Chat from '../components/Chat';

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Music Nerd: Zane Lowe</h1>
        <p className="text-gray-600">Ask Zane anything</p>
      </div>
      <Chat />
    </main>
  );
} 