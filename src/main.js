import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// CONTENT
import './_content/main.scss';

const renderApp = () => {
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app'),
  );
};

renderApp();
