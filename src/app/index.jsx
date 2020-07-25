import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchPage from './components/searchPage';
import FMStation from './components/fm';
import Navbar from './components/navbar';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" component={SearchPage} exact />
      <Route path="/fm" component={FMStation} />
    </Switch>
  </BrowserRouter>
);

const WrappedApp = () => (
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);

export default WrappedApp;
