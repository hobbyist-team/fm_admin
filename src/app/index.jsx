import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchPage from './components/searchPage';
import FM from './components/fm';
import Navbar from './components/navbar';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" component={SearchPage} exact />
      <Route path="/add" component={FM} />
    </Switch>
  </BrowserRouter>
);

const WrappedApp = () => (
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);

export default WrappedApp;
