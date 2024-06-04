import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3">
        <a href="index.html" class="navbar-brand">
            <h1 class="m-0 text-primary"><i class="fa fa-tooth me-2"></i>DentCare</h1>
        </a>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0">
                <a href="index.html" class="nav-item nav-link active">Home</a>
                <a href="about.html" class="nav-item nav-link">About</a>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                    <div class="dropdown-menu m-0">
                        <a href="price.html" class="dropdown-item">Service</a>
                        <a href="team.html" class="dropdown-item">Our Dentist</a>
                        <a href="appointment.html" class="dropdown-item">Appointment</a>
                        <a href="record.html" class="dropdown-item">Record</a>

                    </div>
                </div>
                <a href="contact.html" class="nav-item nav-link">Contact</a>
                <a href="schedule.html" class="nav-item nav-link">Schedule</a>

            </div>

            <form action="">
                <input type="text" class="nav-input"/>
                <button type="button" class="btn text-dark" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fa-solid fa-magnifying-glass fs-5"></i></button>
            </form>

            <Link to={"/login"} class="btn btn-primary py-2 px-4 ms-3">Log In cc</Link>

        </div>
    </nav>
  )
}

export default Navbar