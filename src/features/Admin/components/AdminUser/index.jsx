import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import adminApi from 'api/adminApi';
import { useDispatch } from 'react-redux';
import { adminLogout } from 'features/Admin/adminSlice';
import { Button, Input } from 'antd';
import withLoading from 'components/HOC/withLoading';
import AdminTable from 'features/Admin/common/AdminTable';

function AdminUser(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  const mapData = (data) => {
    const newData = data.map((item) => ({
      email: item.email,
      id: item.id,
      name: item.name,
      phone: item.phone,
      birthday: item.birthday || 'Chưa cập nhật',
      gender: item.gender || 3,
      address: item.address
        ? item.address.street_name +
          ' ' +
          item.address.ward +
          ' ' +
          item.address.district +
          ' ' +
          item.address.province
        : 'Chưa cập nhật',
    }));
    console.log({ newData });
    setUserList(newData);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUserList();
      if (res.status === 200 && res.success) {
        console.log(res.data);
        res.data && mapData(res.data);
      }
    } catch (error) {
      toast.error('Error');
      dispatch(adminLogout());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteUser = async(id) => {
    try {
      const res = await adminApi.deleteUser(id);
      if(res.status === 200 && res.success === true){
        toast.success('Xóa thành công!');
        fetchData();
      }
    } catch (error) {
      toast.error('Error');
      console.log(error);
    }
  }

  const searchFilterDropdown = (dataIndex) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ padding: 8, width: '450px', display: 'flex' }}>
            <Input
              value={selectedKeys[0]}
              onChange={(e) => {
                return setSelectedKeys(
                  e.target.value ? [e.target.value] : ['']
                );
              }}
              onPressEnter={() => {
                confirm({ closeDropdown: false });
              }}
            />
            <Button
              onClick={() => {
                confirm({ closeDropdown: false });
              }}
            >
              Tìm Kiếm
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
            >
              Reset
            </Button>
          </div>
        );
      },
      onFilter: (value, record) => {
        return record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : '';
      },
    };
  };

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      width: 70,
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      ...searchFilterDropdown('name'),
      width: 250,
    },
    {
      title: 'Sinh Nhật',
      dataIndex: 'birthday',
      key: 'birthday',
      ...searchFilterDropdown('birthday'),
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...searchFilterDropdown('email'),
      width: 250,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      ...searchFilterDropdown('phone'),
      width: 150,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender - b.gender,
      render: (gender) =>
        gender === 0 ? 'Nữ' : gender === 1 ? 'Nam' : 'Chưa cập nhật',
      width: 150,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ...searchFilterDropdown('address'),
      width: 300,
    },
    {
      title: 'Xóa',
      key: 'action',
      render: (i) => (
        <Button onClick={() => handleDeleteUser(i.id)}>
          <i className='fas fa-trash-alt' />
        </Button>
      ),

      width: 150,
    },
  ];
  return (
    <div className='admin-user'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <div
          style={{
            height: '40px',
            textAlign: 'center',
            fontSize: '19px',
            color: '#505050',
            float: 'left',
          }}
        >
          Người dùng
        </div>
        <Button onClick={() => fetchData()} style={{ marginRight: '10px' }}>
          <i className='fas fa-sync'></i>
        </Button>
      </div>
      <AdminTable
        limit={7}
        loading={loading}
        columns={columns}
        data={userList}
      />
    </div>
  );
}

export default withLoading(AdminUser);
