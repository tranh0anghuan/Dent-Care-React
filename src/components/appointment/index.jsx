import React, { useEffect, useState } from 'react'
import useClinics from '../../callApi/clinic';
import useDentists from '../../callApi/dentists';
import useServices from '../../callApi/services';
import { Button, DatePicker, Form, Input, Modal, Radio, Select, Space } from 'antd';
import useSlot from '../../callApi/slot';
import './style.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useClinicByID from '../../callApi/cliByID';
import api from '../../config/axios';
import { useForm } from 'antd/es/form/Form';
import useServiceByID from '../../callApi/serviceByID';
import useDentistByID from '../../callApi/dentistByID';
import useDentistsByClinicAndService from '../../callApi/dentByCliandSer';
import { toast } from 'react-toastify';
import { setLogLevel } from 'firebase/app';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import useSlotByDentistID from '../../callApi/slotByDen';

function Appointment() {

    const user = useSelector(selectUser)


    const { id, sid, did } = useParams()
    const [form] = Form.useForm();

    const { clinic } = useClinicByID(id);
    const { service } = useServiceByID(sid);
    const { dentist } = useDentistByID(did);

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };


    const {slot} = useSlotByDentistID(did);


    // const [service, setService] = useState([])

    // const [clinic, setClinic] = useState({})
    // const [dentist, setDentist] = useState([]);
    // const role = 'DENTIST';

    // const [slot, setSlot] = useState([])

    // const getSlot = async () => {
    //     try {
    //         const res = await api.get('/slot')
    //         setSlot(res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const getDentists = async () => {
    //     try {
    //         const res = await api.get(`/account/role/${role}`);
    //         setDentist(res.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    // const getClinics = async () => {
    //     try {
    //         const res = await api.get(`/clinic/${id}`)
    //         const services = res.data.serviceDetails
    //         setClinic(res.data)
    //         setService(services.filter(item => item.id == sid)[0])
    //         form.setFieldValue("clinicID",res.data.clinicName)
    //         form.setFieldValue("serviceID",services.filter(item => item.id == sid)[0].name)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // form.setFieldValue("clinicID",clinic.clinicName)
    // form.setFieldValue("serviceID",service.name)
    // form.setFieldValue("dentistID",dentist.fullName)
    form.setFieldValue("clinicID", clinic.id)
    form.setFieldValue("serviceID", service.id)
    form.setFieldValue("dentistID", dentist.id)
    // useEffect(() => {
    // }, []);

    // useEffect(() => {
    //     if (clinic && clinic.id) {
    //         form.setFieldsValue({ clinicID: clinic.clinicName });
    //     }
    // }, [clinic, form]);



    const { Option } = Select;

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },


    };

    // const handleOnFinish = (values) => {
    //     show();
    //     console.log(values)
    // };

    // const show = () => {
    //     Modal.confirm({
    //         title: 'Confirm',
    //         content: 'Bla bla ...',
    //         footer: (_, { OkBtn, CancelBtn }) => (
    //             <>
    //                 <Button>Custom Button</Button>
    //                 <CancelBtn />
    //                 <OkBtn />
    //             </>
    //         ),
    //     });
    // }

    const onFinish = (values) => {
        // console.log(values);
        show(values); // Pass the values to the show function
    };
    
    const show = (values) => {
        Modal.confirm({
            title: 'Confirm',
            content: 'Before booking service, you need to pay deposit in advance 100,000 VND',
            footer: (_, { CancelBtn }) => (
                <>
                    <Button
                     className='btn btn-primary'
                     style={{borderRadius: '6px'}}
                        onClick={() => {
                            // Log values or perform any other operations here
                            console.log(values);
                            Modal.destroyAll(); // Close the modal
                        }}
                    >
                        OK
                    </Button>
                    <CancelBtn />
                </>
            ),
        });
    };


  

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <div className="container-fluid bg-primary bg-appointment my-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-6 py-5">
                            <div className="py-5">
                                <h1 className="display-5 text-white mb-4">We Are A Certified and Award Winning Dental Clinic You Can Trust</h1>
                                <p className="text-white mb-0">As a certified and award-winning dental clinic, we pride ourselves on delivering exceptional dental care that you can trust. Our commitment to excellence and patient satisfaction has earned us recognition in the industry, ensuring you receive the highest quality of service every time you visit.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                                <h1 className="text-white mb-4">Make Appointment</h1>



                                <Form
                                    {...layout}
                                    form={form}
                                    name="appointment-form"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    style={{ maxWidth: 800 }}
                                >
                                    <Form.Item
                                        name="clinicID"
                                        label="Select Clinic"
                                        rules={[{ required: true, message: 'Please select a clinic!' }]}

                                    >
                                        {/* <Select placeholder="Select Clinic">
                                            {clinic.map((item) => (
                                                <Option key={item.id} value={item.id}>{item.clinicName}</Option>
                                            ))}
                                        </Select> */}
                                        {/* <Input readOnly /> */}
                                        <div
                                            className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                            style={{ textAlign: 'start' }}
                                        >{clinic.clinicName}</div>
                                        <Input type='hidden' />
                                    </Form.Item>

                                    <Form.Item
                                        name="serviceID"
                                        label="Select Service"

                                        rules={[{ required: true, message: 'Please select a service!' }]}
                                    >
                                        {/* <Input readOnly /> */}
                                        {/* <Select placeholder="Select Clinic">
                                            {service.map((item) => (
                                                <Option value={item.id}>{item.name}</Option>
                                            ))}
                                        </Select> */}
                                        {/* <Input readOnly/> */}
                                        <div
                                            className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                            style={{ textAlign: 'start' }}
                                        >{service.name}</div>
                                        <Input type='hidden' />
                                    </Form.Item >

                                    {did && <Form.Item
                                        name="dentistID"
                                        label="Select Doctor"
                                        rules={[{ required: true, message: 'Please select a doctor!' }]}
                                    >
                                        {/* <Select placeholder="Select Doctor">
                                            {dentist.map((item) => (
                                                <Option key={item.id} value={item.id}>{item.fullName}</Option>
                                            ))}
                                        </Select> */}
                                        {/* <Input readOnly /> */}
                                        <div
                                            className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                            style={{ textAlign: 'start' }}
                                        >{dentist.fullName}</div>
                                        <Input type='hidden' />
                                    </Form.Item>}

                                    <Form.Item
                                        name="date"
                                        label="Select Date"
                                        rules={[{ required: true, message: 'Please select a date!' }]}
                                    >
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            onChange={(date, dateString) => console.log('Selected Date:', dateString)}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="slotID"
                                        label="Select Slot"
                                        rules={[{ required: true, message: 'Please select a slot!' }]}
                                    >
                                        <Select placeholder="Select Slot">
                                            {slot.map((item) => (
                                                <Option key={item.id} value={item.id}>
                                                    Slot {item.id}: {item.startTime} - {item.endTime}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="name"
                                        label="Name"
                                        rules={[{ required: true, message: 'Please enter your name!' }]}
                                    >
                                        <Input placeholder="Name" />
                                    </Form.Item>

                                    <Form.Item
                                        name="age"
                                        label="Age"
                                        rules={[{ required: true, message: 'Please enter your age!' }]}
                                    >
                                        <Input placeholder="Age" />
                                    </Form.Item>

                                    <Form.Item
                                        name="gender"
                                        label="Select Gender"
                                        rules={[{ required: true, message: 'Please select your gender!' }]}
                                    >
                                        <Select placeholder="Select Gender">
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        rules={[{ required: true, message: 'Please enter your address!' }]}
                                    >
                                        <Input placeholder="Address" />
                                    </Form.Item>

                                    <Form.Item
                                        name="phone"
                                        label="Phone"
                                        rules={[{ required: true, message: 'Please enter your phone number!' }]}
                                    >
                                        <Input placeholder="Phone" />
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[{ required: true, message: 'Please enter your email!' }]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>

                                    <Form.Item {...tailLayout}>
                                        <Space>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="btn btn-primary btn-lg appointment-btn"
                                                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem' }}
                                            >
                                                Make Appointment
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>






        </>
    )
}

export default Appointment