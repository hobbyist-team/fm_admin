import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const renderApp = () => {
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app'),
  );
};

renderApp();
