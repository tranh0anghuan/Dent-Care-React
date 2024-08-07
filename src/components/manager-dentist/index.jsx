import React, { useEffect, useState } from 'react';
import { Button, Table, message, Modal, Dropdown, Menu, Input, Select, Form, Upload, Image } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import api from '../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '../../util/file';


const { Option } = Select;

const ManagerDentist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const [clinic, setClinic] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);
  

  const [form] = Form.useForm();
  const [serviceForm] = Form.useForm();

  const user = useSelector(selectUser);
  const [roleFilter, setRoleFilter] = useState(['DENTIST', 'STAFF']); // Default role filter

  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([
  ]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  const fetchData = async () => {
    setLoading(true);
    try {
      console.log(`Fetching data for roles ${roleFilter.join(', ')} and clinic ${user.dentalClinic?.id}`);
      const responses = await Promise.all(
        roleFilter.map(role => api.get(`/account/role/${role}/clinic/${user.dentalClinic?.id}`))
      );
      const combinedData = responses.flatMap(response => response.data);
      setData(Array.isArray(combinedData) ? combinedData : []);
    } catch (error) {
      console.error('Failed to fetch data:', error.response ? error.response.data : error.message);
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user?.dentalClinic?.id) {
      fetchData();
    }
  }, [user?.dentalClinic?.id, roleFilter]);

  const fetchClinic = async () => {
    try {
      const clinicResponse = await api.get(`/clinic/${user.dentalClinic?.id}`);
      setClinic(clinicResponse.data);

      const roomsResponse = await api.get(`/room/clinic/${user.dentalClinic?.id}`);
      setRooms(roomsResponse.data);
    } catch (error) {
      console.error('Failed to fetch clinic or rooms:', error.response ? error.response.data : error.message);
      message.error('Failed to fetch clinic or rooms');
    }
  };

  useEffect(() => {
    fetchClinic();

  }, [user?.dentalClinic?.id]);

  const handleSearch = (value) => {
    if (value.key === 'ALL') {
      setRoleFilter(['DENTIST', 'STAFF']);
    } else {
      setRoleFilter([value.key]);
    }
  };
  const fetchServices = async () => {
    try {
      const servicesResponse = await api.get(`/service-clinic/search-service-by-clinic-id/${user.dentalClinic?.id}`); // Adjust API endpoint as needed
      setServices(servicesResponse.data);
      
    } catch (error) {
      console.error('Failed to fetch services:', error.response ? error.response.data : error.message);
      message.error('Failed to fetch services');
    }
  };
  
  // const handleServicefetch = async (values) => {
  //   setLoading(true);
  //   try {
  //     await api.get(`/service`, values); // Adjust API endpoint as needed
  //     message.success('Service created successfully!');
  //     setIsServiceModalOpen(false);
  //     fetchServices(); // Refresh the services list
  //   } catch (e) {
  //     console.error('Error:', e.response ? e.response.data : e.message);
  //     const errorMsg = e.response && e.response.data ? JSON.stringify(e.response.data) : 'Failed to create service.';
  //     message.error(errorMsg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    fetchServices();
  }, [user?.dentalClinic?.id]);
  

  const handleDetail = (record) => {
    Modal.info({
      title: 'Detail',
      width: 800,
      centered: true,
      content: (
        <div>
          <p><strong>ID:</strong> {record.id}</p>
          <h3>Account Information:</h3>
          <p><strong>Full Name:</strong> {record.fullName}</p>
          <p><strong>Email:</strong> {record.email}</p>
          <p><strong>Phone:</strong> {record.phone}</p>
          <p><strong>Role:</strong> {record.role}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <h3>Dental Clinic Information:</h3>
          {record.dentalClinic && (
            <div>
              <p><strong>Clinic ID:</strong> {record.dentalClinic.id}</p>
              <p><strong>Clinic Name:</strong> {record.dentalClinic.clinicName}</p>
              <p><strong>Address:</strong> {record.dentalClinic.address}</p>
              <p><strong>Open Hours:</strong> {record.dentalClinic.openHours}</p>
              <p><strong>Close Hours:</strong> {record.dentalClinic.closeHours}</p>
              <p><strong>Clinic Status:</strong> {record.dentalClinic.clinicEnum}</p>
            </div>
          )}
          {record.room && (
            <div>
              <h3>Room Information:</h3>
              <p><strong>Room ID:</strong> {record.room.id}</p>
              <p><strong>Room Name:</strong> {record.room.name}</p>
              <p><strong>Room Status:</strong> {record.room.roomEnum}</p>
              {/* <p><strong>URL:</strong> {record.url}</p> */}
            </div>
          )}
        </div>
      ),
      onOk() { },
    });
  };

  const handleCreateAccount = async (values) => {
    setLoading(true);
    const url = await uploadFile(values.url.file.originFileObj)
    try {
      await api.post('/register-by-admin', {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phone: values.phone,
        role: values.role,
        clinicId: values.role !== 'ADMIN' ? Number(values.clinicId) : undefined,
        roomId: values.roomId,
        url: url
      });
      message.success('Account created successfully!');
      fetchData(); // Refresh the data to include the new account
      setIsModalOpen(false);
    } catch (e) {
      console.error('Error:', e.response ? e.response.data : e.message);
      const errorMsg = e.response && e.response.data ? JSON.stringify(e.response.data) : 'Failed to create account.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAccount = async (values) => {
    setLoading(true);
    let url = null;

    if (values.url && values.url.file && values.url.file.originFileObj) {
      try {
        url = await uploadFile(values.url.file.originFileObj);
      } catch (error) {
        console.error('File upload failed:', error);
        message.error('File upload failed');
        setLoading(false);
        return;
      }
    }

    // Prepare data for the API call
    const dataToUpdate = {
      id: values.id,
      fullName: values.fullName,
      phone: values.phone,
      role: values.role,
      clinicID: values.clinicId,
      url: url, // Include the uploaded file URL or null
    };

    try {
      console.log(dataToUpdate)
      await api.put(`/account`, dataToUpdate);
      message.success('Account updated successfully!');
      fetchData(); // Refresh the data to reflect the updated account
      setIsModalOpen(false);
    } catch (e) {
      console.error('Error:', e.response ? e.response.data : e.message);
      const errorMsg = e.response && e.response.data ? JSON.stringify(e.response.data) : 'Failed to update account.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  //  call để không bị trùng creat và update sài chung model
  const onFinish = (values) => {
    if (isEdit) {
      console.log("dung")
      handleUpdateAccount(values);
    } else {
      handleCreateAccount(values);
    }
  };

 

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = (record = null) => {
    setIsEdit(!!record);
    setCurrentRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);

    setCurrentRecord(null);
    setIsEdit(false);
  };

  const handleRoleChange = (value) => {
    form.setFieldsValue({ roomId: undefined }); // Reset room value when role changes
    if (value === 'DENTIST') {
      fetchClinic(); // Fetch the rooms again
    } else {
      setRooms([]); // Clear the rooms if the role is not DENTIST
    }
  };

  const handleDeleteAccount = async (accountId) => {
    setLoading(true);
    try {
      await api.delete(`/account/${accountId}`);
      message.success('Account deleted successfully!');
      fetchData(); // Refresh the data to reflect the updated list
    } catch (error) {
      console.error('Failed to delete account:', error.response ? error.response.data : error.message);
      message.error('Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  const menu = (
    <Menu onClick={handleSearch}>
      <Menu.Item key="ALL">All</Menu.Item>
      <Menu.Item key="DENTIST">Dentist</Menu.Item>
      <Menu.Item key="STAFF">Staff</Menu.Item>
      {/* Add other roles as needed */}
    </Menu>
  );
  const handleAddService = async (values) => {
    console.log(values)
    try {
      await api.post('/dentist-service', {
        dentistId: values.dentistId,
        serviceId: values.serviceId,
        
      });
      message.success('Service assigned successfully!');
      handleServiceModalCancel();
      setIsServiceModalOpen(false);
    } catch (error) {
      console.error('Failed to assign service:', error.response ? error.response.data : error.message);
      message.error(error.response.data);
    }
  };
  
  const showServiceModal = () => {
    fetchServices();
    serviceForm.resetFields();
    setIsServiceModalOpen(true);
  };

  const handleServiceModalCancel = () => {
    setIsServiceModalOpen(false);
  };
  

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',

    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',

    },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    // },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',

    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',

    },
    {
      title: 'Clinic Name',
      dataIndex: ['dentalClinic', 'clinicName'],
      key: 'clinicName',
    },
    {
      title: 'Room Name',
      dataIndex: ['room', 'name'],
      key: 'roomName',
    },
    {
      title: 'IMG',
      dataIndex: 'url',
      key: 'url',
      render: (url) => <img src={url} alt="service avatar" style={{ width: 80, height: 80 }} />,
    },
    {
      title: 'Action',
      render: (record) => (
        <div>
          <Button type="primary" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          <Button type="primary" style={{ marginLeft: 8 }} onClick={() => {showModal(record)}}>
            Update
          </Button>
          {record.status !== 'INACTIVE' && (
            <Button danger type="primary" style={{ marginLeft: 8 }} onClick={() => handleDeleteAccount(record.id)}>
              Delete
            </Button>
          )}
          {/* {record.role !== 'STAFF' && (
            <Button type="primary" style={{ marginLeft: 8 }} onClick={() => handleAddService(record)}>
            add service
          </Button>
          )} */}
        </div>
      ),

    },
    
  ];
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Dropdown overlay={menu}>
          <Button>
            Filter by Role <DownOutlined />
          </Button>
        </Dropdown>
        <Button type="primary" onClick={() => showModal()}>
          Create Account
        </Button>
        <Button type="primary"  onClick={showServiceModal}>
          Add Service
        </Button>
      </div>
      <Table dataSource={data} columns={columns} rowKey="id" loading={loading} />

{/* 
      <Modal
        // title={isEdit ? "Update Account" : "Create New Account"}
        title="Update Account"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
          >
            <Input type="email" readOnly />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select onChange={handleRoleChange} >
              <Option value="DENTIST">Dentist</Option>
              <Option value="STAFF">Staff</Option>
              
            </Select>
          </Form.Item>
          

          <Form.Item
            label="Clinic"
            name="clinicId"
            initialValue={user.dentalClinic?.id}
          >
            <Select disabled>
              <Option value={user.dentalClinic?.id}>{user.dentalClinic?.clinicName}</Option>

            </Select>
          </Form.Item>
          <Form.Item label="Image" name="url">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
             
              Update Account
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}


      {/* Creat Account */}
      <Modal
        // title={isEdit ? "Update Account" : "Create New Account"}
        title={isEdit ? "Update Account" : "Create New Account"}
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="id" style={{display: "none"}} />
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input  />
          </Form.Item>
          {!isEdit &&  <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>}
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select onChange={handleRoleChange} >
              <Option value="DENTIST">Dentist</Option>
              <Option value="STAFF">Staff</Option>
              {/* Add other roles as needed */}
            </Select>
          </Form.Item>
          {form.getFieldValue('role') === 'DENTIST' && (
            <Form.Item
              label="Room"
              name="roomId"
              rules={[{ required: true, message: 'Please select a room!' }]}
            >
              <Select>
                {rooms.map((room) => (
                  <Option key={room.id} value={room.id}>{room.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label="Clinic"
            name="clinicId"
            initialValue={user.dentalClinic?.id}
          >
            <Select disabled>
              <Option value={user.dentalClinic?.id}>{user.dentalClinic?.clinicName}</Option>


            </Select>
          </Form.Item>
          <Form.Item label="Image" name="url">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              {/* {isEdit ? "Update Account" : "Create Account"} */}
              Creat Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>


             {/* Add service */}
      <Modal
         title="Add Service"
         visible={isServiceModalOpen}
         onCancel={handleServiceModalCancel}
         footer={null}
      >
        <Form form={serviceForm} layout="vertical" onFinish={handleAddService}>
  <Form.Item
    label="Select Doctor"
    name="dentistId"
    rules={[{ required: true, message: 'Please select a doctor!' }]}
  >
    <Select>
      {data.filter(item => item.role === 'DENTIST').map((item) => (
        <Option key={item.id} value={item.id}>{item.fullName}</Option>
      ))}
    </Select>
  </Form.Item>
  <Form.Item
    label="Service"
    name="serviceId"
    rules={[{ required: true, message: 'Please select a service!' }]}
  >
    <Select>
      {services.map((service) => (
        <Option key={service.id} value={service.id}>{service.name}</Option>
      ))}
    </Select>
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit" loading={loading}>
      Add Service
    </Button>
  </Form.Item>
</Form>

      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}


      
    </div>
  );
};

export default ManagerDentist;