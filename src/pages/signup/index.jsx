import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function SignupPage() {
  return (
<section className="vh-100 d-flex align-items-center">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100 wow fadeInUp" data-wow-delay="0.1s">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <Link to={'/'}> 
            <h1 className="my-5 display-3 fw-bold ls-tight text-primary">
            DentCare
            </h1>
        </Link>
        <p style={{color: 'hsl(217, 10%, 50.8%)'}}>We believe in delivering the highest standard of dental care. Our state-of-the-art facility is equipped with the latest technology and adheres to the strictest hygiene protocols to ensure your safety and comfort.
        </p>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 wow zoomIn" data-wow-delay="0.6s">
        <form>
          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Email address" />
          </div>
          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Password" />
          </div>
          <div data-mdb-input-init className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Confirm Password" />
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Sign up</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Already haved an account? <Link to={'/login'} className="link-danger" style={{textDecoration: 'none'}}>Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>


  )
}

export default SignupPage