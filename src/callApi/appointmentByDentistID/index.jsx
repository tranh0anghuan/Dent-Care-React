import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

const useAppointmentByDentistID = () => {

    const user = useSelector(selectUser)

    const [appointment, setAppointment] = useState([])

    const getAppointment = async () => {
        try {
            const res = await api.get(`/appointment-patient/dentist/${user.id}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointment()
    }, []);

    return { appointment};
};

export default useAppointmentByDentistID;
