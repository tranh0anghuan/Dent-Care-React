import React from 'react'
import Carousel from '../../components/carousel'
import Services from '../../components/services'
import Offer from '../../components/offer'
import Team from '../../components/team'
import Testimonial from '../../components/testimonial'
import About from '../../components/about'

function HomePage() {
  return (
    <>
        <Carousel/>
        <Services/>
        <Offer/>
        <Team/>
        <About/>
    </>
  )
}

export default HomePage