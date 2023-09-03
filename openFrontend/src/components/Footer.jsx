import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const footerStyle = {
  backgroundColor: 'green', // Set the background color to green
  width: '100vw', // Make the footer full-width of the viewport
  position: 'fixed', // Set the position to fixed
  bottom: 0, // Place the footer at the bottom
  left: 0, 
  height: '3rem',


};

const contentStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center', // Center the content horizontally
  justifyContent: 'center', // Center the content horizontally

};

const textStyle = {
  marginBottom: '16px', // Add margin to create space between Typography components
};

const Footer = () => {
  return (
    <AppBar position="static" style={footerStyle}>
      <Container>
        <Toolbar style={contentStyle}>
          <Typography variant="body1" color="inherit" style={textStyle}>
            Nehru Arts and Science College Padannakad
          </Typography><br/>
          {/*<Typography >
            <h6>Developed By Arjun C and Gopika Krishnan R</h6>
  </Typography>*/}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;


