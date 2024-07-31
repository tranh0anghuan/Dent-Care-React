import React from 'react'
import ServicesItem from '../../components/services-item'
import './style.css'
import Services from '../../components/services'
import HeroHeader from '../../components/hero-header'

function ServicesPage() {
  return (
    <>
         <HeroHeader content={'Services'}/>

        <Services/>

    </>
  )
}

export default ServicesPage