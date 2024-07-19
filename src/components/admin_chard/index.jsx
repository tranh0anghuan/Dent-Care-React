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
  const [clinic, setClinic] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form] = Form.useForm();
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
      onOk() {},
    });
  };
 
  // const handleCreateAccount = async (values) => {
  //   setLoading(true);
  //   const url = await uploadFile(values.url.file.originFileObj)
  //   try {
  //     await api.post('/register-by-admin', {
  //       email: values.email,
  //       password: values.password,
  //       fullName: values.fullName,
  //       phone: values.phone,
  //       role: values.role,
  //       clinicId: values.role !== 'ADMIN' ? Number(values.clinicId) : undefined,
  //       roomId: values.roomId,
  //       url: url
  //     });
  //     message.success('Account created successfully!');
  //     fetchData(); // Refresh the data to include the new account
  //     setIsModalOpen(false);
  //   } catch (e) {
  //     console.error('Error:', e.response ? e.response.data : e.message);
  //     const errorMsg = e.response && e.response.data ? JSON.stringify(e.response.data) : 'Failed to create account.';
  //     message.error(errorMsg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


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
  
  const onFinish = (values) => {
    if (isEdit) {
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
          <Button type="primary" style={{ marginLeft: 8 }} onClick={() => showModal(record)}>
            Update
          </Button>
          {record.status !== 'INACTIVE' && (
            <Button danger type="primary" style={{ marginLeft: 8 }} onClick={() => handleDeleteAccount(record.id)}>
              Delete
            </Button>
          )}
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
        {/* <Button type="primary" onClick={() => showModal()}>
          Create Account
        </Button> */}
      </div>
      <Table dataSource={data} columns={columns} rowKey="id" loading={loading} />

      <Modal
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
          
        <Form.Item   name="id">
          <Input disabled/>
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
            <Input type="email" readOnly/>
          </Form.Item>
          {/* <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item> */}
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
          {/* {form.getFieldValue('role') === 'DENTIST' && (
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
          )} */}
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
              {isEdit ? "Update Account" : "Create Account"}
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


// import React, { useState, useEffect } from 'react';
// import { Table, message, Popconfirm, Button, Modal, Form, Input, Upload, Select } from 'antd';
// import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/features/counterSlice';
// import api from '../../config/axios';
// import uploadFile from '../../util/file';

// const { Option } = Select;

// const ManagerService = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [form] = Form.useForm();
//   const [updateForm] = Form.useForm();
//   const [currentService, setCurrentService] = useState(null);
//   const [role, setRole] = useState('ALL');
//   const user = useSelector(selectUser);

//   const handleUploadChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   const fetchServices = async (url) => {
//     setLoading(true);
//     try {
//       const response = await api.get(url);
//       setServices(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Failed to fetch services:', error);
//       message.error('Failed to fetch services');
//       setLoading(false);
//     }
//   };

//   const handleDeleteService = async (serviceId) => {
//     try {
//       await api.delete(`/service/${serviceId}`);
//       fetchServices(role === 'ALL' ? '/service' : `/service-clinic/search-service-by-clinic-id/${user.dentalClinic?.id}`);
//       message.success('Service deleted successfully!');
//     } catch (error) {
//       console.error('Failed to delete service:', error);
//       message.error('Failed to delete service');
//     }
//   };

//   const handleActivateService = async (serviceId) => {
//     try {
//       await api.put(`/service/activate/${serviceId}`);
//       fetchServices(role === 'ALL' ? '/service' : `/service-clinic/search-service-by-clinic-id/${user.dentalClinic?.id}`);
//       message.success('Service activated successfully!');
//     } catch (error) {
//       console.error('Failed to activate service:', error);
//       message.error('Failed to activate service');
//     }
//   };

//   const handleAddServiceToClinic = async (serviceId) => {
//     try {
//       const payload = {
//         serviceId,
//         clinicId: user.dentalClinic?.id,
//       };
//       await api.post('/service-clinic', payload);
//       message.success('Service added to clinic successfully!');
//     } catch (error) {
//       console.error('Failed to add service to clinic:', error);
//       message.error('Failed to add service to clinic');
//     }
//   };

//   const handleUpdateService = async (values) => {
//     try {
//       if (fileList.length > 0) {
//         const img = await uploadFile(fileList[0].originFileObj);
//         values.url = img;
//       }
//       await api.put(`/service`, { ...currentService, ...values });
//       fetchServices(role === 'ALL' ? '/service' : `/service-clinic/search-service-by-clinic-id/${user.dentalClinic?.id}`);
//       message.success('Service updated successfully!');
//       setIsUpdateModalVisible(false);
//       setFileList([]); // Reset file list
//     } catch (error) {
//       console.error('Failed to update service:', error);
//       message.error('Failed to update service');
//     }
//   };

//   const onFinish = async (values) => {
//     try {
//       if (fileList.length > 0) {
//         const img = await uploadFile(fileList[0].originFileObj);
//         values.url = img;
//       }
//       const response = await api.post('/service', values);
//       fetchServices(role === 'ALL' ? '/service' : `/service-clinic/search-service-by-clinic-id/${user.dentalClinic?.id}`);
//       message.success('Service created successfully!');
//       setIsModalVisible(false);
//       setFileList([]); // Reset file list
//     } catch (error) {
//       console.error('Failed to create service:', error);
//       message.error('Failed to create service');
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   const handleRoleChange = (value) => {
//     setRole(value);
//     if (value === 'ALL') {
//       fetchServices('/service');
//     } else if (value === 'HERE') {
//       fetchServices(`/service-clinic/search-service-by-clinic-id/${user.dentalClinic?.id}`);
//     }
//   };

//   const columns = [
//     {
//       title: 'Service ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Service Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Avatar',
//       dataIndex: 'url',
//       key: 'url',
//       render: (url) => <img src={url} alt="service avatar" style={{ width: 150, height: 95 }} />,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'serviceDetailEnum',
//       key: 'serviceDetailEnum',
//     },
//     {
//       title: 'Action',
//       render: (record) => (
//         <div>
//           <Button
//             type="primary"
//             style={{ marginRight: 8 }}
//             onClick={() => {
//               setCurrentService(record);
//               updateForm.setFieldsValue(record);
//               setIsUpdateModalVisible(true);
//             }}
//           >
//             Update
//           </Button>
//           {record.serviceDetailEnum === 'Inactive' && (
//             <Button
//               type="default"
//               style={{ marginRight: 8 }}
//               onClick={() => handleActivateService(record.id)}
//             >
//               Activate
//             </Button>
//           )}
//           <Popconfirm
//             title="Are you sure you want to delete this service?"
//             onConfirm={() => handleDeleteService(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="primary" danger>
//               Delete
//             </Button>
//           </Popconfirm>

//           <Popconfirm 
//             title={`Are you want to add this service to ${user.dentalClinic?.clinicName}?`}
//             onConfirm={() => handleAddServiceToClinic(record.id)}
//             okText="Yes"
//             cancelText="No" 
//           >
//             <Button style={{ marginTop: 8, marginLeft: 8 }}>
//               Add
//             </Button>
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     if (user?.id) {
//       fetchServices('/service');
//     }
//   }, [user?.id]);

//   return (
//     <div>
//       <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
//         Create Service
//       </Button>
//       <Select onChange={handleRoleChange} style={{ width: 200, marginBottom: 16, marginLeft: 12 }}>
//         <Option value="ALL">ALL</Option>
//         <Option value="HERE">{user.dentalClinic?.clinicName}</Option>
//       </Select>
//       <Table dataSource={services} columns={columns} loading={loading} />
//       <Modal
//         title="Add New Service"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Service Name"
//             name="name"
//             rules={[{ required: true, message: 'Please enter service name' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Price"
//             name="price"
//             rules={[
//               { required: true, message: "Please enter your Price!" },
//               {
//                 type: "number",
//                 min: 0,
//                 max: 100000000000,
//                 message: "Price must be between 0 and 100000000000",
//               },
//             ]}
//             getValueFromEvent={(event) => {
//               const { value } = event.target;
//               return value ? (Number(value) ? Number(value) : 0) : value;
//             }}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[{ required: true, message: 'Please enter service description' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Avatar"
//             name="url"
//             rules={[{ required: true, message: 'Please upload an avatar' }]}
//           >
//             <Upload
//               listType="picture"
//               fileList={fileList}
//               onChange={handleUploadChange}
//               beforeUpload={() => false}
//             >
//               <Button icon={<UploadOutlined />}>Upload Avatar</Button>
//             </Upload>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title="Update Service"
//         visible={isUpdateModalVisible}
//         onCancel={() => setIsUpdateModalVisible(false)}
//         footer={null}
//       >
//         <Form
//           form={updateForm}
//           layout="vertical"
//           onFinish={handleUpdateService}
//         >
//           <Form.Item
//             label="Service Name"
//             name="name"
//             rules={[{ required: true, message: 'Please enter service name' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Price"
//             name="price"
//             rules={[
//               { required: true, message: "Please enter your Price!" },
//               {
//                 type: "number",
//                 min: 0,
//                 max: 100000000000,
//                 message: "Price must be between 0 and 100000000000",
//               },
//             ]}
//             getValueFromEvent={(event) => {
//               const { value } = event.target;
//               return value ? (Number(value) ? Number(value) : 0) : value;
//             }}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[{ required: true, message: 'Please enter service description' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Avatar"
//             name="url"
//           >
//             <Upload
//               listType="picture"
//               fileList={fileList}
//               onChange={handleUploadChange}
//               beforeUpload={() => false}
//             >
//               <Button icon={<UploadOutlined />}>Upload Avatar</Button>
//             </Upload>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ManagerService;
  