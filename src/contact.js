import React from 'react';
import { hydrate, render } from 'react-dom';
import Contact from './roots/Contact';
import './style/main.scss';

const rootElement = document.getElementById('root1');

if (rootElement.hasChildNodes()) {
    hydrate(<Contact />, rootElement);
} else {
    render(<Contact />, rootElement);
}
