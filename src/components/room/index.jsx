import { Button, Form, Input, Modal, Table, message, Select } from 'antd';
import api from '../../config/axios'; // Assuming api is properly configured
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

const { Option } = Select;

function Room() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [clinics, setClinics] = useState([]);

  const user = useSelector(selectUser);
  console.log(user);

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
    try {
      const response = await api.post("/room", values);
      message.success('Room created successfully!');
      setData([...data, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create room:', error);
      message.error('Failed to create room');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/room");
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      message.error('Failed to fetch rooms');
    }
  };

  const fetchClinics = async () => {
    try {
      const response = await api.get("/clinic");
      setClinics(response.data); // Assuming response.data is an array of clinic objects
    } catch (error) {
      console.error('Failed to fetch clinics:', error);
      message.error('Failed to fetch clinics');
    }
  };

  useEffect(() => {
    fetchClinics();
    fetchData();
  }, []);

  const handleDelete = async (record) => {
    try {
      await api.delete(`/room/${record.id}`);
      setData(data.filter(item => item.id !== record.id));
      message.success('Room deleted successfully!');
    } catch (error) {
      console.error('Failed to delete room:', error);
      message.error('Failed to delete room');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'roomEnum',
      key: 'roomEnum',
    },
    {
      title: 'Action',
      render: (record) => (
        <Button onClick={() => handleDelete(record)} danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="">
      <>
        <Button type="primary" onClick={showModal}>
          Create Room
        </Button>
        <Modal title="Create New Room" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
              label="Room Name"
              name="name"
              rules={[{ required: true, message: 'Please input the room name!' }]}
            >
              <Input />
            </Form.Item>
            

            <Form.Item
              label="Clinic"
              name="clinicId"
              rules={[{ required: true, message: 'Please select the clinic!' }]}
            >
              <Select placeholder="Select a clinic">
                {clinics.map((clinic) => (
                  <Option key={clinic?.id} value={user.dentalClinic?.id}>{user.dentalClinic?.clinicName}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table dataSource={data} columns={columns} />
      </>
    </div>
  );
}

export default Room;
