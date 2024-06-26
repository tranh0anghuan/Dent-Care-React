import React, { useEffect, useState } from 'react'
import HeroHeader from '../hero-header'
import './style.css'
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

function Record() {

    const [isFullFormVisible, setIsFullFormVisible] = useState(false);

    const [phone, setPhone] = useState('');
 
    const [patient, setPatient] = useState({});

    const [form] = Form.useForm();

    // const { patient } = usePatientByPhone(phone)



    

    const handlePhoneSubmit = async (values) => {
        setIsFullFormVisible(true);
        // setPhone(values.phone)


        const patient    = await getPatient(values.phone);
        setPatient(patient)
    };

    const handleBackClick = () => {
        setIsFullFormVisible(false);
    };

    console.log(phone)

    console.log(patient.id)

    const createRecord= async (values) =>{
        try {
            const res = await api.post('/medical-record', {
              name: patient.name,
              note: values.note,
              diagnosis: values.diagnosis,
              appointmentPatientId: patient.id
            });
            // navigate('/');
          } catch (error) {
            console.log(error)
            toast.error(error.response.data)
          }
    }
    

    console.log(patient)

    const onFinish= (values) => {
        console.log(values)
        createRecord(values)
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

    return (
        <>

            <HeroHeader content="Record" />

            <div className='container bg-light'>

                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
                    {!isFullFormVisible ? (
                        <Form
                            {...formItemLayout}
                            onFinish={handlePhoneSubmit}
                        >
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                    Next
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Form {...formItemLayout} style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Patient Name"
                                name="patientName"
                                // rules={[{ required: true, message: 'Please input patient name!' }]}
                            >
                                {/* <Input  /> */}
                                <div
                                    className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                    style={{ textAlign: 'start' }}
                                >{patient.name}</div>
                            </Form.Item>

                            <Form.Item
                                label="Age"
                                name="age"
                                // rules={[{ required: true, message: 'Please input age!' }]}
                            >
                                {/* <InputNumber min={0} max={120} style={{ width: '100%' }} /> */}
                                <div
                                    className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                    style={{ textAlign: 'start' }}
                                >{patient.age}</div>
                            </Form.Item>

                            <Form.Item
                                label="Gender"
                                name="gender"
                                // rules={[{ required: true, message: 'Please select gender!' }]}
                            >
                                {/* <Select>
                                    <Select.Option value="male">Male</Select.Option>
                                    <Select.Option value="female">Female</Select.Option>
                                    <Select.Option value="other">Other</Select.Option>
                                </Select> */}
                                <div
                                    className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                    style={{ textAlign: 'start' }}
                                >{patient.gender == true ? 'Male' : 'Female'}</div>
                            </Form.Item>



                            <Form.Item
                                label="Diagnosis"
                                name="diagnosis"
                                rules={[{ required: true, message: 'Please input diagnosis!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item
                                label="Note"
                                name="note"
                                rules={[{ required: true, message: 'Please input medical history!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px', marginRight: '8px' }}>
                                    Submit
                                </Button>
                                <Button onClick={handleBackClick}>
                                    Back
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </div>

        </>
    )
}

export default Record