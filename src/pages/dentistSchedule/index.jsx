import React from 'react'
import HeroHeader from '../../components/hero-header'
import { Link } from 'react-router-dom'
import useAppointmentByDentistID from '../../callApi/appointmentByDentistID'

function DentistSchedule() {

    const { appointment } = useAppointmentByDentistID()


    return (
        <>
            <HeroHeader content="Dentist Schedule" />

            <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                <div className="col-lg-12">
                    <div className="row">
                        <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Clinic</th>
                                        <th scope="col">Slot</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Patient</th>
                                        <th scope="col">Room</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointment.map((item, index) => (
                                        <tr>
                                            <td>{item.date}</td>
                                            <td>{item.dentistServices.account.dentalClinic.address}</td>
                                            <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                            <td>{item.dentistServices.serviceDetail.name}</td>
                                            <td>{item.patient.name}</td>
                                            <td>{item.dentistServices.account.room?.name}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </main>
                    </div></div></div>



        </>
    )
}

export default DentistSchedule