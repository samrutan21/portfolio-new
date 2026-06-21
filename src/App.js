import React, { useState } from 'react';
import './App.css';
import headshot from './images/samrutan-headshot-1.jpg';
import fullMoonImage from './images/Full_Moon_Homepage_Pic.png';

// Web3Forms access key. Get yours (free) at https://web3forms.com by entering
// your email; they email you a key. Submissions are delivered to that email.
const WEB3FORMS_ACCESS_KEY = '534895b4-0ed7-40e0-85fb-4aff48649010';

// Collapsible Category Component
const CollapsibleCategory = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New message from your portfolio site',
          from_name: 'Portfolio Contact Form',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Web3Forms error:', result);
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
                }}>Assistant Editor</p>
                
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
                <a
                  href="/portfolio-new/Sam_Rutan_Resume_Editorial.pdf"
                  download="Sam_Rutan_Resume_Editorial.pdf"
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.5)',
                    color: 'white',
                    padding: '12px 32px',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  Download Resume
                </a>
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
                  defaultOpen
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
                          src="https://player.vimeo.com/video/1203108979"
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

                      <div style={{ marginTop: '24px' }}>
                        <a
                          href="https://www.imdb.com/name/nm9081983/"
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
                          View on IMDb →
                        </a>
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
                            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>Premiere & After Effects LLM Assistant</h3>
                            <p style={{ color: '#999', marginBottom: '16px', lineHeight: '1.6' }}>
                              An Adobe extension for Premiere and After Effects that integrates AI language models directly into your creative workflow. Connect to OpenAI, Anthropic, Google Gemini, or locally-hosted LLMs to get intelligent, context-aware suggestions, generate custom expressions on demand, and streamline complex animations — without leaving Premiere or After Effects. 700+ downloads on Adobe Exchange.
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
                                Premiere & After Effects
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
                { name: 'YOUTUBE', year: '2026' },
                { name: 'MLB', year: '2026' },
                { name: 'NETFLIX', year: '2023' },
                { name: 'DISNEY+', year: '2021-2022' },
                { name: 'AMAZON', year: '2019-2020' },
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
                    I'm Sam Rutan, an Assistant Editor based in New Jersey. I specialize in documentary feature and episodic, with credits on projects for Disney+, Amazon Prime, and Netflix.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc', marginBottom: '24px' }}>
                    My work spans high-profile music documentaries, sports docs, and character-driven stories — including Assistant Editor on We Are Osos (YouTube, 2026), Lead Assistant Editor on Olivia Rodrigo: driving home 2 u (Disney+), Assistant Editor on Mary J. Blige's My Life (Amazon Prime), Rather (2023), and Homecoming: The Tokyo Series (2026).
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc', marginBottom: '24px' }}>
                    I'm passionate about the craft of post production and the technology that powers it — including tools I've built myself, like an AI-powered Adobe Premiere and After Effects extension with 700+ downloads on Adobe Exchange.
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
                        <li style={{ marginBottom: '8px' }}>Adobe Premiere</li>
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '16px', fontSize: '18px' }}>Creative Technology</h4>
                      <ul style={{ color: '#999', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '8px' }}>Adobe Premiere & After Effects Extension Development</li>
                        <li style={{ marginBottom: '8px' }}>AI Filmmaking</li>
                        <li style={{ marginBottom: '8px' }}>Sound Design</li>
                        <li style={{ marginBottom: '8px' }}>Music Production</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Experience */}
                <div style={{ marginTop: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>EXPERIENCE</h3>
                    <a
                      href="/portfolio-new/Sam_Rutan_Resume_Editorial.pdf"
                      download="Sam_Rutan_Resume_Editorial.pdf"
                      style={{
                        background: 'none',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        padding: '8px 16px',
                        fontSize: '12px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        display: 'inline-block'
                      }}
                    >
                      Download Resume
                    </a>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '16px' 
                  }}>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>We Are Osos</h4>
                        <span style={{ color: '#666' }}>IN POST · 2026</span>
                      </div>
                      <p style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>Supper Club · Mortal Media · YouTube</p>
                      <p style={{ color: '#999', fontSize: '14px' }}>Assistant Editor · Osos Monterrey, owned by Ryan Kalil &amp; Blake Griffin</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Homecoming: The Tokyo Series</h4>
                        <span style={{ color: '#666' }}>2026</span>
                      </div>
                      <p style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>Supper Club · MLB Studios · CNN Films</p>
                      <p style={{ color: '#999', fontSize: '14px' }}>Assistant Editor · 2025 MLB Tokyo Series</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Rather</h4>
                        <span style={{ color: '#666' }}>2023</span>
                      </div>
                      <p style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>Wavelength · Netflix</p>
                      <p style={{ color: '#999', fontSize: '14px' }}>Assistant Editor · Dan Rather feature documentary</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Olivia Rodrigo: driving home 2 u</h4>
                        <span style={{ color: '#666' }}>2022</span>
                      </div>
                      <p style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>Supper Club · Disney+</p>
                      <p style={{ color: '#999', fontSize: '14px' }}>Lead Assistant Editor · music documentary</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Mary J. Blige's My Life</h4>
                        <span style={{ color: '#666' }}>2021</span>
                      </div>
                      <p style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>eOne · Amazon Prime</p>
                      <p style={{ color: '#999', fontSize: '14px' }}>Assistant Editor · music documentary</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Branded &amp; Commercial Work</h4>
                        <span style={{ color: '#666' }}>2018–2020</span>
                      </div>
                      <p style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>Whitehouse Post</p>
                      <p style={{ color: '#999', fontSize: '14px' }}>Assistant Editor · editorial support &amp; media management, leading post house</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>The Girl and the Picture</h4>
                        <span style={{ color: '#666' }}>2018</span>
                      </div>
                      <p style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>Cause &amp; Affect Media · USC Shoah Foundation</p>
                      <p style={{ color: '#999', fontSize: '14px' }}>Assistant Editor · award-winning documentary short</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Daughters of Destiny</h4>
                        <span style={{ color: '#666' }}>2017</span>
                      </div>
                      <p style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>Cause &amp; Affect Media · Netflix</p>
                      <p style={{ color: '#999', fontSize: '14px' }}>Post-Production Assistant · episodic international doc series</p>
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
