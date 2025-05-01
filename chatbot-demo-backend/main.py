from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List
import random

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

# Knowledge base for the chatbot
KNOWLEDGE_BASE = {
    "what are you": "I'm a demo chatbot created by Sam Rutan to showcase his experience with LLM chatbots. I can tell you about his work with AI, graph databases, and vector embeddings. Would you like to know about the full version of this chatbot?",
    "who are you": "I'm a demo chatbot created by Sam Rutan to showcase his experience with LLM chatbots. I can tell you about his work with AI, graph databases, and vector embeddings. Would you like to know about the full version of this chatbot?",
    "tell me about yourself": "I'm a demo version of a more sophisticated chatbot that Sam Rutan built. The full version uses Llama 3.2, Neo4j graph database, and vector embeddings to provide intelligent responses about movies. Would you like to learn about the technologies used in the full version?",
    "what can you do": "I can explain Sam's experience with building LLM chatbots. The full version of this chatbot uses advanced technologies like graph databases and vector embeddings to provide intelligent responses about movies. Would you like to know about the financial firm project where these technologies were implemented?",
    "explain your architecture": "The full version of this chatbot uses a sophisticated architecture with Llama 3.2 for language processing, Neo4j for storing and querying movie data in a graph structure, and vector embeddings for semantic search. This demo version is simplified to showcase the concept. Would you like to know how these technologies work together?",
    "what technologies do you use": "The full version uses Llama 3.2 for language processing, Neo4j for graph database storage, and vector embeddings for semantic search. This demo version is a simplified showcase of the concept. Would you like to know about the financial firm project where these technologies were implemented?",
    "tell me about the full version": "The full version of this chatbot uses Llama 3.2 for natural language processing, Neo4j graph database for storing and querying movie data, and vector embeddings for semantic search. It can answer complex questions about movies, their relationships, and provide recommendations. Would you like to see the movie database demo on GitHub?",
    "what is a graph database": "A graph database like Neo4j stores data in nodes and relationships, making it perfect for representing complex connections between movies, actors, directors, and other entities. It allows for efficient querying of these relationships. Would you like to know how this was used in the financial firm project?",
    "what are vector embeddings": "Vector embeddings are numerical representations of text that capture semantic meaning. They allow the chatbot to understand the similarity between different concepts and provide more relevant responses. Would you like to know how these were implemented in the financial firm project?",
    "how does the full version work": "The full version combines Llama 3.2 for understanding natural language, Neo4j for storing and querying movie data in a graph structure, and vector embeddings for semantic search. This creates a powerful system for answering complex questions about movies. Would you like to know about the financial firm implementation?",
    "tell me about the financial firm project": "Sam built a sophisticated LLM chatbot for a large, highly successful financial firm. The system used Llama 3.2, Neo4j graph database, and vector embeddings to provide intelligent responses and automate complex financial queries. Would you like to know more about the specific technologies used in this project?",
    "where can i see more demos": "You can check out Sam's GitHub repository at https://github.com/samrutan21/llm-bot-python to see the movie database retrieval demo. Would you like to know more about the financial firm project?",
    "what's on your github": "Sam's GitHub repository (https://github.com/samrutan21/llm-bot-python) contains the movie database retrieval demo, showcasing the full implementation of the LLM chatbot with graph database and vector embeddings. Would you like to know about the financial firm project where these technologies were implemented?"
}

# Default responses for unknown queries
DEFAULT_RESPONSES = [
    "I'm a demo chatbot that can tell you about Sam's experience with LLM chatbots. Try asking 'What are you?' or 'Tell me about yourself'. Would you like to know about the financial firm project?",
    "I can explain how the full version of this chatbot uses graph databases and vector embeddings. Try asking 'What technologies do you use?' or 'Tell me about the financial firm project'.",
    "The full version of this chatbot uses advanced AI technologies. Ask me about its architecture, capabilities, or the financial firm project.",
    "I'm here to showcase Sam's experience with building sophisticated chatbots. Try asking about the technologies used, how it works, or the financial firm implementation."
]

def get_response(message: str) -> str:
    """Get a response based on the user's message."""
    message = message.lower().strip()
    
    # Check if we have a direct match in the knowledge base
    if message in KNOWLEDGE_BASE:
        return KNOWLEDGE_BASE[message]
    
    # Check for partial matches
    for key, value in KNOWLEDGE_BASE.items():
        if key in message:
            return value
    
    # Return a random default response
    return random.choice(DEFAULT_RESPONSES)

@app.post("/chat")
async def chat(message: Message):
    try:
        response = get_response(message.message)
        return {"response": response}
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request. Please try again."
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 