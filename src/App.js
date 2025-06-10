import React, { useState } from 'react';
import './App.css';
import headshot from './images/samrutan-headshot-1.jpg';
import salesGraph from '/Users/samrutan/portfolio-new/src/images/revenue_comparison.png';
import llmBotImage from './images/agentforce-marquee-llms.png';
import fullMoonImage from './images/Full_Moon_Homepage_Pic.png';
import visualizerImage from './images/visualizer_image.png';
import afterEffectsImage from './images/after_effects_llm_assistant.png';
import pianoTrainerImage from './images/piano_trainer.png';
import ChatInterface from './components/ChatInterface';

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
          maxHeight: isOpen ? '2000px' : '0',
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
                }}>Multi-Disciplinary Problem Solver</p>
                
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  lineHeight: '1.2',
                  marginBottom: '16px'
                }}>
                  DEFINE<br />
                  <span className="text-stroke">THE</span><br />
                  FUTURE
                </h1>
                
                <p style={{
                  maxWidth: '500px',
                  color: '#999',
                  fontSize: '18px',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}>
                  A creative professional with a diverse skill set, uncovering new solutions to old problems.
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
                      
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Editor's Reel 2024</h3>
                      <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '24px' }}>
                        A collection of my recent editorial work showcasing narratives across commercial and independent projects.
                        Exploring themes of human connection and visual storytelling through cinematic language and performance.
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
                          Directing
                        </div>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          Editing
                        </div>
                        <div style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          padding: '8px 16px', 
                          fontSize: '14px', 
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px'
                        }}>
                          Cinematography
                        </div>
                      </div>
                    </div>
                  }
                />
                
                <CollapsibleCategory 
                  title="MUSIC"
                  content={
                    <div style={{ padding: '24px 0' }}>
                      {/* Music Video 1 */}
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
                            src="https://www.youtube.com/embed/5xeYmON6sKA"
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
                        
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Original Song + Visualizer</h3>
                        <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '24px' }}>
                          An original electronic music piece showcasing my composition and production skills.
                          Visualizer created using a blend of AI tools such as Midjourney and Runway with traditional post production techniques using the Adobe Suite.
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
                            Composition
                          </div>
                          <div style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            padding: '8px 16px', 
                            fontSize: '14px', 
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderRadius: '4px'
                          }}>
                            Production
                          </div>
                          <div style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            padding: '8px 16px', 
                            fontSize: '14px', 
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderRadius: '4px'
                          }}>
                            Sound Design
                          </div>
                        </div>
                      </div>

                      {/* Music Video 2 */}
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
                            src="https://www.youtube.com/embed/GiY9AHeqxhA"
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
                        
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>AI Generated Music</h3>
                        <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '24px' }}>
                          A song generated using Suno. Visualizer created using a blend of Midjourney and Vizzy.
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
                            AI Music Generation
                          </div>
                          <div style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            padding: '8px 16px', 
                            fontSize: '14px', 
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderRadius: '4px'
                          }}>
                            Tastemaking
                          </div>
                          <div style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            padding: '8px 16px', 
                            fontSize: '14px', 
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderRadius: '4px'
                          }}>
                            Visuals
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
                
                <CollapsibleCategory 
                title="SOFTWARE DEVELOPMENT" 
                content={
                  <div style={{ padding: '40px 0 24px 0' }}>
                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                      gap: '32px',
                      marginTop: '24px'
                    }}>
                      {/* Project 1 - After Effects LLM Assistant */}
                      <div style={{
                        backgroundColor: '#111',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ aspectRatio: '16/9' }}>
                          <img 
                            src={afterEffectsImage}
                            alt="After Effects LLM Assistant Extension" 
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              backgroundColor: '#0a0a0a'
                            }}
                          />
                        </div>
                        <div style={{ padding: '24px' }}>
                          <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>After Effects LLM Assistant</h3>
                          <p style={{ color: '#999', marginBottom: '16px', lineHeight: '1.6' }}>
                            A revolutionary Adobe After Effects extension that seamlessly integrates cutting-edge AI assistance directly into your creative workflow. Connect to OpenAI's GPT models, Anthropic's Claude, Google's Gemini, or your own locally-hosted LLMs to transform how you approach motion graphics and visual effects. Instead of spending countless hours researching techniques, troubleshooting expressions, or hunting for tutorials, creators can now focus entirely on bringing their artistic visions to life. The extension provides intelligent, context-aware suggestions for complex animations, generates custom expressions on demand, offers real-time problem-solving guidance, and streamlines the creative process from concept to completion. This tool represents the future of creative software integration—where artificial intelligence amplifies human creativity rather than replacing it.
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
                              OpenAI API
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              Claude API
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              Gemini API
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              Local LLMs
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Project 2 - LLM Knowledge Search ChatBot */}
                      <div style={{
                        backgroundColor: '#111',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ aspectRatio: '16/9' }}>
                          <img 
                            src={llmBotImage}
                            alt="LLM Bot Python Project" 
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              backgroundColor: '#0a0a0a'
                            }}
                          />
                        </div>
                        <div style={{ padding: '24px' }}>
                          <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>LLM Knowledge Search ChatBot</h3>
                          <p style={{ color: '#999', marginBottom: '16px', lineHeight: '1.6' }}>
                            A Python-based chatbot leveraging Large Language Models to provide intelligent responses and automate tasks. Features include natural language processing, context awareness, and a graph database implementation for efficient knowledge representation and retrieval.
                          </p>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px', 
                              borderRadius: '4px'
                            }}>
                              Python
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              LLM
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              Graph DB
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              NLP
                            </span>
                          </div>
                          
                          {/* Interactive Demo */}
                          <div style={{ marginTop: '20px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#ccc' }}>
                              Try it out:
                            </h4>
                            <div style={{
                              backgroundColor: '#0a0a0a',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              border: '1px solid #333'
                            }}>
                              <ChatInterface />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project 3 - Piano Trainer */}
                      <div style={{
                        backgroundColor: '#111',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ aspectRatio: '16/9' }}>
                          <a 
                            href="https://samrutan21.github.io/PianoTrainer/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'block', width: '100%', height: '100%' }}
                          >
                            <img 
                              src={pianoTrainerImage}
                              alt="Piano Trainer Web Application" 
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                backgroundColor: '#0a0a0a',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease'
                              }}
                              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            />
                          </a>
                        </div>
                        <div style={{ padding: '24px' }}>
                          <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>
                            <a 
                              href="https://samrutan21.github.io/PianoTrainer/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: 'white', textDecoration: 'none' }}
                            >
                              Virtual Piano Trainer
                            </a>
                          </h3>
                          <p style={{ color: '#999', marginBottom: '16px', lineHeight: '1.6' }}>
                            An interactive web application designed to accelerate piano learning through gamified practice sessions. Features rapid-fire chord and scale recognition exercises where users listen to musical patterns and play them back for real-time feedback and scoring. The innovative Song Builder mode allows musicians to capture and arrange chord progressions they discover during practice, transforming learning into creative composition. Built with user experience as the priority, this tool demonstrates how technology can make musical education more engaging and accessible, supporting my mission to enhance creativity through innovative software solutions.
                          </p>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
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
                              Web Audio API
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              MIDI Integration
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              Music Theory
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              UX Design
                            </span>
                          </div>
                          <a 
                            href="https://samrutan21.github.io/PianoTrainer/" 
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
                            Try Live Demo →
                          </a>
                        </div>
                      </div>

                      {/* Project 4 - Music Visualizer */}
                      <div style={{
                        backgroundColor: '#111',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ aspectRatio: '16/9' }}>
                          <img 
                            src={visualizerImage}
                            alt="Music Visualizer Interface" 
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              backgroundColor: '#0a0a0a'
                            }}
                          />
                        </div>
                        <div style={{ padding: '24px' }}>
                          <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>
                            <a 
                              href="https://musicvisualizerv2-i4tgjoyvpir9iiugokss8c.streamlit.app/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: 'white', textDecoration: 'none' }}
                            >
                              Music Visualizer ↗
                            </a>
                          </h3>
                          <p style={{ color: '#999', marginBottom: '16px', lineHeight: '1.6' }}>
                            Real-time audio-reactive animation tool that transforms abstract art into dynamic visuals synchronized with music. Built with Python, Streamlit, and deployed on Streamlit Cloud, featuring advanced audio analysis using librosa for frequency spectrum analysis and beat detection. Implements computer vision effects with OpenCV and NumPy for image manipulation, including pulsing, color shifts, wave distortions, and kaleidoscopic transformations. Features an intuitive web interface with section selection, intensity controls, dual-quality rendering modes, and FFmpeg integration for professional video export. Demonstrates expertise in signal processing, real-time data visualization, computer vision, and creative tool development.
                          </p>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px', 
                              borderRadius: '4px'
                            }}>
                              Python
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              Streamlit
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              OpenCV
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              Audio Analysis
                            </span>
                            <span style={{ 
                              backgroundColor: 'rgba(255,255,255,0.1)', 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              FFmpeg
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
              
              <CollapsibleCategory 
              title="SALES" 
              content={
                <div style={{ padding: '24px 0' }}>
                  {/* Year over Year Sales Graph */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>YEAR OVER YEAR SALES</h3>
                    <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '32px' }}>
                      Consistent growth in sales metrics, demonstrating successful implementation of strategic sales approaches.
                    </p>
                  </div>
                  
                  <div style={{ 
                    width: '100%',
                    marginBottom: '32px',
                    backgroundColor: '#111',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    <div style={{ padding: '24px', aspectRatio: '16/9' }}>
                      <img 
                        src={salesGraph}
                        alt="Year Over Year Sales Growth Graph"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Keep your existing metrics section */}
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '32px',
                    marginTop: '40px'
                  }}>
                    {/* Sales Metric 1 */}
                    <div style={{
                      backgroundColor: '#111',
                      padding: '24px',
                      borderRadius: '8px'
                    }}>
                      <h4 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px' }}>+62%</h4>
                      <p style={{ color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Conversion Rate
                      </p>
                    </div>
                    
                    {/* Sales Metric 2 */}
                    <div style={{
                      backgroundColor: '#111',
                      padding: '24px',
                      borderRadius: '8px'
                    }}>
                      <h4 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px' }}>Over $900k</h4>
                      <p style={{ color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Revenue Generated
                      </p>
                    </div>
                    
                    {/* Sales Metric 3 */}
                    <div style={{
                      backgroundColor: '#111',
                      padding: '24px',
                      borderRadius: '8px'
                    }}>
                      <h4 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px' }}>200+</h4>
                      <p style={{ color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        New Customers
                      </p>
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
                { name: 'CIFC ASSET MANAGEMENT', year: '2025' },
                { name: 'ZOMEDICA', year: '2022-2024' },
                { name: 'NETFLIX', year: '2021-2022' },
                { name: 'DISNEY', year: '2021-2022' },
                { name: 'AMAZON', year: '2020-2021' }
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
                    I'm Sam Rutan, a versatile creative professional based in New York City. My background spans multiple disciplines including Film Production, Software Development, and Business Growth, allowing me to bridge the gap between creative vision and technical execution.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc', marginBottom: '24px' }}>
                    My approach combines strategic thinking with innovative problem-solving. I've worked with brands across various industries to create compelling experiences that connect with audiences and achieve business objectives.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc' }}>
                    When I'm not working, you'll find me exploring new technologies, playing and creating music, or seeking inspiration through travel and cultural experiences.
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
                      <h4 style={{ marginBottom: '16px', fontSize: '18px' }}>Film</h4>
                      <ul style={{ color: '#999', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '8px' }}>Video Editing</li>
                        <li style={{ marginBottom: '8px' }}>Collaboration</li>
                        <li style={{ marginBottom: '8px' }}>Art Direction</li>
                        <li style={{ marginBottom: '8px' }}>Storytelling</li>
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '16px', fontSize: '18px' }}>Technology</h4>
                      <ul style={{ color: '#999', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '8px' }}>Frontend (React, JS)</li>
                        <li style={{ marginBottom: '8px' }}>Backend Architecture (Python, SQL)</li>
                        <li style={{ marginBottom: '8px' }}>Responsive Design</li>
                        <li style={{ marginBottom: '8px' }}>User Friendly Creativity</li>
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '16px', fontSize: '18px' }}>Business Development</h4>
                      <ul style={{ color: '#999', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '8px' }}>Funnel Building</li>
                        <li style={{ marginBottom: '8px' }}>Conversion</li>
                        <li style={{ marginBottom: '8px' }}>Customer Success</li>
                        <li style={{ marginBottom: '8px' }}>Analytics and Research</li>
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
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Software Engineer</h4>
                        <span style={{ color: '#666' }}>2024 - 2025</span>
                      </div>
                      <p style={{ color: '#999' }}>CIFC Asset Management (New York City)</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Territory Sales Manager</h4>
                        <span style={{ color: '#666' }}>2022 - 2024</span>
                      </div>
                      <p style={{ color: '#999' }}>Zomedica Animal Healthcare (Southern California)</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Assistant Video Editor</h4>
                        <span style={{ color: '#666' }}>2016 -2022</span>
                      </div>
                      <p style={{ color: '#999' }}>(Netflix, Amazon, Disney, Whitehouse Post(Advertising), Independent Documentaries/Virtual Reality)</p>
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
                  <p style={{ fontSize: '20px', fontWeight: '500' }}>New York City</p>
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