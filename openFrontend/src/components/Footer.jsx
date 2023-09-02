// Footer.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import makeStyles from  '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'green', 
    width: '100%',
    position: 'relative', 
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.footer}>
      <Container className={classes.container}>
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy; {new Date().getFullYear()} Your Company Name
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;

