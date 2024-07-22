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
import useSlot from '../../callApi/slot';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

function RegisterDayOff() {


    const [form] = Form.useForm();

    // const { slot } = useSlot()

    const [date, setDate] = useState('');

    const [slot, setSlot] = useState([]);

    const user = useSelector(selectUser);

    const navigate= useNavigate()

    const [loading, setLoading] = useState(false)


    const onFinish = (values) => {
        console.log(values.date.format('YYYY-MM-DD'))
        setLoading(true)
        register(values)
    }

    const register = async(values)=>{
        try {
            await api.post('/working-day-off',{
                dayOff: values.date.format('YYYY-MM-DD'),
                dentistId: user.id,
                slotId: values.slotID
            })
            toast.success('Register day off successfully')
            
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
            navigate('/day-off')
        }
    }

    const getDate = async (value) => {
        const datee = value.format('YYYY-MM-DD');
        setDate(datee);
        try {
            const res = await api.get(`/slot/available/dentist/${user.id}/day-off/${datee}`);
            console.log(res.data)
            setSlot(res.data);
        } catch (error) {
            console.log(error);
        }
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
                            <DatePicker onChange={getDate} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="slotID"
                            label="Select Slot"
                            rules={[{ required: true, message: 'Please select a slot!' }]}
                        >
                            <Select placeholder="Select Slot">
                                {slot?.map((item) => (
                                    <Select.Option key={item.id} value={item.id} disabled={!item.available}>
                                        Slot {item.id}: {item.startTime} - {item.endTime}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>


                        <Form.Item {...tailFormItemLayout}>
                            <Button loading={loading} type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
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