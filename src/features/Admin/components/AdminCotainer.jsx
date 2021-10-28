import React from 'react';
import AdminLogin from './AdminLogin';
import { useSelector } from 'react-redux';

function AdminCotainer(props) {
  const admin = useSelector((state) => state.admin.current);
  return admin ? <div>AdminCotainer</div> : <AdminLogin />;
}

export default AdminCotainer;
