import React, { useEffect, useState } from 'react'
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeroHeader from '../../components/hero-header';
import useRecordByAppointmentID from '../../callApi/recordByAppointmentID';
import useTreatmentByID from '../../callApi/treatmentPlanByID';
import useAppointmentByID from '../../callApi/appointmentByID';

function RegisterDayOff() {


    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log(values.date.format('YYYY-MM-DD'))
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
            <HeroHeader content="Register Day Off" />
            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>

                    <Form
                        {...formItemLayout}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            name="date"
                            label="Select Date"
                            rules={[{ required: true, message: 'Please select a date!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>


                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>


        </>
    )
}

export default RegisterDayOff