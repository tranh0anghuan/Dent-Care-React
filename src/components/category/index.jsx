import { Button, Form, Input, Modal, Table, Menu, Dropdown, Popconfirm, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../config/axios';

function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const response = await api.post("/account", values);
    setData([...data, response.data]);
    setIsModalOpen(false);
    console.log(response.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const fetchData = async () => {
    const response = await api.get("/account");
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
    // Thêm try-catch để xử lý lỗi khi xóa không thành công.
  const handleDelete = async (record) => {
    try {
      await api.delete(`/account/${record.id}`);
      setData(data.filter((item) => item.id !== record.id));
      message.success('Deleted successfully');
    } catch (error) {
      console.error('Failed to delete:', error);
      message.error('Failed to delete');
    }
  };

  const handleMenuClick = (e) => {
    setRoleFilter(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="ADMIN">Admin</Menu.Item>
      <Menu.Item key="dentist">Dentist</Menu.Item>
      <Menu.Item key="customer">Customer</Menu.Item>
    </Menu>
  );

  const filteredData = roleFilter === 'all'
    ? data
    : data.filter((item) => item.role.toLowerCase() === roleFilter.toLowerCase());

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
        <Popconfirm
          title="Are you sure to delete this account?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type="primary">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
          Filter by Role <DownOutlined />
        </Button>
      </Dropdown>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="UserName"
            name="categoryName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={filteredData} columns={columns} />
    </div>
  );
}

export default Category;
