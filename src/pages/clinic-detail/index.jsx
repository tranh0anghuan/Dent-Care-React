import React from 'react'
import HeroHeader from '../../components/hero-header'
import Services from '../../components/services'
import Appointment from '../../components/appointment'
import Team from '../../components/team'

function ClinicPage() {
  return (
    <>
    
        <HeroHeader content={'Dental Clinic '}/>

        <Services/>

        <Appointment/>

        <Team/>
    
    </>
  )
}

export default ClinicPage