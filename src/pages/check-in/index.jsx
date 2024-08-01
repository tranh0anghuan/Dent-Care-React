import React, { useEffect, useState } from 'react'
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Table,
} from 'antd';
import usePatientByPhone, { getPatient } from '../../callApi/patientByPhone';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import HeroHeader from '../../components/hero-header';

function CheckIn() {

    const [appointment, setAppointment] = useState([])

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);

    const user = useSelector(selectUser);

    const handleCheckIn = async (id) => {
        try {
            setLoading(true)
            await api.patch(`/appointment-patient/id/${id}/status/ALREADY`);
            setAppointment(appointment.filter(item => item.id != id));
            toast.success("Check-in appoinment success")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getAppointment()
    }, [])

    useEffect(() => {
        // setData(appointment.filter(a => a.status == 'PROCESSING'));
        setData((appointment.filter(a => a.status == 'PROCESSING')).sort((a, b) => a.slot.id - b.slot.id));

    }, [appointment,handleCheckIn]);


    const getToDay = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };


    const getAppointment = async () => {
        try {
            setLoading(true)
            const res = await api.get(`/appointment-patient/clinic/${user.dentalClinic.id}/date/${getToDay()}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }




    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

  

    const cancelAppointment = async (id) => {
        try {
            setLoading(true)
            await api.patch(`appointment-patient/id/${id}/status/CANCEL`);
            setAppointment(appointment.filter(item => item.id != id));
            toast.success("Cancel appoinment success")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }finally{
            setLoading(false)
        }
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => formatDate(date)
        },
        {
            title: 'Patient',
            dataIndex: ['patient', 'name'],
        },
        {
            title: 'Slot',
            dataIndex: ['slot'],
            render: (slot) => `${slot.name}:   ${slot.startTime}-${slot.endTime}`
        },
        {
            title: 'Service',
            dataIndex: ['dentistServices', 'serviceDetail', 'name'],
        },
        {
            title: 'Dentist',
            dataIndex: ['dentistServices', 'account', 'fullName'],
        },
        {
            title: 'Room',
            dataIndex: ['dentistServices', 'account', 'room', 'name'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            render: (appointment) => (
                <div>
                    <Button style={{marginRight:'20px'}}
                        className='btn btn-primary'
                        onClick={() => {
                            handleCheckIn(appointment.id);
                        }}
                    >
                        Check-in
                    </Button>
                    <Button
                        className='btn btn-primary'
                        onClick={() => {
                            cancelAppointment(appointment.id);
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            ),
        },
    ];

    const handleSearch = (values) => {
        setData(appointment.filter(s =>
            (s.patient.name.toLowerCase().includes(values.keyword.toLowerCase()))
            && (s.status !== "CANCEL")
        ));
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 14, offset: 6 },
        },
    };

    return (
        <>

            <HeroHeader content="Check In" />

            <div className='container bg-light'>
                <div  style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
                    <Form {...formItemLayout} onFinish={handleSearch}>
                        <Form.Item label="Full Name" name="keyword">
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className='btn btn-primary'
                                style={{ padding: '0px 80px', borderRadius: '4px' }}
                            >
                                Search
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>


            <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                <div className="col-lg-12">
                    <div className="row">
                        <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                            {/* <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Slot</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Patient</th>
                                        <th scope="col">Room</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointment.map((item, index) => (


                                        item?.status != 'CANCEL' ? (
                                            <tr>
                                                <td>{formatDate(item.date)}</td>
                                                <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                                <td>{item.dentistServices.serviceDetail.name}</td>
                                                <td>{item.patient.name}</td>
                                                <td>{item.dentistServices.account.room?.name}</td>
                                                <td>{item.status}</td>
                                                {item?.status === "PROCESSING" &&(
                                                    <td>
                                                        <Link  onClick={() => handleCheckIn(item?.id)} className='btn btn-primary me-5'>Check In</Link>
                                                        <Link onClick={() => cancelAppointment(item?.id)}  className='btn btn-primary'>Cancel</Link>

                                                    </td>
                                                    
                                                )}
                                            </tr>
                                        ) : ""
                                    ))}

                                </tbody>
                            </table> */}
                            <Table dataSource={data} columns={columns} loading={loading} />

                        </main>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CheckIn