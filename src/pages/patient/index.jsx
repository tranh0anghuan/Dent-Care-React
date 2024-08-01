import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/counterSlice'
import usePatientByUserID from '../../callApi/patientByUserID'
import HeroHeader from '../../components/hero-header'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, Popconfirm, Table } from 'antd'

function Patient() {

    const user = useSelector(selectUser)

    const { patient, loading } = usePatientByUserID(user.id)

    const navigate = useNavigate()

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(patient);
    }, [patient]);

    const handleSearch = (values) => {
        console.log(values.keyword)
        setData(patient.filter(s => s.name.toLowerCase().includes(values.keyword.toLowerCase())));
    };


    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            render: (patient) => (
                <div>
                    <Button
                        className='btn btn-primary'
                        onClick={() => {
                            navigate(`/patient-schedule/${patient.id}`)
                        }}
                    >
                        View
                    </Button>
                </div>
            ),
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
            <HeroHeader content="Patient" />

            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
                    <Form {...formItemLayout} onFinish={handleSearch}>
                        <Form.Item label="Full Name" name="keyword">
                            <Input/>
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
                            <Table dataSource={data} columns={columns} loading={loading} />
                        </main>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Patient