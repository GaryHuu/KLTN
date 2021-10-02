import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router';
import CartEmpty from './components/CartEmpty';
import CartHeader from './components/CartHeader';
import CartLocationConfirm from './components/CartLocationConfirm';
import CartProductList from './components/CartProductList';
import CartTotal from './components/CartTotal';
import PaymentSuccess from './components/PaymentSuccess';

function Cart() {
  const isCartEmpty = false;
  const isLogged = true;
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (isLogged) return;
    // history.push('/');
  }, [isLogged]);

  return (
    <section className='cart'>
      <div className='container'>
        <div className='cart__left'>
          <Switch>
            <Route path={`${url}`} exact>
              <CartHeader />
              {isCartEmpty ? <CartEmpty /> : <CartProductList />}
            </Route>
            <Route path={`${url}/confirm`} exact>
              <CartLocationConfirm />
            </Route>
            <Route path={`${url}/success`} exact>
              <PaymentSuccess />
            </Route>
          </Switch>
        </div>
        <div className='cart__right'>{isCartEmpty || <CartTotal />}</div>
      </div>
    </section>
  );
}

export default Cart;
