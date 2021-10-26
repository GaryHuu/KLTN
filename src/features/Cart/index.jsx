import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import CartEmpty from './components/CartEmpty';
import CartHeader from './components/CartHeader';
import CartLocationConfirm from './components/CartLocationConfirm';
import CartProductList from './components/CartProductList';
import CartTotal from './components/CartTotal';
import PaymentSuccess from './components/PaymentSuccess';
import { cartItemsCountSelector } from './selector';

function Cart() {
  const countCart = useSelector(cartItemsCountSelector);
  const isLoggedIn = true;
  const { url } = useRouteMatch();
  return (
    <>
      {!isLoggedIn ? (
        <Redirect to='/' />
      ) : (
        <section className='cart'>
          <div className='container'>
            <div className='cart__left'>
              <Switch>
                <Route path={`${url}`} exact>
                  <CartHeader />
                  {countCart <= 0 ? <CartEmpty /> : <CartProductList />}
                </Route>
                <Route path={`${url}/confirm`} exact>
                  <CartLocationConfirm />
                </Route>
                <Route path={`${url}/success`} exact>
                  <PaymentSuccess />
                </Route>
              </Switch>
            </div>

            {countCart <= 0 || (
              <div className='cart__right'>
                <CartTotal />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Cart;
