import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard';

import LandingPage from '../pages/Landing';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/dashboard" exact component={DashboardPage} />
      </Switch>
    </BrowserRouter>
  );
};
