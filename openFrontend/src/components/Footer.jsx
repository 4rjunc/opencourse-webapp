import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const footerStyle = {
  backgroundColor: '#228B22',
  width: '100%',
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 999,
  transition: 'bottom 0.3s', // Add a smooth transition for the footer
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

const textStyle = {
  marginBottom: '6px',
};

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Remove the scroll event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    setShowFooter(isAtBottom);
  };

  return (
    <AppBar position="static" style={{ ...footerStyle, bottom: showFooter ? 0 : -100 }}>
      <Container>
        <Toolbar style={contentStyle}>
          <Typography variant="body1" color="inherit" style={textStyle}>
            Nehru Arts and Science College Kanhangad
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
