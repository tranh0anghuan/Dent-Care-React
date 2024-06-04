import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (

    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3">
    <Link to={"/"} className="navbar-brand">
        <h1 className="m-0 text-primary"><i className="fa fa-tooth me-2" />DentCare</h1>
    </Link>
    <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
        <Link to={"/"} className="nav-item nav-link active">Home</Link>
        <Link to={"/about"} className="nav-item nav-link">About</Link>
        <div className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
            <div className="dropdown-menu m-0">
            <Link to={"/"} className="dropdown-item">Services</Link>
            <Link to={"/"} className="dropdown-item">Our Dentist</Link>
            <Link to={"/"} className="dropdown-item">Appointment</Link>
            <Link to={"/"} className="dropdown-item">Record</Link>
            <Link to={"/"} className="dropdown-item">Owner</Link>
            <Link to={"/"} className="dropdown-item">Admin</Link>
            </div>
        </div>
        <Link to={"/"} className="nav-item nav-link">Contact</Link>
        <Link to={"/"} className="nav-item nav-link">Schedule</Link>
        </div>
        <form action>
        <input type="text" className="nav-input" />
        <button type="button" className="btn text-dark" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fa-solid fa-magnifying-glass fs-5" /></button>
        </form>
        <Link to={"/"} className="btn btn-primary py-2 px-4 ms-3">Log In</Link>
    </div>
    </nav>

     
  )
}

export default Navbar