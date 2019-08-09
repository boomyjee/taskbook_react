import React from 'react';
import App from './App';
import './styles/index.scss';
import fontLoader from './services/fontLoader';
import { hydrate, render } from "react-dom";
import { initializeStore } from './store';
import { Provider } from 'react-redux';

fontLoader(
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
);

const store = initializeStore();
const rootElement = document.getElementById("root");
const AppWrapper = () => (<Provider store={store}><App /></Provider>);

if (rootElement.hasChildNodes()) {
  hydrate(<AppWrapper />, rootElement);
} else {
  render(<AppWrapper />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// serviceWorker.register();
