import React, { useEffect, useState } from 'react'
import HeroHeader from '../../components/hero-header'
import Appointment from '../../components/appointment'
import Team from '../../components/team'
import ServicesItem from '../../components/services-item'
import { useParams } from 'react-router-dom'
import api from '../../config/axios'

function ClinicDetailPage() {
  const {id} = useParams()

  const [clinic, setClinic] = useState({})
  
  const getClinicDetail = async () =>{

    const res= await api.get(`/clinic/${id}`)

    console.log(res.data)

    setClinic(res.data)

  }

  useEffect(() => {
    getClinicDetail()
  },[])

  return (
    <>
    
        <HeroHeader content={`${clinic.clinicName}`}/>

        <ServicesItem/>

        <Appointment/>

        <Team/>
    
    </>
  )
}

export default ClinicDetailPage