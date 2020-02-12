import React from 'react';
import { hydrate, render } from 'react-dom';
import Home from './roots/Home';
import './style/main.scss';



const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
    hydrate(<Home />, rootElement);
} else {
    render(<Home />, rootElement);
}
