import ProductPromotion from 'features/Product/components/ProductPromotion';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FavoriteProduct from './components/FavoriteProduct';
import SideBarUser from './components/SideBarUser';
import UserInfomation from './components/UserInformation';
import UserLocation from './components/UserLocation';

function User(props) {
  const match = useRouteMatch();
  console.log(match);
  return (
    <div className='user'>
      <div className='container'>
        <div className='user__content'>
          <div className='user__left'>
            <SideBarUser />
            <ProductPromotion />
          </div>
          <div className='user__right'>
            <div className='user-main'>
              <div className='user-header'>THÔNG TIN TÀI KHOẢN</div>
              <Switch>
                <Route path={match.url} exact component={UserInfomation} />
                <Route
                  path={`${match.url}/favorite`}
                  exact
                  component={FavoriteProduct}
                />
                <Route
                  path={`${match.url}/location`}
                  exact
                  component={UserLocation}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
