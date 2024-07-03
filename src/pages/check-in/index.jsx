import React, { useEffect, useState } from 'react'
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import usePatientByPhone, { getPatient } from '../../callApi/patientByPhone';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import HeroHeader from '../../components/hero-header';

function CheckIn() {

    const [isFullFormVisible, setIsFullFormVisible] = useState(false);

    const [appointment, setAppointment] = useState([])

    const user = useSelector(selectUser);

    // const [patient, setPatient] = useState({});

    const [form] = Form.useForm();



    const getToDay = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };


    const getAppointment = async () => {
        try {
            const res = await api.get(`/appointment-patient/date/${getToDay()}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointment()
    })


    // console.log(patient.id)

    // const createRecord= async (values) =>{
    //     try {
    //         const res = await api.post('/medical-record', {
    //           name: patient.name,
    //           note: values.note,
    //           diagnosis: values.diagnosis,
    //           appointmentPatientId: patient.id
    //         });
    //         // navigate('/');
    //       } catch (error) {
    //         console.log(error)
    //         toast.error(error.response.data)
    //       }
    // }


    // console.log(patient)

    const onFinish = (values) => {
        console.log(values)
        // createRecord(values)
    }

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const handleCheckIn = ()=>{

    }

    const cancelAppointment = async (id)=>{
        console.log(id)
        try {
            await api.delete(`/appointment-patient/${id}`);
            toast.success("Cancel appoinment success")
          } catch (error) {
            console.log(error)
            toast.error(error.response.data)
          }
    }

    return (
        <>

            <HeroHeader content="Record" />


            <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                <div className="col-lg-12">
                    <div className="row">
                        <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Slot</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Patient</th>
                                        <th scope="col">Room</th>
                                        <th scope="col">Action</th>
                                        <th scope="col"></th>
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
                                                <td>
                                                    <Link  className='btn btn-primary'>Check In</Link>
                                                </td>
                                                <td>
                                                    <Link onClick={() => cancelAppointment(item?.id)}  className='btn btn-primary'>Cancel</Link>
                                                </td>
                                            </tr>
                                        ) : ""

                                        // <tr>
                                        //     <td>{formatDate(item.date)}</td>
                                        //     <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                        //     <td>{item.dentistServices.serviceDetail.name}</td>
                                        //     <td>{item.patient.name}</td>
                                        //     <td>{item.patient.age}</td>
                                        //     <td>{item.patient.address}</td>
                                        //     <td>{item.dentistServices.account.room?.name}</td>
                                        //     <td>
                                        //         <Link to={`/create-record/${item.id}`} className='btn btn-primary'>Create</Link>
                                        //     </td>
                                        // </tr>
                                    ))}

                                </tbody>
                            </table>
                        </main>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CheckIn