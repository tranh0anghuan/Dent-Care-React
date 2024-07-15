import React, { useState, useEffect } from 'react';
import { Table, message, Popconfirm, Button, Modal, Form, Input, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import api from '../../config/axios'; // Adjust the path according to your project structure
import uploadFile from '../../util/file'; // Make sure this path is correct

const ManagerService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const user = useSelector(selectUser);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/service`);
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      message.error('Failed to fetch services');
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await api.delete(`/service/${serviceId}`);
      setServices(services.filter(service => service.id !== serviceId));
      message.success('Service deleted successfully!');
    } catch (error) {
      console.error('Failed to delete service:', error);
      message.error('Failed to delete service');
    }
  };

  const onFinish = async (values) => {
    try {
      if (fileList.length > 0) {
        const img = await uploadFile(fileList[0].originFileObj);
        values.url = img;
      }
      const response = await api.post('/service', values);
      setServices([...services, response.data]);
      message.success('Service created successfully!');
      setIsModalVisible(false);
      setFileList([]); // Reset file list
    } catch (error) {
      console.error('Failed to create service:', error);
      message.error('Failed to create service');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Service ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Avatar',
      dataIndex: 'url',
      key: 'url',
      render: (url) => <img src={url} alt="service avatar" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Status',
      dataIndex: 'serviceDetailEnum',
      key: 'serviceDetailEnum',
    },
    {
      title: 'Action',
      render: (record) => (
        <Popconfirm
          title="Are you sure you want to delete this service?"
          onConfirm={() => handleDeleteService(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    if (user?.id) {
      fetchServices(user.id);
    }
  }, [user?.id]);

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Create Service
      </Button>
      <Modal
        title="Add New Service"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Service Name"
            name="name"
            rules={[{ required: true, message: 'Please enter service name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter service price' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter service description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="url"
            rules={[{ required: true, message: 'Please upload an avatar' }]}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={services} columns={columns} loading={loading} />
    </div>
  );
};

export default ManagerService;
