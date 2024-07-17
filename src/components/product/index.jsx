import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Table, Modal, Popconfirm, TimePicker, Upload, Image } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'; 
import api from '../../config/axios';
import moment from 'moment';
import uploadFile from "../../util/file";

const Product = () => {
  const [clinics, setClinics] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const fetchClinics = async () => {
    try {
      const response = await api.get('/clinic/by-admin');
      console.log(response.data);
      setClinics(response.data);
    } catch (error) {
      console.error('Failed to fetch clinics:', error);
      message.error('Failed to fetch clinics');
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleDeleteClinic = async (clinicId) => {
    try {
      await api.delete(`/clinic/${clinicId}`);
      setClinics(clinics.filter(clinic => clinic.id !== clinicId));
      message.success('Clinic deleted successfully!');
    } catch (error) {
      console.error('Failed to delete clinic:', error);
      message.error('Failed to delete clinic');
    }
  };

  const onFinish = async (values) => {
    try {
      if (fileList.length > 0) {
        const img = await uploadFile(fileList[0].originFileObj);
        values.url = img;
      }
      const formattedValues = {
        ...values,
        openHours: values.openHours.format('h:mm a'),
        closeHours: values.closeHours.format('h:mm a'),
      };
      const response = await api.post('/clinic', formattedValues);
      setClinics([...clinics, response.data]);
      message.success('Clinic created successfully!');
      setIsModalVisible(false);
      setFileList([]); // Reset file list
    } catch (error) {
      console.error('Failed to create clinic:', error);
      message.error('Failed to create clinic');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Clinic Name',
      dataIndex: 'clinicName',
      key: 'clinicName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Open Hours',
      dataIndex: 'openHours',
      key: 'openHours',
      render: (text) => moment(text, 'HH:mm').format('h:mm a'), // Format Open Hours
    },
    {
      title: 'Close Hours',
      dataIndex: 'closeHours',
      key: 'closeHours',
      render: (text) => moment(text, 'HH:mm').format('h:mm a'), // Format Close Hours
    },
    {
      title: 'Avatar',
      dataIndex: 'url',
      key: 'url',
      render: (url) => <Image src={url} />,
    },
    {
      title: 'Status',
      dataIndex: 'clinicEnum',
      key: 'clinicEnum',
    },
    {
      title: 'Action',
      render: (record) => (
        <Popconfirm
          title="Are you sure delete this clinic?"
          onConfirm={() => handleDeleteClinic(record.id)}
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

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Create Clinic
      </Button>
      <Modal
        title="Add New Clinic"
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
            label="Clinic Name"
            name="clinicName"
            rules={[{ required: true, message: 'Please enter clinic name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter clinic address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Open Hours"
            name="openHours"
            rules={[{ required: true, message: 'Please enter open hours' }]}
          >
            <TimePicker format="h:mm a" use12Hours />
          </Form.Item>
          <Form.Item
            label="Close Hours"
            name="closeHours"
            rules={[{ required: true, message: 'Please enter close hours' }]}
          >
            <TimePicker format="h:mm a" use12Hours />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="url"
            rules={[{ required: true, message: 'Please enter avatar' }]}
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
      <Table dataSource={clinics} columns={columns} />
    </div>
  );
};

export default Product;
