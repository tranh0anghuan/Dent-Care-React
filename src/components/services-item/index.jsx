import React from 'react'
import HeroHeader from '../hero-header'
import { Link } from 'react-router-dom'

function ServicesItem() {
  return (
    
    <>

        <HeroHeader/>

        <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="row">
                <div className="col-md-3">
                    <div className="price-item pb-4">
                    <Link to={'/Teeth Whitening'}>
                        <div className="position-relative">
                        <img className="img-fluid rounded-top" src="/price-1.jpg" alt />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">$35</h2>
                        </div>
                        </div>
                    </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="TeethWhiting.html">
                        <h4>Teeth Whitening</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                        </Link><Link to={'/appointment'} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="price-item pb-4">
                    <Link to={'/Implant'} href="Implant.html">
                        <div className="position-relative">
                        <img className="img-fluid rounded-top" src="/price-2.jpg" alt />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">$49</h2>
                        </div>
                        </div>
                    </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="Implant.html">
                        <h4>Dental Implant</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                        </Link><Link to={'/'} href="appointment.html" className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="price-item pb-4">
                    <Link to={'/'} href="Wisdom.html">
                        <div className="position-relative">
                        <img className="img-fluid rounded-top" src="/price-3.jpg" alt />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">$99</h2>
                        </div>
                        </div>
                    </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="Wisdom.html">
                        <h4>Wisdom teeth</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                        </Link><Link to={'/'} href="appointment.html" className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="price-item pb-4">
                    <Link to={'/'} href="Ceramic.html">
                        <div className="position-relative">
                        <img className="img-fluid rounded-top" src="/price-4.jpg" alt />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">$60</h2>
                        </div>
                        </div>
                    </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="Ceramic.html">
                        <h4>Ceramic tooth</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                        </Link><Link to={'/'} href="appointment.html" className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="price-item pb-4">
                    <Link to={'/'} href="Orthdontics.html">
                        <div className="position-relative">
                        <img className="img-fluid rounded-top " src="/price-5.jpg" alt id="price-5" />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">$60</h2>
                        </div>
                        </div>
                    </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="Orthdontics.html">
                        <h4>Orthodontics</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                        </Link><Link to={'/'} href="appointment.html" className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="price-item pb-4">
                    <Link to={'/'} href="Dentures.html">
                        <div className="position-relative">
                        <img className="img-fluid rounded-top" src="/price-6.jpg" alt />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">$80</h2>
                        </div>
                        </div>
                    </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="Dentures.html">
                        <h4>Dentures</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                        </Link><Link to={'/'} href="appointment.html" className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="price-item pb-4">
                    <Link to={'/Tooth Extraction'} >
                        <div className="position-relative">
                        <img className="img-fluid rounded-top" src="/price-7.jpg" alt />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">$45</h2>
                        </div>
                        </div>
                    </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="Tooth Extraction.html">
                        <h4>Tooth Extraction</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                        </Link><Link to={'/'} href="appointment.html" className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="price-item pb-4">
                    <Link to={'/Routine'} href="Routine.html">
                        <div className="position-relative">
                        <img className="img-fluid rounded-top" src="/price-8.jpg" alt />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">$30</h2>
                        </div>
                        </div>
                    </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="Routine.html">
                        <h4>Routine Dental Check</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                        </Link><Link to={'/'} href="appointment.html" className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>



    </>
  )
}

export default ServicesItem