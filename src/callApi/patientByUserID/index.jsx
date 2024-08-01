import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const usePatientByUserID = (id) => {


    const [patient, setPatient] = useState([])
    const [loading, setLoading] = useState(false);


    const getPatient = async () => {
        try {
            setLoading(true)
            const res = await api.get(`/patient/customer/${id}`)
            setPatient(res.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getPatient()
    }, []);

    return { patient, loading, setLoading};
};

export default usePatientByUserID;
