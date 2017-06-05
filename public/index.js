require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Results from './components/Results';



document.addEventListener('DOMContentLoaded', () =>     ReactDOM.render(<Header />, document.getElementById('reactHeader'))
);

document.addEventListener('DOMContentLoaded', () =>      ReactDOM.render(
    <div>
        <Results />
    </div>,
    document.getElementById('reactResults'))
);





