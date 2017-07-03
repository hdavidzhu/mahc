import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListPage from '../ListPage';

const Main = () => (
  <main>
    <Switch>
      {/* <Route exact path='/' component={HomePage} /> */}
      <Route path='/list' component={ListPage} />
      {/* <Route path='/map' component={MapPage} /> */}
    </Switch>
  </main>
);

export default Main;
