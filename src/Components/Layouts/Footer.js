import React from 'react';
import './Footer.css';

const Footer = props => (
  <div className="footer">
    <footer> <small>&copy; Copyright { props.currentYear }, {props.developer} </small> </footer>
  </div>
);

export default Footer
