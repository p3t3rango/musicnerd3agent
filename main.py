import os
from dotenv import load_dotenv
from src.data_loader import MusicDataLoader
from src.embeddings import MusicEmbeddingsManager
from src.agent import ZaneLoweMusicAgent

def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize components
    data_loader = MusicDataLoader()
    embeddings_manager = MusicEmbeddingsManager()
    
    # Load or update music data
    music_data = data_loader.scrape_music_data()
    data_loader.save_to_json(music_data)
    
    # Create embeddings
    embeddings_manager.create_embeddings(music_data)
    
    # Initialize agent
    agent = ZaneLoweMusicAgent(embeddings_manager)
    
    print("Zane Lowe Music Discovery Agent (Type 'quit' to exit)")
    print("-" * 50)
    
    while True:
        user_input = input("\nYou: ").strip()
        
        if user_input.lower() == 'quit':
            break
            
        response = agent.generate_response(user_input)
        print(f"\nZane: {response}")

if __name__ == "__main__":
    main() 