import { Table } from 'antd';
import React, { Fragment } from 'react';

function AdminTable(props) {
  const { columns, data, loading } = props;
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{pageSize: 6, showSizeChanger: false}}
        bordered
      />
    </Fragment>
  );
}

export default AdminTable;
