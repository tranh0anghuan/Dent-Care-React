import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ScrollToTop from '../scrollToTop'
import api from '../../config/axios'
import useClinics from '../../callApi/clinic';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { Button, Form, Input, Modal, Pagination } from 'antd';

function Clinic() {

    const { clinic } = useClinics();

    const user = useSelector(selectUser)

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setData(clinic);
    }, [clinic]);

    const handleSearch = (values) => {
        setData(clinic.filter(s => s.clinicName.toLowerCase().includes(values.keyword.toLowerCase())));
        setCurrentPage(1); // Reset to first page after search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate the items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const show = () => {
        Modal.confirm({
            title: 'Info',
            content: 'Before booking service, you need log in',
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <Button
                        className='btn btn-primary'
                        style={{ borderRadius: '6px' }}
                        onClick={() => {
                            navigate('/login')
                            Modal.destroyAll(); // Close the modal
                        }}
                    >Log in</Button>
                    <CancelBtn />
                </>
            ),
        });
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

            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
                    <Form {...formItemLayout} onFinish={handleSearch}>
                        <Form.Item label="Clinic Name" name="keyword">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
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

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                            <div className="section-title bg-light rounded h-100 p-5">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Dentist</h5>
                                <h1 className="display-6 mb-4">Cutting-edge equipment ensures optimal treatment</h1>
                            </div>
                        </div>
                        {currentData.map((item, index) => (

                            item.clinicEnum == 'ACTIVE' ? (
                                <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                                    {
                                        user ? (<Link to={`/clinic/${item.id}`} onClick={ScrollToTop} className="team-item">
                                            <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                                <img className="rounded-top w-100" style={{ objectFit: "cover" }} width={400} height={300} src={item?.url} alt />
                                                <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                                    <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-twitter fw-normal" /></a>
                                                    <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-facebook-f fw-normal" /></a>
                                                    <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-linkedin-in fw-normal" /></a>
                                                    <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-instagram fw-normal" /></a>
                                                </div>
                                            </div>
                                            <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5" style={{ height: '180px' }}>
                                                <h4 className="mb-2">{item?.clinicName}</h4>
                                                <p className="text-primary mb-0">{item?.address}</p>
                                            </div>
                                        </Link>) :
                                            (<div onClick={show} className="team-item">
                                                <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                                    <img className="rounded-top w-100" style={{ objectFit: "cover" }} width={400} height={300} src={item?.url} alt />
                                                    <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                                        <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-twitter fw-normal" /></a>
                                                        <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-facebook-f fw-normal" /></a>
                                                        <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-linkedin-in fw-normal" /></a>
                                                        <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-instagram fw-normal" /></a>
                                                    </div>
                                                </div>
                                                <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5" style={{ height: '180px' }}>
                                                    <h4 className="mb-2">{item?.clinicName}</h4>
                                                    <p className="text-primary mb-0">{item?.address}</p>
                                                </div>
                                            </div>)
                                    }

                                </div>
                            ) : ""
                        ))}
                    </div>
                    <Pagination
                        className='d-flex justify-content-center mt-5'
                        current={currentPage}
                        total={data.length}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </>

    )
}

export default Clinic