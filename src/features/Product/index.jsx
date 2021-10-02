import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProductDetailPage from './page/ProductDetailPage';
import ProductNotFound from './page/ProductNotFound';
import ProductPage from './page/ProductPage';

function Product() {
  const path = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={path.url} exact component={ProductPage} />
        <Route path={`${path.url}/:id`} exact component={ProductDetailPage} />
        <Route component={ProductNotFound} />
      </Switch>
    </>
  );
}

export default Product;
