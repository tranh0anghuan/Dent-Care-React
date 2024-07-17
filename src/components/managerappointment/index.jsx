import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, message, DatePicker, Form } from 'antd';
import api from '../../config/axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

function ManagerAppointment() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
    const [date,setDate] = useState([])
    const { RangePicker  } = DatePicker;
    const [isLoadingTable, setIsLoadingTable] = useState(true)

  const user = useSelector(selectUser);
  console.log(user);

  // Function to fetch appointment data from API
  const fetchData = async () => {
    try {
      const response = await api.get(`/appointment-patient/clinic/${user.dentalClinic?.id}`);
      setData(response.data);
      setFilteredData(response.data); // Set initial filtered data
      setIsLoadingTable(false)
    } catch (error) {
      console.error('Failed to fetch data:', error.response);
      message.error('Failed to fetch data');
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle deletion of an appointment
  const handleDelete = async (record) => {
    try {
      await api.delete(`/appointment-patient/${record.id}`);
      // Updating state to remove deleted record from UI
      setData(data.filter((item) => item.id !== record.id));
      setFilteredData(filteredData.filter((item) => item.id !== record.id));
      message.success('Deleted successfully');
    } catch (error) {
      console.error('Failed to delete:', error.response);
      message.error('Failed to delete');
    }
  };

  // Function to show appointment details in a modal
  const handleDetail = (record) => {
    Modal.info({
      title: 'Appointment Details',
      width: 1200,
      centered: true,
      content: (
        <div>
          <p><strong>Date:</strong> {moment(record.date).format('YYYY-MM-DD')}</p>
          <p><strong>Slot:</strong> {record.slot?.name}</p>
          <p><strong>Time:</strong> {record.slot?.startTime} - {record.slot?.endTime}</p>

          <h3>Patient Information:</h3>
          <p><strong>ID:</strong> {record.patient?.id}</p>
          <p><strong>Name:</strong> {record.patient?.name}</p>
          <p><strong>Age:</strong> {record.patient?.age}</p>
          <p><strong>Address:</strong> {record.patient?.address}</p>
          <p><strong>Phone Number:</strong> {record.patient?.phoneNumber}</p>
          <p><strong>Email:</strong> {record.patient?.email}</p>

          <h3>Dentist Information:</h3>
          <p><strong>ID:</strong> {record.dentistServices?.account.id}</p>
          <p><strong>FullName:</strong> {record.dentistServices?.account.fullName}</p>
          <p><strong>Email:</strong> {record.dentistServices?.account.email}</p>
          <p><strong>Phone:</strong> {record.dentistServices?.account.phone}</p>
          <p><strong>Role:</strong> {record.dentistServices?.account.role}</p>

          <h3>Dental Clinic Information:</h3>
          <p><strong>ID:</strong> {record.dentistServices?.account.dentalClinic?.id}</p>
          <p><strong>Clinic Name:</strong> {record.dentistServices?.account.dentalClinic?.clinicName}</p>
          <p><strong>Address:</strong> {record.dentistServices?.account.dentalClinic?.address}</p>

          <h3>Service Detail:</h3>
          <p><strong>Name:</strong> {record.dentistServices?.serviceDetail?.name}</p>
          <p><strong>Price:</strong> {record.dentistServices?.serviceDetail?.price}</p>
          <p><strong>Description:</strong> {record.dentistServices?.serviceDetail?.description}</p>
        </div>
      ),
      onOk() {}, // Optional: Specify action when modal is closed
    });
  };

  // Function to handle date range change
  const handleDateRangeChange = (dates) => {
    setDateRange(dates); // Update date range state
    filterDataByDateRange(dates);
  };

  // Function to filter data by date range
  const filterDataByDateRange = (dates) => {
    if (dates.length === 2) {
      const startDate = dates[0].startOf('day');
      const endDate = dates[1].endOf('day');
      const filtered = data.filter(item => moment(item.date).isBetween(startDate, endDate, null, '[]'));
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to original data if no date range is selected
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient Name',
      dataIndex: ['patient', 'name'],
      key: 'patientName',
    },
    {
      title: 'Slot',
      dataIndex: ['slot', 'name'],
      key: 'slot',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('YYYY-MM-DD'), // Format date for display
    },
    {
      title: 'Dentist',
      dataIndex: ['dentistServices', 'account', 'fullName'],
      key: 'dentistServicesAccountFullName',
    },
    {
      title: 'Clinic Address',
      dataIndex: ['dentistServices', 'account', 'dentalClinic', 'clinicName'],
      key: 'clinicName',
    },
    {
      title: 'Action',
      render: (record) => (
        <Button type="primary" onClick={() => handleDetail(record)}>
          Detail
        </Button>
      ),
    },
  ];
  console.log(date);
  const getAppointmentByDate = async () => {
    try {
      setIsLoadingTable(true)
     if(!date[0] == ""){
       const res = await api.get(`/appointment-patient/date/between/${date[0]}/${date[1]}/clinic/${user.dentalClinic.id}`)
       console.log(res)
       setFilteredData(res.data)
     }else{
      setFilteredData(data);
     }
     setIsLoadingTable(false)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div>
      {/* Date Range Picker */}
      <div className='d-flex justify-content-center'>
                <Form layout="inline"
                        onFinish={getAppointmentByDate}>
                    <Form.Item label="Select Week">
                    <RangePicker   onChange={(value, dateString) => {
                 console.log('Formatted Selected Time: ', setDate(dateString));
                 
      }} />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={isLoadingTable} type="primary" htmlType='submit' >
                            Add Schedule
                        </Button>
                    </Form.Item>
                </Form>
            </div>

      {/* Table to display filtered appointment data */}
      <Table loading={isLoadingTable} dataSource={filteredData} columns={columns} />
    </div>
  );
}

export default ManagerAppointment;
