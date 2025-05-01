import React from 'react';

const ChatInterface = () => {
  return (
    <div style={{
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '24px',
      height: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        color: '#fff', 
        fontSize: '24px',
        marginBottom: '16px'
      }}>
        Coming Soon
      </h3>
      <p style={{ 
        color: '#888',
        maxWidth: '400px',
        lineHeight: '1.6'
      }}>
        An AI-powered chatbot project is currently under development. Check back soon for updates!
      </p>
    </div>
  );
};

export default ChatInterface; 