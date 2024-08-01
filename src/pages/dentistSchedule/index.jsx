import React, { useEffect, useState } from 'react'
import HeroHeader from '../../components/hero-header'
import { Link, useNavigate } from 'react-router-dom'
import useAppointmentByDentistID from '../../callApi/appointmentByDentistID'
import { Button, DatePicker, Form, Pagination, Select, Table } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import api from '../../config/axios';

function DentistSchedule() {

    const [loading, setLoading] = useState(false)

    const [data, setData] = useState([]);

    const { RangePicker } = DatePicker;

    const user = useSelector(selectUser)

    const [appointment, setAppointment] = useState([])

    const navigate = useNavigate()

    const [date, setDate] = useState([])

    const [datePicker, setDatePicker] = useState([])

    const getAppointment = async () => {
        try {
            setLoading(true)
            const res = await api.get(`/appointment-patient/dentist/${user.id}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getAppointment()
    }, [date]);

    useEffect(() => {
        setData(appointment.filter(a => a.status == 'PROCESSING'));
    }, [appointment,date]);

    const getAppointmentByDate = async () => {
        try {
            console.log(date)
            setLoading(true)
            const res = await api.get(`/appointment-patient/date/between/${date[0]}/${date[1]}/dentist/${user.id}`)
            console.log(res)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => formatDate(date)
        },
        {
            title: 'CLinic',
            dataIndex: ['dentistServices', 'account', 'dentalClinic','clinicName'],
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
    ];

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
            <HeroHeader content="Dentist Schedule" />

            <div className='d-flex justify-content-center'>
                <Form layout="inline"
                    onFinish={getAppointmentByDate}>
                    <Form.Item name="dateRange" label="Select Week">
                        <RangePicker  onChange={(value, dateString) => {
                             setDate(dateString)
                        }} />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType='submit' >
                            Add Schedule
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                <div className="col-lg-12">
                    <div className="row">
                        <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                           
                            <Table dataSource={data} columns={columns} loading={loading} />
                        </main>
                    </div></div></div>
        </>
    )
}

export default DentistSchedule