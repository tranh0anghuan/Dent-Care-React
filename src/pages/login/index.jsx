import React from 'react'
import './style.css'

function LoginPage() {
  return (
<section className="vh-100 d-flex align-items-center">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        {/* <img src="img/carousel-1.jpg"
          class="img-fluid" alt="Sample image"> */}
        <h1 className="my-5 display-3 fw-bold ls-tight text-primary">
          DentCare
        </h1>
        <p style={{color: 'hsl(217, 10%, 50.8%)'}}>We believe in delivering the highest standard of dental care. Our state-of-the-art facility is equipped with the latest technology and adheres to the strictest hygiene protocols to ensure your safety and comfort.
        </p>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
        <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-2" style={{fontSize: '1.5rem', borderRadius: '50%'}}>
              <i className="fa-brands fa-facebook" /> 
            </button>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-2" style={{fontSize: '1.5rem', borderRadius: '50%'}}>
              <i className="fa-brands fa-twitter" />
            </button>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-2" style={{fontSize: '1.5rem', borderRadius: '50%'}}>
              <i className="fa-brands fa-linkedin" />
            </button>
          </div>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>
          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
          </div>
          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {/* Checkbox */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body" style={{textDecoration: 'none'}}>Forgot password?</a>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="signup.html" className="link-danger" style={{textDecoration: 'none'}}>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>


  )
}

export default LoginPage