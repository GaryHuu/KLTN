import Footer from 'components/Footer';
import Header from 'components/Header';
import Cart from 'features/Cart';
import Home from 'features/Home';
import Product from 'features/Product';
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/cart' component={Cart} />
          <Route path='/product' component={Product} />
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
