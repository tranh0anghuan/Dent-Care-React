import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useAppointmentByPatientID = (id) => {


    const [appointment, setAppointment] = useState([])
    const [loading, setLoading] = useState(false)

    const getAppointment = async () => {
        try {
            setLoading(true)
            const res = await api.get(`/appointment-patient/patient/id/${id}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getAppointment()
    }, []);

    return { appointment,setAppointment, loading};
};

export default useAppointmentByPatientID;
