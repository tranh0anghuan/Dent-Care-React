import React from 'react'
import HeroHeader from '../../components/hero-header'
import Appointment from '../../components/appointment'
import Team from '../../components/team'
import ServicesItem from '../../components/services-item'

function ClinicDetailPage() {
  return (
    <>
    
        <HeroHeader content={'Dental Clinic '}/>

        <ServicesItem/>

        <Appointment/>

        <Team/>
    
    </>
  )
}

export default ClinicDetailPage