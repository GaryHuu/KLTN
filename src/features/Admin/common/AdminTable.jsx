import { Table } from 'antd';
import React, { Fragment } from 'react';

function AdminTable(props) {
  const { columns, data, loading, limit = 6 } = props;
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{pageSize: limit, showSizeChanger: false}}
        bordered
      />
    </Fragment>
  );
}

export default AdminTable;
