import React from 'react'
import Carousel from '../../components/carousel'
import Services from '../../components/services'
import Offer from '../../components/offer'
import Team from '../../components/team'
import About from '../../components/about'

function HomePage() {
  return (
    <>
        <Carousel/>
        <About/>
        <Services/>
        <Offer/>
        <Team/>
    </>
  )
}

export default HomePage