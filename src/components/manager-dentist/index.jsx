import React, { useEffect, useState } from 'react';
import { Button, Table, message, Modal, Dropdown, Menu, Input, Select, Form, Upload, Image } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
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
  const [fileList, setFileList] = useState([]);

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

  const fetchServices = async (service) => {
    try {
      const response = await api.get('/service');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      message.error('Failed to fetch services');
    }
  };

  const handleAddService = async (values) => {
    try {
      await api.post('/dentist-service', values);
      message.success('Service added to dentist successfully!');
      setIsServiceModalOpen(false);
      serviceForm.resetFields();
    } catch (error) {
      console.error('Failed to add service to dentist:', error);
      message.error('Failed to add service to dentist');
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
    fetchServices();
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
            </div>
          )}
        </div>
      ),
      onOk() {},
    });
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

  const showServiceModal = (record) => {
    setCurrentRecord(record);
    setIsServiceModalOpen(true);
    serviceForm.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsServiceModalOpen(false);
    setCurrentRecord(null);
    setIsEdit(false);
  };

  const handleRoleChange = (value) => {
    form.setFieldsValue({ roomId: undefined }); // Reset room value when role changes
    if (value === 'DENTIST') {
      fetchClinic(); // Fetch the clinic data again if role is dentist
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      
      // render: (text, record) => (
      //   <Dropdown
      //     overlay={
      //       <Menu>
      //         <Menu.Item onClick={() => handleDetail(record)}>Detail</Menu.Item>
      //         {record.role === 'DENTIST' && (
      //           <Menu.Item onClick={() => showServiceModal(record)}>Add Service</Menu.Item>
      //         )}
      //         <Menu.Item onClick={() => showModal(record)}>Edit</Menu.Item>
      //       </Menu>
      //     }
      //   >
      //     <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      //       Actions <DownOutlined />
      //     </a>
      //   </Dropdown>
      // ),
      // align: 'center',
    },
  ];

  const rowClassName = (record) => {
    return record.status === 'INACTIVE' ? 'table-row-inactive' : '';
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Dropdown
          overlay={
            <Menu onClick={handleSearch}>
              <Menu.Item key="ALL">ALL</Menu.Item>
              <Menu.Item key="DENTIST">DENTIST</Menu.Item>
              <Menu.Item key="STAFF">STAFF</Menu.Item>
            </Menu>
          }
        >
          <Button>
            Select Role <DownOutlined />
          </Button>
        </Dropdown>
        <Button type="primary" onClick={() => showModal()}>
          Add Account
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        rowClassName={rowClassName}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={isEdit ? 'Edit Account' : 'Add Account'}
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            role: 'DENTIST',
          }}
        >
          <Form.Item
            label="ID"
            name="id"
            hidden={!isEdit}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input the full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select onChange={handleRoleChange}>
              <Option value="DENTIST">DENTIST</Option>
              <Option value="STAFF">STAFF</Option>
            </Select>
          </Form.Item>
          {form.getFieldValue('role') === 'DENTIST' && (
            <>
              <Form.Item
                label="Room"
                name="roomId"
                rules={[{ required: true, message: 'Please select a room!' }]}
              >
                <Select placeholder="Select a room">
                  {rooms.map((room) => (
                    <Option key={room.id} value={room.id}>
                      {room.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Avatar" name="url">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Service to Dentist"
        visible={isServiceModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={serviceForm}
          onFinish={handleAddService}
          initialValues={{
            accountId: currentRecord?.id,
          }}
        >
          <Form.Item
            label="Service"
            name="serviceId"
            rules={[{ required: true, message: 'Please select a service!' }]}
          >
            <Select placeholder="Select a service">
              {services.map((service) => (
                <Option key={service.id} value={service.id}>
                  {service.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Dentist"
            name="accountId"
            rules={[{ required: true, message: 'Please select a dentist!' }]}
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerDentist;
