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
    "what are you": "I'm a demo chatbot that showcases Sam's experience with AI, graph databases, and vector embeddings. I'm a simplified version of a professional implementation Sam created for a major financial firm. You can also check out his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see these technologies in action. Would you like to know more about how I work?",
    "who are you": "I'm a demonstration of Sam's expertise in AI and database technologies. I showcase his experience with Large Language Models, graph databases, and vector embeddings, which he implemented professionally for a major financial firm. You can explore his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see another example of these technologies. Would you like to learn more about my capabilities?",
    "tell me about yourself": "I'm a demo chatbot that highlights Sam's professional experience with AI and database technologies. I showcase his work with Large Language Models, graph databases, and vector embeddings, which he implemented for a major financial firm. You can also check out his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see these technologies in a different context. Would you like to know more about any specific aspect of my implementation?",
    "what can you do": "I can demonstrate Sam's expertise in AI and database technologies. I showcase his professional implementation of Large Language Models, graph databases, and vector embeddings. You can also explore his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see these technologies in action. Would you like to learn more about any specific capability?",
    "what technologies do you use": "I showcase Sam's experience with several key technologies: Large Language Models for natural language understanding, graph databases for efficient knowledge representation, and vector embeddings for semantic search. These are the same technologies Sam implemented professionally for a major financial firm. You can see them in action in his movie database demo on GitHub (https://github.com/samrutan/llm-bot). Would you like to know more about how these technologies work together?",
    "how do you work": "I demonstrate Sam's expertise in AI and database technologies. I use Large Language Models for understanding and generating responses, graph databases for efficient knowledge storage and retrieval, and vector embeddings for semantic search. These are the same technologies Sam implemented professionally for a major financial firm. You can explore his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see these technologies in action. Would you like to learn more about any specific component?",
    "what makes you special": "I showcase Sam's professional experience with cutting-edge AI and database technologies. I demonstrate his implementation of Large Language Models, graph databases, and vector embeddings, which he developed for a major financial firm. You can also check out his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see these technologies in a different context. Would you like to know more about my unique features?",
    "tell me about your architecture": "I demonstrate Sam's expertise in AI and database architecture. I showcase his professional implementation of Large Language Models for natural language processing, graph databases for efficient knowledge representation, and vector embeddings for semantic search. These are the same technologies Sam implemented for a major financial firm. You can explore his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see this architecture in action. Would you like to learn more about any specific component?",
    "what is your purpose": "I'm here to showcase Sam's professional experience with AI and database technologies. I demonstrate his implementation of Large Language Models, graph databases, and vector embeddings, which he developed for a major financial firm. You can also check out his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see these technologies in a different context. Would you like to learn more about my capabilities?",
    "how were you built": "I was built to demonstrate Sam's expertise in AI and database technologies. I showcase his professional implementation of Large Language Models, graph databases, and vector embeddings, which he developed for a major financial firm. You can explore his movie database demo on GitHub (https://github.com/samrutan/llm-bot) to see these technologies in action. Would you like to know more about my development process?"
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