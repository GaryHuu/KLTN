import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import HeaderAdmin from './components/HeaderAdmin';
import SidebarAdmin from './components/SidebarAdmin';
import AdminProduct from './components/AdminProduct/index';

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
            <Route path={`${path}/product`} component={AdminProduct} />
            <Route />
          </Switch>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;
