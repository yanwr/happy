import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DashboardPage from '../pages/Dashboard';
import LandingPage from '../pages/Landing';
import OrphanagePage from '../pages/Orphanage';
import CreateOrphanagePage from '../pages/CreateOrphanage';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/orphanage/create" exact component={CreateOrphanagePage} />
        <Route path="/orphanage/:id" exact component={OrphanagePage} />
      </Switch>
    </BrowserRouter>
  );
};
