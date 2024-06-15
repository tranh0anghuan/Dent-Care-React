import React, { useEffect, useState } from 'react'
import HeroHeader from '../../components/hero-header'
import Appointment from '../../components/appointment'
import Team from '../../components/team'
import { Link, useParams } from 'react-router-dom'
import api from '../../config/axios'
import useServicesByClinicID from '../../callApi/serByCli'
import useClinicDetail from '../../callApi/clinicDetail'


function ClinicDetailPage() {

  const { clinic } = useClinicDetail();

  const { service } = useServicesByClinicID();

  return (
    <>

      <HeroHeader content={`${clinic.clinicName}`} />

      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row">
            {service.map((item, index) => (

              <div className="col-md-3">
                <div className="price-item pb-4">
                  <Link to={'/appointment'}>
                    <div className="position-relative">
                      <img className="img-fluid rounded-top" src={`/${item?.name}.jpg`} alt />
                      <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                        <h2 className="text-primary m-0">${item?.price}</h2>
                      </div>
                    </div>
                  </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4"><Link to={'/'} href="TeethWhiting.html">
                    <h4>{item?.name}</h4>
                    <hr className="text-primary w-50 mx-auto mt-0" />
                    <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                    <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                    <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                  </Link><Link to={'/appointment'} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>

      <Appointment />

      <Team />

    </>
  )
}

export default ClinicDetailPage