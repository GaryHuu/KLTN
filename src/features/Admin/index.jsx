import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import HeaderAdmin from './components/HeaderAdmin';
import SidebarAdmin from './components/SidebarAdmin';
import AdminProduct from './components/AdminProduct';
import AdminOrder from './components/AdminOrder';
import AdminUser from './components/AdminUser';

function AdminPage() {
  const { path } = useRouteMatch();
  const admin = useSelector((state) => state.admin.current);
  if (!admin) return <AdminLogin />;
  return (
    <section className='admin'>
      <HeaderAdmin />
      <div className='wrapper-admin'>
        <SidebarAdmin/>
        <div className='content'>
          <Switch>
            <Route path={`${path}`} exact component={AdminProduct} />
            <Route path={`${path}/products`} component={AdminProduct} />
            <Route path={`${path}/orders`} component={AdminOrder} />
            <Route path={`${path}/users`} component={AdminUser} />
            <Route />
          </Switch>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;
