from typing import List, Dict
from .embeddings import MusicEmbeddingsManager
from .prompts import ZANE_SYSTEM_PROMPT
import openai

class ZaneLoweMusicAgent:
    def __init__(self, embeddings_manager: MusicEmbeddingsManager):
        self.embeddings_manager = embeddings_manager
        self.conversation_history = []

    def generate_response(self, user_input: str) -> str:
        """
        Generates Zane Lowe-style response based on user input and relevant music data
        """
        # Get relevant music context
        relevant_content = self.embeddings_manager.query_similar(user_input)
        
        # Prepare messages for ChatGPT
        messages = [
            {"role": "system", "content": ZANE_SYSTEM_PROMPT},
            *self.conversation_history,
            {"role": "user", "content": f"""
                User Question: {user_input}
                
                Relevant Music Context:
                {'\n'.join(relevant_content)}
            """}
        ]

        # Generate response
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages,
            temperature=0.7,
            max_tokens=300
        )

        # Update conversation history
        self.conversation_history.extend([
            {"role": "user", "content": user_input},
            {"role": "assistant", "content": response.choices[0].message['content']}
        ])

        return response.choices[0].message['content'] 