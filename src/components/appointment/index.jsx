import React, { useState } from 'react'
import useClinics from '../../callApi/clinic';
import useDentists from '../../callApi/dentists';
import useServices from '../../callApi/services';
import { Button, DatePicker, Form, Input, Radio, Select, Space } from 'antd';
import useSlot from '../../callApi/slot';
import './style.css'

function Appointment() {

    const { clinic } = useClinics();
    const { service } = useServices();
    const { dentist } = useDentists();
    const { slot } = useSlot();

    const { Option } = Select;

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
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
                                    style={{ maxWidth: 800 }}
                                >
                                    <Form.Item
                                        name="clinicID"
                                        label="Select Clinic"
                                        rules={[{ required: true, message: 'Please select a clinic!' }]}
                                    >
                                        <Select placeholder="Select Clinic">
                                            {clinic.map((item) => (
                                                <Option key={item.id} value={item.id}>{item.clinicName}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="serviceID"
                                        label="Select Service"
                                        rules={[{ required: true, message: 'Please select a service!' }]}
                                    >
                                        <Select placeholder="Select Service">
                                            {service.map((item) => (
                                                <Option key={item.id} value={item.id}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="dentistID"
                                        label="Select Doctor"
                                        rules={[{ required: true, message: 'Please select a doctor!' }]}
                                    >
                                        <Select placeholder="Select Doctor">
                                            {dentist.map((item) => (
                                                <Option key={item.id} value={item.id}>{item.fullName}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

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
                                            <Button type="primary" htmlType="submit" className="btn btn-primary btn-lg appointment-btn" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem' }}>
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