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
    "what are you": "I'm a demo chatbot created by Sam Rutan to showcase his experience with LLM chatbots. I can tell you about his work with AI, graph databases, and vector embeddings, and how he's used these technologies professionally. Would you like to know more?",
    "who are you": "I'm a demo chatbot created by Sam Rutan to showcase his experience with LLM chatbots. I can tell you about his work with AI, graph databases, and vector embeddings, and how he's used these technologies professionally. Would you like to know more?",
    "tell me about yourself": "I'm a demo version of a sophisticated chatbot system that Sam Rutan built. The full implementation uses Llama 3.2, Neo4j graph database, and vector embeddings to provide intelligent responses. Sam has implemented this technology professionally and also created a movie database demo to showcase its capabilities. Would you like to learn about the implementation?",
    "what can you do": "I can explain Sam's experience with building LLM chatbots, including his professional implementation using graph databases and vector embeddings. He's also created a movie database demo to showcase these technologies. Would you like to know more?",
    "explain your architecture": "The full version of this chatbot uses a sophisticated architecture with Llama 3.2 for language processing, Neo4j for storing and querying data in a graph structure, and vector embeddings for semantic search. This architecture has been implemented professionally and is also demonstrated in a movie database demo. Would you like to know how these technologies work together?",
    "what technologies do you use": "The full version uses Llama 3.2 for language processing, Neo4j for graph database storage, and vector embeddings for semantic search. These technologies have been implemented professionally and are also showcased in a movie database demo. Would you like to know more?",
    "tell me about the full version": "The full version of this chatbot uses Llama 3.2 for natural language processing, Neo4j graph database for storing and querying data, and vector embeddings for semantic search. This system has been implemented professionally and is also demonstrated in a movie database demo. Would you like to know more?",
    "what is a graph database": "A graph database like Neo4j stores data in nodes and relationships, making it perfect for representing complex connections. It's been used professionally to model relationships between entities and is also demonstrated in a movie database demo. Would you like to know more?",
    "what are vector embeddings": "Vector embeddings are numerical representations of text that capture semantic meaning. They allow the chatbot to understand the similarity between different concepts and provide more relevant responses. This technology has been implemented professionally and is also demonstrated in a movie database demo. Would you like to know more?",
    "how does the full version work": "The full version combines Llama 3.2 for understanding natural language, Neo4j for storing and querying data in a graph structure, and vector embeddings for semantic search. This architecture has been implemented professionally and is also demonstrated in a movie database demo. Would you like to know more?",
    "tell me about the financial firm project": "Sam built a sophisticated LLM chatbot for a financial firm, using Llama 3.2, Neo4j graph database, and vector embeddings to provide intelligent responses and automate complex queries. This implementation demonstrated the practical application of these technologies in a professional environment. Would you like to know more about the specific technologies used?",
    "where can i see more demos": "You can check out Sam's GitHub repository at https://github.com/samrutan21/llm-bot-python to see the movie database retrieval demo, which showcases the same technologies used in professional implementations. Would you like to know more?",
    "what's on your github": "Sam's GitHub repository (https://github.com/samrutan21/llm-bot-python) contains the movie database retrieval demo, which showcases the same technologies (Llama 3.2, Neo4j, and vector embeddings) that have been implemented professionally. Would you like to know more?"
}

# Default responses for unknown queries
DEFAULT_RESPONSES = [
    "I'm a demo chatbot that can tell you about Sam's experience with LLM chatbots and their professional implementation. Try asking 'What are you?' or 'Tell me about yourself'.",
    "I can explain how Sam has implemented graph databases and vector embeddings professionally. Try asking 'What technologies do you use?' or 'Tell me about the implementation'.",
    "Sam has implemented advanced AI technologies professionally. Ask me about the implementation, capabilities, or specific technologies used.",
    "I'm here to showcase Sam's experience with building sophisticated chatbots. Try asking about the technologies used, how it works, or the professional implementation."
]

def get_response(message: str) -> str:
    """Get a response based on the user's message."""
    message = message.lower().strip()
    
    # Check if we have a direct match in the knowledge base
    if message in KNOWLEDGE_BASE:
        return KNOWLEDGE_BASE[message]
    
    # Check for partial matches and natural follow-ups
    if any(phrase in message for phrase in ["tell me more", "more about", "more info", "more details"]):
        return "The full version uses Llama 3.2 for language processing, Neo4j for graph database storage, and vector embeddings for semantic search. These technologies have been implemented professionally and are also showcased in a movie database demo. Would you like to know about the professional implementation?"
    
    if any(phrase in message for phrase in ["professional", "implementation", "where was it used", "where was this used"]):
        return "Sam built a sophisticated LLM chatbot for a financial firm, using Llama 3.2, Neo4j graph database, and vector embeddings to provide intelligent responses and automate complex queries. This implementation demonstrated the practical application of these technologies in a professional environment. Would you like to know more about the specific technologies used?"
    
    if any(phrase in message for phrase in ["technologies", "tech", "what do you use", "what's used"]):
        return "The full version uses Llama 3.2 for language processing, Neo4j for graph database storage, and vector embeddings for semantic search. These technologies have been implemented professionally and are also showcased in a movie database demo. Would you like to know more about how they work together?"
    
    if any(phrase in message for phrase in ["how does it work", "how do they work", "work together", "how they work"]):
        return "The full version combines Llama 3.2 for understanding natural language, Neo4j for storing and querying data in a graph structure, and vector embeddings for semantic search. This architecture has been implemented professionally and is also demonstrated in a movie database demo. Would you like to know more about any specific component?"
    
    if any(phrase in message for phrase in ["component", "specific part", "specific technology"]):
        return "The system has three main components: Llama 3.2 for natural language understanding, Neo4j for graph-based data storage, and vector embeddings for semantic search. Each component plays a crucial role in the system's functionality. Would you like to know more about any of these specifically?"
    
    if any(phrase in message for phrase in ["llama", "language model", "language processing"]):
        return "Llama 3.2 is a powerful language model that enables the chatbot to understand and generate natural language responses. It's particularly effective at understanding complex queries and providing relevant answers. Would you like to know about the other components?"
    
    if any(phrase in message for phrase in ["neo4j", "graph", "database"]):
        return "Neo4j is a graph database that stores data in nodes and relationships, making it perfect for representing complex connections. It's been used professionally to model relationships between entities and is also demonstrated in a movie database demo. Would you like to know about the other components?"
    
    if any(phrase in message for phrase in ["vector", "embeddings", "semantic"]):
        return "Vector embeddings are numerical representations of text that capture semantic meaning. They allow the chatbot to understand the similarity between different concepts and provide more relevant responses. This technology has been implemented professionally and is also demonstrated in a movie database demo. Would you like to know about the other components?"
    
    # Check for partial matches in the knowledge base
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