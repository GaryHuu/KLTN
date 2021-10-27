import React, { useMemo } from 'react';
import {
  Route,
  Switch,
  useLocation,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';

import ProductPromotion from 'features/Product/components/ProductPromotion';

import FavoriteProduct from './components/FavoriteProduct';
import SideBarUser from './components/SideBarUser';
import UserInfomation from './components/UserInformation';
import UserLocation from './components/UserLocation';
import UserOrder from './components/UserOrder';
import { useSelector } from 'react-redux';

function User(props) {
  const isLoggedIn = useSelector((state) => state.user.current);
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  const getTitleHeader = useMemo(() => {
    switch (pathname) {
      case '/user':
        return 'THÔNG TIN TÀI KHOẢN';

      case '/user/location':
        return 'THÔNG TIN ĐỊA CHỈ';

      case '/user/order':
        return 'QUẢN LÝ ĐƠN HÀNG';

      case '/user/favorite':
        return 'SẢN PHẨM YÊU THÍCH';

      default:
        return '';
    }
  }, [pathname]);

  return (
    <>
      {!isLoggedIn ? (
        <Redirect to='/' />
      ) : (
        <div className='user'>
          <div className='container'>
            <div className='user__content'>
              <div className='user__left'>
                <SideBarUser />
                <ProductPromotion />
              </div>
              <div className='user__right'>
                <div className='user-main'>
                  <div className='user-header'>{getTitleHeader}</div>
                  <div className='user-content'>
                    <Switch>
                      <Route path={url} exact component={UserInfomation} />
                      <Route
                        path={`${url}/favorite/`}
                        component={FavoriteProduct}
                      />
                      <Route path={`${url}/order`} component={UserOrder} />
                      <Route
                        path={`${url}/location`}
                        component={UserLocation}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
