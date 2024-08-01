import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/counterSlice'
import HeroHeader from '../../components/hero-header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAppointmentByPatientID from '../../callApi/appointmentByPatientID'
import { Button, Form, Input, Table } from 'antd'

function AppointmentRecord() {

    const user = useSelector(selectUser)

    const { pid } = useParams()

    const { appointment, setAppointment, loading } = useAppointmentByPatientID(pid)

    const [loadingCancel, setLoadingCancel] = useState(false)

    const [data, setData] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        setData(appointment.filter(a => a.status != 'CANCEL'));
    }, [appointment]);



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const cancelAppointment = async (id) => {
        setLoadingCancel(true)
        try {
            await api.delete(`/appointment-patient/${id}`);
            setAppointment(appointment.filter(item => item.id != id));
            toast.success("Cancel appointment success")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        } finally {
            setLoadingCancel(false)
        }
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => formatDate(date)
        },
        {
            title: 'Clinic',
            dataIndex: ['dentistServices', 'account', 'dentalClinic', 'address'],
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
            title: 'Record',
            render: (appointment) => (
                <div>
                    <Button
                        disabled={appointment.status !== "ALREADY"}
                        className='btn btn-primary'
                        onClick={() => {
                            navigate(`/patient-record/${appointment.id}`)
                        }}
                        loading={loadingCancel}
                    >
                        View
                    </Button>
                </div>
            ),
        },
    ];

    const handleSearch = (values) => {
        setData(appointment.filter(s =>
            (s.dentistServices.serviceDetail.name.toLowerCase().includes(values.keyword.toLowerCase()))
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
            <HeroHeader content="Patient Record" />

            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
                    <Form {...formItemLayout} onFinish={handleSearch}>
                        <Form.Item label="Service Name" name="keyword">
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
                                        <th scope="col">Clinic</th>
                                        <th scope="col">Slot</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Dentist</th>
                                        <th scope="col">Room</th>
                                        <th scope="col">Record</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointment.map((item, index) => (


                                        item?.status != 'CANCEL' ? (
                                            <tr>
                                                <td>{formatDate(item.date)}</td>
                                                <td>{item.dentistServices.account.dentalClinic.address}</td>
                                                <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                                <td>{item.dentistServices.serviceDetail.name}</td>
                                                <td>{item.dentistServices.account.fullName}</td>
                                                <td>{item.dentistServices.account.room?.name}</td>
                                                <td>
                                                    <Link to={`/patient-record/${item.id}`} className='btn btn-primary'>View</Link>
                                                </td>
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

export default AppointmentRecord