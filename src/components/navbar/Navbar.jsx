import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
  
  <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
    <Link to={"/"} className="navbar-brand p-0">
      <h1 className="m-0 text-primary"><i className="fa fa-tooth me-2" />DentCare</h1>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav ms-auto py-0">
        <Link to={"/"} className="nav-item nav-link">Home</Link>
        <Link to={"/services"} className="nav-item nav-link">Services</Link>
        <div className="nav-item dropdown">
          <Link to={"/"} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
          <div className="dropdown-menu m-0">
            <Link to={"/"} className="dropdown-item">Pricing Plan</Link>
            <Link to={"/"} className="dropdown-item">Our Dentist</Link>
            <Link to={"/"} className="dropdown-item">Testimonial</Link>
            <Link to={"/"} className="dropdown-item">Appointment</Link>
          </div>
        </div>
        <Link to={"/schedule"} className="nav-item nav-link">Schedule</Link>
        <Link to={"/contact"} className="nav-item nav-link">Contact</Link>
      </div>

      <form action>
         <input type="text" className="nav-input" />
          <button type="button" className="btn text-dark" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fa-solid fa-magnifying-glass fs-5" /></button>
      </form>

      <Link to={"/login"} className="btn btn-primary py-2 px-4 ms-3">Log In</Link>
    </div>
  </nav>


     
  )
}

export default Navbar