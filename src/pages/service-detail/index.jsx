import React, { useEffect, useState } from 'react'
import About from '../../components/about'
import useServiceDetail from '../../callApi/serviceDetail';
import HeroHeader from '../../components/hero-header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Offer from '../../components/offer';
import useClinicByServicesID from '../../callApi/cliBySer';
import ScrollToTop from '../../components/scrollToTop';
import { Button, Form, Input, Pagination } from 'antd';

function ServiceDetailPage() {

    const { sid } = useParams()

    const { service } = useServiceDetail();

    const { clinic } = useClinicByServicesID();

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

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
            <HeroHeader content={`${service.name}`} />

            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
                    <Form {...formItemLayout} onFinish={handleSearch}>
                        <Form.Item label="Clinic Name" name="keyword">
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

                            <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                                <div onClick={() => navigate(`/service/${sid}/clinic/${item.id}`)} className="team-item">
                                    <div className="position-relative rounded-top"  style={{ zIndex: 1 }}>
                                        <img className="rounded-top w-100" style={{objectFit: "cover"}} width={400} height={300}  src={item?.url} alt />
                                        <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-twitter fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-facebook-f fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-linkedin-in fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-instagram fw-normal" /></a>
                                        </div>
                                    </div>
                                    <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5" style={{height:'180px'}}>
                                        <h4 className="mb-2">{item?.clinicName}</h4>
                                        <p className="text-primary mb-0">{item?.address}</p>
                                    </div>
                                </div>
                            </div>

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

            <div className="container-fluid bg-offer my-5 py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 wow zoomIn" data-wow-delay="0.6s">
                            <div className="offer-text text-center rounded p-5">
                                <h1 className="display-5 text-white">Save 30% On Your First Dental Checkup</h1>
                                <p className="text-white mb-4">We're excited to introduce our First Dental Checkup Package, an exclusive offer designed to provide new patients with a comprehensive introduction to our high-quality dental care services at a special rate. This package includes everything you need for a thorough initial assessment and a healthy start to your dental journey with us</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <div className="section-title mb-4">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Description</h5>
                                <h1 className="display-5 mb-0">What is {service.name}? Is {service.name} Good?</h1>
                            </div>
                            <h4 className="text-body fst-italic mb-4">At DentCare, we are dedicated to providing exceptional dental care in a warm and welcoming environment</h4>
                            <p className="mb-4">{service.description}</p>
                            <div className="row g-3">
                                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.3s">
                                    <h5 className="mb-3"><i className="fa fa-check-circle text-primary me-3" />Award Winning</h5>
                                    <h5 className="mb-3"><i className="fa fa-check-circle text-primary me-3" />Professional Staff</h5>
                                </div>
                                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                                    <h5 className="mb-3"><i className="fa fa-check-circle text-primary me-3" />24/7 Opened</h5>
                                    <h5 className="mb-3"><i className="fa fa-check-circle text-primary me-3" />Fair Prices</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5" style={{ minHeight: 500 }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s"  src={service?.url} style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ServiceDetailPage