# Codebase Export: portfolio-new

_Generated on 2026-06-12 17:54:57 by export-codebase.sh_

This file contains the complete text source of the project, bundled into a
single document so Claude can understand it in one pass. Binary assets
(images, fonts), lockfiles, and build output are excluded.

## Project structure

```
.gitignore
README.md
chatbot-demo-backend/Dockerfile
chatbot-demo-backend/Procfile
chatbot-demo-backend/main.py
chatbot-demo-backend/requirements.txt
devlog.txt
package.json
public/favicon.ico
public/index.html
public/logo192.png
public/logo512.png
public/manifest.json
public/robots.txt
src/App.css
src/App.js
src/App.test.js
src/components/ChatInterface.js
src/images/Full_Moon_Homepage_Pic.png
src/images/SamRutan_PianoAppTrainer.png
src/images/after_effects_llm_assistant.png
src/images/agentforce-marquee-llms.png
src/images/piano_trainer.png
src/images/revenue_comparison.png
src/images/samrutan-headshot-1.jpg
src/images/visualizer_image.png
src/index.css
src/index.js
src/logo.svg
src/reportWebVitals.js
src/setupTests.js
```

## Source files

### `.gitignore`

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
venv/
.env


```

### `README.md`

```markdown
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```

### `chatbot-demo-backend/Dockerfile`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 
```

### `chatbot-demo-backend/Procfile`

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT 
```

### `chatbot-demo-backend/main.py`

```python
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
    "what are you": "I'm a demo chatbot that showcases Sam's experience with AI, graph databases, and vector embeddings. I'm a simplified version of a professional implementation Sam created for a major financial firm. Would you like to know more about how I work?",
    "who are you": "I'm a demonstration of Sam's expertise in AI and database technologies. I showcase his experience with Large Language Models, graph databases, and vector embeddings, which he implemented professionally for a major financial firm. Would you like to learn more about my capabilities?",
    "tell me about yourself": "I'm a demo chatbot that highlights Sam's professional experience with AI and database technologies. I showcase his work with Large Language Models, graph databases, and vector embeddings, which he implemented for a major financial firm. Would you like to know more about any specific aspect of my implementation?",
    "what can you do": "I can demonstrate Sam's expertise in AI and database technologies. I showcase his professional implementation of Large Language Models, graph databases, and vector embeddings. Would you like to learn more about any specific capability?",
    "what technologies do you use": "I showcase Sam's experience with several key technologies: Large Language Models for natural language understanding, graph databases for efficient knowledge representation, and vector embeddings for semantic search. These are the same technologies Sam implemented professionally for a major financial firm. Would you like to know more about how these technologies work together?",
    "how do you work": "I demonstrate Sam's expertise in AI and database technologies. I use Large Language Models for understanding and generating responses, graph databases for efficient knowledge storage and retrieval, and vector embeddings for semantic search. These are the same technologies Sam implemented professionally for a major financial firm. Would you like to learn more about any specific component?",
    "what makes you special": "I showcase Sam's professional experience with cutting-edge AI and database technologies. I demonstrate his implementation of Large Language Models, graph databases, and vector embeddings, which he developed for a major financial firm. Would you like to know more about my unique features?",
    "tell me about your architecture": "I demonstrate Sam's expertise in AI and database architecture. I showcase his professional implementation of Large Language Models for natural language processing, graph databases for efficient knowledge representation, and vector embeddings for semantic search. These are the same technologies Sam implemented for a major financial firm. Would you like to learn more about any specific component?",
    "what is your purpose": "I'm here to showcase Sam's professional experience with AI and database technologies. I demonstrate his implementation of Large Language Models, graph databases, and vector embeddings, which he developed for a major financial firm. Would you like to learn more about my capabilities?",
    "how were you built": "I was built to demonstrate Sam's expertise in AI and database technologies. I showcase his professional implementation of Large Language Models, graph databases, and vector embeddings, which he developed for a major financial firm. Would you like to know more about my development process?"
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
        return "The full version uses Llama 3.2 for language processing, Neo4j for graph database storage, and vector embeddings for semantic search. These technologies have been implemented professionally. Would you like to know about the professional implementation?"
    
    if any(phrase in message for phrase in ["professional", "implementation", "where was it used", "where was this used"]):
        return "Sam built a sophisticated LLM chatbot for a financial firm, using Llama 3.2, Neo4j graph database, and vector embeddings to provide intelligent responses and automate complex queries. This implementation demonstrated the practical application of these technologies in a professional environment. Would you like to know more about the specific technologies used?"
    
    if any(phrase in message for phrase in ["technologies", "tech", "what do you use", "what's used"]):
        return "The full version uses Llama 3.2 for language processing, Neo4j for graph database storage, and vector embeddings for semantic search. These technologies have been implemented professionally. Would you like to know more about how they work together?"
    
    if any(phrase in message for phrase in ["how does it work", "how do they work", "work together", "how they work"]):
        return "The full version combines Llama 3.2 for understanding natural language, Neo4j for storing and querying data in a graph structure, and vector embeddings for semantic search. This architecture has been implemented professionally. Would you like to know more about any specific component?"
    
    if any(phrase in message for phrase in ["component", "specific part", "specific technology"]):
        return "The system has three main components: Llama 3.2 for natural language understanding, Neo4j for graph-based data storage, and vector embeddings for semantic search. Each component plays a crucial role in the system's functionality. Would you like to know more about any of these specifically?"
    
    if any(phrase in message for phrase in ["llama", "language model", "language processing"]):
        return "Llama 3.2 is a powerful language model that enables the chatbot to understand and generate natural language responses. It's particularly effective at understanding complex queries and providing relevant answers. Would you like to know about the other components?"
    
    if any(phrase in message for phrase in ["neo4j", "graph", "database"]):
        return "Neo4j is a graph database that stores data in nodes and relationships, making it perfect for representing complex connections. It's been used professionally to model relationships between entities. Would you like to know about the other components?"
    
    if any(phrase in message for phrase in ["vector", "embeddings", "semantic"]):
        return "Vector embeddings are numerical representations of text that capture semantic meaning. They allow the chatbot to understand the similarity between different concepts and provide more relevant responses. This technology has been implemented professionally. Would you like to know about the other components?"
    
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
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 
```

### `chatbot-demo-backend/requirements.txt`

```
fastapi==0.109.2
uvicorn==0.27.1
python-dotenv==1.0.0
pydantic==2.6.1
python-multipart==0.0.9
starlette==0.36.3 
```

### `devlog.txt`

```
06082025

