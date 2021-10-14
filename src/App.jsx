import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Cart from 'features/Cart';
import Home from 'features/Home';
import Product from 'features/Product';
import User from 'features/User';
import NotFound from 'features/NotFound';
import Admin from 'features/Admin';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path='/admin' component={Admin} />
        <Route>
          <Header />
          <main>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/home' component={Home} />
              <Route path='/cart' component={Cart} />
              <Route path='/product' component={Product} />
              <Route path='/user' component={User} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
