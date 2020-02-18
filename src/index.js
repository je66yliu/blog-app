import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import particlesOptions from './particlesOptions.json';
import 'tachyons';

ReactDOM.render(
    <BrowserRouter>
        <Particles style={{ position: 'fixed', zIndex: -1 }} className='particles' params={particlesOptions} />
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
