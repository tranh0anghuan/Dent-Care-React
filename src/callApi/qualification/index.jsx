import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useQualification = () => {


    const [qualification, setQualification] = useState([])

    const getQualification = async () => {
        try {
            const res = await api.get(`/qualification`)
            setQualification(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQualification()
    }, []);

    return { qualification};
};

export default useQualification;
