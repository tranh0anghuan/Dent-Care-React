import React, { useState, useEffect } from 'react'
import api from '../../config/axios';


function Services() {
    const [service, setService] = useState([])

    const getServices = async () => {
        try {
            const res = await api.get('/service')
            console.log(res.data);
            setService(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getServices()
    }, []);


    return (

        <>
            <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row g-5 mb-5">
                        <div className="col-lg-5 wow zoomIn" data-wow-delay="0.3s" style={{ minHeight: 400 }}>
                            <div className="twentytwenty-container position-relative h-100 rounded overflow-hidden">
                                <img className="position-absolute w-100 h-100" src="/after.jpg" style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="section-title mb-5">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Services</h5>
                                <h1 className="display-5 mb-0">We Offer The Best Quality Dental Services</h1>
                            </div>
                            <div className="row g-5">
                                {service.map((item, index) => (
                                    index < 2 && (
                                        <div className="col-md-6 service-item wow zoomIn" data-wow-delay="0.6s">
                                            <div className="rounded-top overflow-hidden">
                                                <img className="img-fluid" src={`/${item?.name}.jpg`} alt />
                                            </div>
                                            <div className="position-relative bg-light rounded-bottom text-center p-4">
                                                <h5 className="m-0">{item?.name}</h5>
                                            </div>
                                        </div>
                                    )
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="row g-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="col-lg-7">
                            <div className="row g-5">
                                {service.map((item, index) => (
                                    index >= 2 && index < 4 && (
                                        <div className="col-md-6 service-item wow zoomIn" data-wow-delay="0.3s">
                                        <div className="rounded-top overflow-hidden">
                                            <img className="img-fluid" src={`/${item?.name}.jpg`} alt />
                                        </div>
                                        <div className="position-relative bg-light rounded-bottom text-center p-4">
                                            <h5 className="m-0">{item?.name}</h5>
                                        </div>
                                    </div>
                                    )
                                ))}

                            </div>
                        </div>
                        <div className="col-lg-5 service-item wow zoomIn" data-wow-delay="0.9s">
                            <div className="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                                <h3 className="text-white mb-3">Make Appointment</h3>
                                <p className="text-white mb-3">Clita ipsum magna kasd rebum at ipsum amet dolor justo dolor est magna stet eirmod</p>
                                <h2 className="text-white mb-0">+012 345 6789</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Services