Make better logos for the projects
Add the chord website (Make it live somehow)
How can I have the chatbot backend running all the time? 


060925 

Improved project logos 

Added piano website using github pages (backend not available yet)
Removed "Socials"
Email form submission now active


Should I have backend running all the time for portfolio and piano? 
Add more language about LLMs/Vector embeddings/RAG for the chatbot
Update the music visualizer to have a live demo button similar to piano


```

### `package.json`

```json
{
  "name": "portfolio-new",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://samrutan.github.io/portfolio-new",
  "dependencies": {
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^13.5.0",
    "gh-pages": "^6.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

### `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Professional portfolio website created with React"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
    <title>Portfolio</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### `public/manifest.json`

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

### `public/robots.txt`

```
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

```

### `src/App.css`

```css
.text-stroke {
  -webkit-text-stroke: 1px white;
  color: transparent;
}

@media (min-width: 768px) {
  .text-stroke {
    -webkit-text-stroke: 1.5px white;
  }
}


```

### `src/App.js`

```javascript
import React, { useState } from 'react';
import './App.css';
import headshot from './images/samrutan-headshot-1.jpg';
import fullMoonImage from './images/Full_Moon_Homepage_Pic.png';

// Collapsible Category Component
const CollapsibleCategory = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ borderBottom: '1px solid #333' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '24px 0',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {title}
        <span style={{
          transform: isOpen ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s ease',
          fontSize: '32px',
          fontWeight: 'lighter'
        }}>
          {isOpen ? '×' : '+'}
        </span>
      </button>
      
      <div 
        style={{
          maxHeight: isOpen ? '4000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s ease',
        }}
      >
        {content}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const sections = ['home', 'work', 'about', 'contact'];

  // Navigation handler
  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('https://formspree.io/f/xnnvpobj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'black', 
      color: 'white', 
      fontFamily: 'sans-serif',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        width: '100%',
        padding: '24px',
        zIndex: 40,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>Sam Rutan</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav style={{
            display: 'flex',
            gap: '48px'
          }}>
            {sections.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontSize: '14px',
                  color: activeSection === item ? 'white' : '#888',
                  transition: 'color 0.3s'
                }}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Home Section */}
        {activeSection === 'home' && (
          <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 24px',
            position: 'relative'
          }}>
            {/* Original content - unchanged */}
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              paddingTop: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px'
            }}>
              <img 
                src={fullMoonImage} 
                alt="Full Moon" 
                style={{
                  width: '400px',
                  height: 'auto',
                  objectFit: 'cover'
                }}
              />
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <p style={{
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '16px'
                }}>Assistant Editor | Documentary & Music Film</p>
                
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  lineHeight: '1.2',
                  marginBottom: '16px'
                }}>
                  TELLING<br />
                  <span className="text-stroke">STORIES</span><br />
                  THAT MATTER
                </h1>
                
                <p style={{
                  maxWidth: '500px',
                  color: '#999',
                  fontSize: '18px',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}>
                  Post production professional with credits on Disney+, Amazon Prime, and Netflix. Based in New Jersey.
                </p>
                
                <button 
                  style={{
                    background: 'none',
                    border: '1px solid white',
                    color: 'white',
                    padding: '12px 32px',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleNavClick('work')}
                >
                  View Work
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Work Section */}
        {activeSection === 'work' && (
          <section style={{
            minHeight: '100vh',
            padding: '120px 24px 60px',
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
            }}>
              <h2 style={{
                fontSize: '42px',
                fontWeight: 'bold',
                marginBottom: '40px'
              }}>
                SELECTED<br />
                <span className="text-stroke">WORK</span>
              </h2>
              
              {/* Collapsible Work Categories */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                marginBottom: '60px'
              }}>
                <CollapsibleCategory 
                  title="FILM"
                  content={
                    <div style={{ padding: '24px 0' }}>
                      {/* Video Reel Embed */}
                      <div style={{ 
                        marginBottom: '20px',
                        position: 'relative',
                        paddingBottom: '56.25%', /* 16:9 aspect ratio */
                        height: 0,
                        overflow: 'hidden',
                        backgroundColor: '#111'
                      }}>
                        <iframe
                          src="https://player.vimeo.com/video/1080037919?h=0"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                          }}
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Sizzle Reel</h3>
                      <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '24px' }}>
                        A look at the projects I've worked on as an Assistant Editor, spanning music documentary, sports documentary, and character-driven stories for Disney+, Amazon Prime, and Netflix.
                      </p>
                      
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          Documentary
                        </div>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          Assistant Editing
                        </div>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          Post Production
                        </div>
                      </div>
                    </div>
                  }
                />
                
                <CollapsibleCategory 
                  title="TOOLS"
                  content={
                    <div style={{ padding: '40px 0 24px 0' }}>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '32px',
                        marginTop: '24px'
                      }}>
                        {/* After Effects LLM Assistant */}
                        <div style={{
                          backgroundColor: '#111',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>After Effects LLM Assistant</h3>
                            <p style={{ color: '#999', marginBottom: '16px', lineHeight: '1.6' }}>
                              An Adobe After Effects extension that integrates AI language models directly into your creative workflow. Connect to OpenAI, Anthropic, Google Gemini, or locally-hosted LLMs to get intelligent, context-aware suggestions, generate custom expressions on demand, and streamline complex animations — without leaving After Effects. 700+ downloads on Adobe Exchange.
                            </p>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                              <span style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)', 
                                padding: '4px 8px', 
                                fontSize: '12px', 
                                borderRadius: '4px'
                              }}>
                                Adobe CEP
                              </span>
                              <span style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)', 
                                padding: '4px 8px', 
                                fontSize: '12px',
                                borderRadius: '4px'
                              }}>
                                JavaScript
                              </span>
                              <span style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)', 
                                padding: '4px 8px', 
                                fontSize: '12px',
                                borderRadius: '4px'
                              }}>
                                AI Integration
                              </span>
                              <span style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)', 
                                padding: '4px 8px', 
                                fontSize: '12px',
                                borderRadius: '4px'
                              }}>
                                After Effects
                              </span>
                            </div>
                            <a 
                              href="https://exchange.adobe.com/apps/cc/204847" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-block',
                                background: 'none',
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: 'white',
                                padding: '8px 16px',
                                fontSize: '12px',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseOver={(e) => {
                                e.target.style.borderColor = 'white';
                                e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                                e.target.style.backgroundColor = 'transparent';
                              }}
                            >
                              View on Adobe Exchange →
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />

                <CollapsibleCategory 
                  title="AI FILMMAKING"
                  content={
                    <div style={{ padding: '24px 0' }}>
                      <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '24px' }}>
                        Experimental short films created using AI generation tools including Runway, Kling, and Midjourney, combined with traditional post production techniques.
                      </p>

                      {/* AI Film Video 1 */}
                      <div style={{ marginBottom: '40px' }}>
                        <div style={{ 
                          marginBottom: '20px',
                          position: 'relative',
                          paddingBottom: '56.25%', /* 16:9 aspect ratio */
                          height: 0,
                          overflow: 'hidden',
                          backgroundColor: '#111'
                        }}>
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Oe87gqOITvg"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%'
                            }}
                          ></iframe>
                        </div>
                        
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Luxury Wine Brand Spec Ad</h3>
                        <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '24px' }}>
                          A spec advertisement for a luxury wine brand created using AI filmmaking tools.
                        </p>
                      </div>

                      {/* AI Film Video 2 */}
                      <div>
                        <div style={{ 
                          marginBottom: '20px',
                          position: 'relative',
                          paddingBottom: '56.25%', /* 16:9 aspect ratio */
                          height: 0,
                          overflow: 'hidden',
                          backgroundColor: '#111'
                        }}>
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/ZxfpffMxNNc"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%'
                            }}
                          ></iframe>
                        </div>
                        
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Fitness Brand Spec Ad</h3>
                        <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '24px' }}>
                          A spec advertisement for a fitness brand created using AI filmmaking tools.
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          AI Filmmaking
                        </div>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          Runway
                        </div>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          Kling
                        </div>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          Post Production
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>

            {/* Collaborations */}
          <div style={{ marginTop: '80px', borderTop: '1px solid #333', paddingTop: '40px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>COLLABORATIONS</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '24px'
            }}>
              {[
                { name: 'DISNEY+', year: '2021-2022' },
                { name: 'NETFLIX', year: '2023' },
                { name: 'AMAZON', year: '2019-2020' },
                { name: 'MLB', year: '2026' },
                { name: 'WHITEHOUSE POST', year: '2018-2019' }
              ].map(collab => (
                <div key={collab.name} style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{collab.name}</p>
                    <span style={{ color: '#666' }}>{collab.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
        <section style={{
          minHeight: '100vh',
          padding: '120px 24px 60px',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px'
          }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '40px'
            }}>
              ABOUT<br />
              <span className="text-stroke">ME</span>
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '40px',
              alignItems: 'flex-start'
            }}>
              {/* Headshot */}
              <div style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)',
                flexShrink: 0
              }}>
                <img 
                  src={headshot} 
                  alt="Sam Rutan Headshot" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 10%'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                flex: 1
              }}>
                <div>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc', marginBottom: '24px' }}>
                    I'm Sam Rutan, an Assistant Editor based in New Jersey. I specialize in documentary and music film, with credits on projects for Disney+, Amazon Prime, and Netflix.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc', marginBottom: '24px' }}>
                    My work spans high-profile music documentaries, sports docs, and character-driven stories — including Lead Assistant Editor on Olivia Rodrigo: driving home 2 u (Disney+), Assistant Editor on Mary J. Blige's My Life (Amazon Prime), Rather (2023), and Homecoming: The Tokyo Series (2026).
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc', marginBottom: '24px' }}>
                    I'm passionate about the craft of post production and the technology that powers it — including tools I've built myself, like an AI-powered Adobe After Effects extension with 700+ downloads on Adobe Exchange.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc' }}>
                    Currently working at Supper Club, focused on documentary and unscripted content.
                  </p>
                </div>
                
                {/* Skills */}
                <div style={{ marginTop: '40px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>EXPERTISE</h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '24px' 
                  }}>
                    <div>
                      <h4 style={{ marginBottom: '16px', fontSize: '18px' }}>Film & Post Production</h4>
                      <ul style={{ color: '#999', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '8px' }}>Assistant Editing</li>
                        <li style={{ marginBottom: '8px' }}>Post Production Workflow</li>
                        <li style={{ marginBottom: '8px' }}>Documentary</li>
                        <li style={{ marginBottom: '8px' }}>Music Film</li>
                        <li style={{ marginBottom: '8px' }}>Avid Media Composer</li>
                        <li style={{ marginBottom: '8px' }}>Adobe Premiere Pro</li>
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '16px', fontSize: '18px' }}>Creative Technology</h4>
                      <ul style={{ color: '#999', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '8px' }}>Adobe After Effects Extension Development</li>
                        <li style={{ marginBottom: '8px' }}>AI Filmmaking</li>
                        <li style={{ marginBottom: '8px' }}>Sound Design</li>
                        <li style={{ marginBottom: '8px' }}>Music Production</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Experience */}
                <div style={{ marginTop: '40px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>EXPERIENCE</h3>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '16px' 
                  }}>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Assistant Editor</h4>
                        <span style={{ color: '#666' }}>2025 - Present</span>
                      </div>
                      <p style={{ color: '#999' }}>Supper Club</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Assistant Editor</h4>
                        <span style={{ color: '#666' }}>2026</span>
                      </div>
                      <p style={{ color: '#999' }}>Homecoming: The Tokyo Series</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Assistant Editor</h4>
                        <span style={{ color: '#666' }}>2023</span>
                      </div>
                      <p style={{ color: '#999' }}>Rather</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Lead Assistant Editor</h4>
                        <span style={{ color: '#666' }}>2021 - 2022</span>
                      </div>
                      <p style={{ color: '#999' }}>Olivia Rodrigo: driving home 2 u, Disney+</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Assistant Editor</h4>
                        <span style={{ color: '#666' }}>2019 - 2020</span>
                      </div>
                      <p style={{ color: '#999' }}>Mary J. Blige's My Life, Amazon Prime</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Assistant Editor</h4>
                        <span style={{ color: '#666' }}>2018 - 2019</span>
                      </div>
                      <p style={{ color: '#999' }}>Whitehouse Post</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Production Trainee</h4>
                        <span style={{ color: '#666' }}>2018</span>
                      </div>
                      <p style={{ color: '#999' }}>NBA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section style={{
          minHeight: '100vh',
          padding: '120px 24px 60px',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '60px'
            }}>
              LET'S<br />
              <span className="text-stroke">CONNECT</span>
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px'
            }}>
              {/* Contact Info */}
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>CONTACT INFO</h3>
                
                <div style={{ marginBottom: '32px' }}>
                  <p style={{ color: '#999', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Email</p>
                  <p style={{ fontSize: '20px', fontWeight: '500' }}>sam.rutan21@gmail.com</p>
                </div>
                
                <div style={{ marginBottom: '32px' }}>
                  <p style={{ color: '#999', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Based in</p>
                  <p style={{ fontSize: '20px', fontWeight: '500' }}>New Jersey</p>
                </div>
                

              </div>
              
              {/* Contact Form */}
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>GET IN TOUCH</h3>
                
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div style={{
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    border: '1px solid rgba(0, 255, 0, 0.3)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '24px',
                    color: '#00ff00'
                  }}>
                    Thanks for your message! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div style={{
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '24px',
                    color: '#ff0000'
                  }}>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '24px' }}>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name" 
                      required
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address" 
                      required
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        color: formData.projectType ? 'white' : '#999',
                        fontSize: '16px',
                        outline: 'none',
                        appearance: 'none'
                      }}
                    >
                      <option value="" disabled style={{ background: 'black' }}>Project Type</option>
                      <option value="design" style={{ background: 'black' }}>Design Project</option>
                      <option value="development" style={{ background: 'black' }}>Development Project</option>
                      <option value="consultation" style={{ background: 'black' }}>Consultation</option>
                      <option value="other" style={{ background: 'black' }}>Other</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: '32px' }}>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message" 
                      rows="4"
                      required
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #333',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: 'none',
                      border: '1px solid white',
                      color: isSubmitting ? '#666' : 'white',
                      padding: '12px 32px',
                      fontSize: '14px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      opacity: isSubmitting ? 0.6 : 1
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  </div>
);
};

export default Portfolio;

```

### `src/App.test.js`

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

### `src/components/ChatInterface.js`

```javascript
import React, { useState, useEffect, useRef } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm a demo chatbot that can tell you about Sam's experience with LLM chatbots. Try asking 'What are you?' or 'Tell me about yourself'.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://portfolio-chat-backend-6cnb.onrender.com';
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '24px',
      height: '500px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(255,255,255,0.3)',
          },
        }
      }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              maxWidth: '80%',
              backgroundColor: message.sender === 'user' 
                ? 'rgba(0, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.1)',
              border: message.sender === 'user'
                ? '1px solid rgba(0, 255, 255, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <p style={{ margin: 0, color: '#fff' }}>{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <p style={{ margin: 0, color: '#fff' }}>Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about the chatbot..."
          style={{
            flex: 1,
            padding: '12px 16px',
            backgroundColor: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface; 
```

### `src/index.css`

```css
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: black;
  color: white;
}

* {
  box-sizing: border-box;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
html {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

```

### `src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Portfolio from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);

reportWebVitals();
```

### `src/reportWebVitals.js`

```javascript
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```

### `src/setupTests.js`

```javascript
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```

