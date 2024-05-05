import React from 'react';
import ReactGA from 'react-ga4';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import {createRoot} from "react-dom/client";

const gaOptions = {
  trackingId: 'G-CKW6YE8TME',
  gaOptions: {
    siteSpeedSampleRate: 100,
  },
  gaTagOptions: {
    send_page_view: true,
  },
};

ReactGA.initialize([gaOptions]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
