import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Menu, Dropdown, Popconfirm, message, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import api from '../../config/axios';

function Category() {
  const [data, setData] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    const response = await api.get("/account");
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (record) => {
    try {
      await api.delete(`/account/${record.id}`);
      setData(data.filter((item) => item.id !== record.id));
      message.success('Deleted successfully');
    } catch (error) {
      console.error('Failed to delete:', error.response); // Thêm .response để lấy chi tiết phản hồi lỗi
      message.error('Failed to delete');
    }
  };

  const handleMenuClick = (e) => {
    setRoleFilter(e.key);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="ADMIN">Admin</Menu.Item>
      <Menu.Item key="Manager">Manager</Menu.Item>
      <Menu.Item key="dentist">Dentist</Menu.Item>
      <Menu.Item key="customer">Customer</Menu.Item>
    </Menu>
  );

  const filteredData = roleFilter === 'all'
    ? data
    : data.filter((item) => item.role.toLowerCase() === roleFilter.toLowerCase());

  const searchedData = filteredData.filter((item) =>
    item.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDetail = (record) => {
    Modal.info({
      title: 'Detail',
      width: 1200,
      centered: true,
      content: (
        <div>
          <p><strong>ID:</strong> {record.id}</p>
          <p><strong>FullName:</strong> {record.fullName}</p>
          <p><strong>Email:</strong> {record.email}</p>
          <p><strong>Phone:</strong> {record.phone}</p>
          <p><strong>Role:</strong> {record.role}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <h3>Dental Clinic Information:</h3>
          {record.dentalClinic && (
            <div>
              <p><strong>ID:</strong> {record.dentalClinic.id}</p>
              <p><strong>Clinic Name:</strong> {record.dentalClinic.clinicName}</p>
              <p><strong>Address:</strong> {record.dentalClinic.address}</p>
              <p><strong>Open Hours:</strong> {record.dentalClinic.openHours}</p>
              <p><strong>Close Hours:</strong> {record.dentalClinic.closeHours}</p>
              <p><strong>Clinic Status:</strong> {record.dentalClinic.clinicEnum}</p>
            </div>
          )}
          <p><strong>Enabled:</strong> {record.enabled ? 'Yes' : 'No'}</p>
          <p><strong>Username:</strong> {record.username}</p>
          <h3>Authorities:</h3>
          <ul>
            {record.authorities.map((auth, index) => (
              <li key={index}>{auth.authority}</li>
            ))}
          </ul>
          <p><strong>Account Non-Expired:</strong> {record.accountNonExpired ? 'Yes' : 'No'}</p>
          <p><strong>Account Non-Locked:</strong> {record.accountNonLocked ? 'Yes' : 'No'}</p>
          <p><strong>Credentials Non-Expired:</strong> {record.credentialsNonExpired ? 'Yes' : 'No'}</p>
        </div>
      ),
      onOk() {},
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'FullName',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      render: (record) => (
        <>
          <Button type="primary" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          <Popconfirm
            title="Are you sure to delete this account?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary" style={{ marginLeft: 8 }}>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search FullName"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 16 }}
        />
        <Dropdown overlay={menu}>
          <Button>
            Filter by Role <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Table dataSource={searchedData} columns={columns} />
    </div>
  );
}

export default Category;
