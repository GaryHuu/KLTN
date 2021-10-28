import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminCotainer from './components/AdminCotainer';
import AdminNotFound from './components/AdminNotFound';

function AdminPage() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact component={AdminCotainer} />
      <Route component={AdminNotFound} />
    </Switch>
  );
}

export default AdminPage;
