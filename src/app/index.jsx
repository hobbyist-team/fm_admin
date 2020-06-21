import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchPage from './components/searchPage';
import Navbar from './components/navbar';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" component={SearchPage} exact />
    </Switch>
  </BrowserRouter>
);

export default App;
