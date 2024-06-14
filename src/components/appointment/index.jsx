import React from 'react'
import useClinics from '../../callApi/clinic';
import useDentists from '../../callApi/dentists';
import useServices from '../../callApi/services';
import { DatePicker, Space } from 'antd';

function Appointment() {

    const { clinic } = useClinics();
    const { service } = useServices();
    const { dentist } = useDentists();

    const onOk = (value) => {
        console.log('onOk: ', value);
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
                                <form>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <select className="form-select bg-light border-0" style={{ height: 55 }}>
                                                <option selected>Select Clinic</option>
                                                {clinic.map((item, index) => (
                                                    <option value={1}>{item?.clinicName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select className="form-select bg-light border-0" style={{ height: 55 }}>
                                                <option selected>Select Service</option>
                                                {service.map((item, index) => (
                                                    <option value={1}>{item?.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select className="form-select bg-light border-0" style={{ height: 55 }}>
                                                <option selected>Select Doctor</option>
                                                {dentist.map((item, index) => (
                                                    <option value={1}>{item?.fullName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="text" className="form-control bg-light border-0" placeholder="Your Name" style={{ height: 55 }} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="email" className="form-control bg-light border-0" placeholder="Your Email" style={{ height: 55 }} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="date" id="date1" data-target-input="nearest">
                                                {/* <input type="text" className="form-control bg-light border-0 datetimepicker-input" placeholder="Appointment Date" data-target="#date1" data-toggle="datetimepicker" style={{ height: 55 }} /> */}
                                                <Space direction="vertical" size={12}>
                                            <DatePicker
                                                showTime
                                                onChange={(value, dateString) => {
                                                    console.log('Selected Time: ', value);
                                                    console.log('Formatted Selected Time: ', dateString);
                                                }}
                                                
                                                onOk={onOk}
                                            />
                                            {/* <RangePicker
                                                showTime={{
                                                    format: 'HH:mm',
                                                }}
                                                format="YYYY-MM-DD HH:mm"
                                                onChange={(value, dateString) => {
                                                    console.log('Selected Time: ', value);
                                                    console.log('Formatted Selected Time: ', dateString);
                                                }}
                                                onOk={onOk}
                                            /> */}
                                        </Space>
                                            </div>
                                        </div>
                                        
                                        <div className="col-12">
                                            <button className="btn btn-dark w-100 py-3" type="submit">Make Appointment</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Appointment