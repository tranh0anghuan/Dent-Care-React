import React from 'react'
import Carousel from '../../components/carousel'
import Services from '../../components/services'
import Offer from '../../components/offer'
import Team from '../../components/team'
import About from '../../components/about'
import Appointment from '../../components/appointment'
import Clinic from '../../components/clinic'

function HomePage() {
  return (
    <>
        <Carousel/>
        <About/>
        <Appointment/>
        <Services/>
        <Offer/>
        <Clinic/>
    </>
  )
}

export default HomePage