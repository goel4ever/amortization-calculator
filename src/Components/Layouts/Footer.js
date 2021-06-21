import React from 'react';
import './Footer.css';

export default props => (
  <div className="footer">
    <footer> <small>&copy; Copyright { props.currentYear }, {props.developer} </small> </footer>
  </div>
);
