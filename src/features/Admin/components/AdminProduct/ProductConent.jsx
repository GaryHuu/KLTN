import { Button, Input, Tag } from 'antd';
import adminApi from 'api/adminApi';
import { adminLogout } from 'features/Admin/adminSlice';
import AdminTable from 'features/Admin/common/AdminTable';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DeleteProduct from './components/DeleteProduct';
import EditProduct from './components/EditProduct';

function ProductConent(props) {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState([]);
  const dispatch =  useDispatch();

  const mapData = useCallback((data) => {
    const newProductList = data.map((item) => {
      const dataMap = {
        key: item.id,
        id: item.id,
        name: item.name,
        content: item.content.substring(0, 100) + ' ...',
        date_update: item.date_update,
        price: item.price,
        image: item.images[0].url,
        tags: [item.category.name],
        discount: item.discount,
      };
      if (item.feature === 'Yes') dataMap.tags.push('Nổi bật');
      return dataMap;
    });
    setProductList(newProductList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAllProduct();
      if (res.status === 200 && res.success === true) {
        mapData(res.data);
        setData(res.data);
      }
    } catch (error) {
      toast.error('Error');
      dispatch(adminLogout());

    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 150,
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
        return record['name']
          ? record['name']
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : '';
      },
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: 250,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      sorter: (a, b) => {
        let _a;
        let _b;
        if (a.discount === 'No') {
          _a = 0;
        } else {
          _a = parseFloat(a.discount.slice(0, -1));
        }

        if (b.discount === 'No') {
          _b = 0;
        } else {
          _b = parseFloat(b.discount.slice(0, -1));
        }

        return _a - _b;
      },
      width: 120,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <span>
          {price.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      ),
      width: 100,
    },
    {
      title: 'Thời gian',
      dataIndex: 'date_update',
      key: 'date_update',
      width: 150,
      sorter: (a, b) => {
        return a.date_update - b.date_update;
      },
      render: (date) => {
        const _date = [
          new Date(date * 1000).toLocaleTimeString(),
          new Date(date * 1000).toLocaleDateString(),
        ];
        return (
          <Fragment>
            <p style={{ textAlign: 'center' }}>{_date[0]}</p>
            <p style={{ textAlign: 'center' }}>{_date[1]}</p>
          </Fragment>
        );
      },
    },
    {
      title: 'Ảnh',
      key: 'image',
      dataIndex: 'image',
      render: (image) => (
        <img
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
          }}
          src={image}
          alt=''
        />
      ),
      width: 150,
    },
    {
      title: 'Danh mục',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <Fragment>
          {tags.map((tag) => {
            let color = 'green';
            if (tag === 'Nổi bật') color = 'volcano';
            return (
              <Tag style={{ marginBottom: '5px' }} color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Fragment>
      ),
      width: 100,

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
        return record['tags']
          ? record['tags']
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : '';
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (i) => {
        const editData = data.find(item => item.id === i.id); 
        return (
          <div>
            <EditProduct onEdit={() => {}} data={editData} />
            {/* <EditProduct onEdit={fetchProductList} data={editData} /> */}
            <DeleteProduct onDelete={() => {}} id={i.id} />
            {/* <DeleteProduct onDelete={fetchProductList} id={i.id} /> */}
          </div>
        );
      },
      width: 120,
    },
  ];

  useEffect(() => {
    fetchProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.refresh]);

  return (
    <Fragment>
      <AdminTable loading={loading} columns={columns} data={productList} />
    </Fragment>
  );
}

export default ProductConent;
