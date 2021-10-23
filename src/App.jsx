import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Footer from 'components/Footer';
import Header from 'components/Header';
import AdminPage from 'features/Admin';
import Cart from 'features/Cart';
import Home from 'features/Home';
import NotFound from 'features/NotFound';
import Product from 'features/Product';
import User from 'features/User';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path='/admin' component={AdminPage} />
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
