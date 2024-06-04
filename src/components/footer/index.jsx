import React from 'react'

function Footer() {
  return (
    <div>
  {/* Newsletter Start */}
  <div className="container-fluid position-relative pt-5 " style={{zIndex: 1}}>
    <div className="container">
      <div className="bg-primary p-5">
        <form className="mx-auto" style={{maxWidth: 600}}>
          <div className="input-group">
            <input type="text" className="form-control border-white p-3" placeholder="Your Email" />
            <button className="btn btn-dark px-4">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* Newsletter End */}
  {/* Footer Start */}
  <div className="container-fluid bg-dark text-light py-5 " style={{marginTop: '-75px'}}>
    <div className="container pt-5">
      <div className="row g-5 pt-4">
        <div className="col-lg-3 col-md-6">
          <h3 className="text-white mb-4">Quick Links</h3>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Home</a>
            <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />About Us</a>
            <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Our Services</a>
            <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Latest Blog</a>
            <a className="text-light" href="#"><i className="bi bi-arrow-right text-primary me-2" />Contact Us</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <h3 className="text-white mb-4">Popular Links</h3>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Home</a>
            <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />About Us</a>
            <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Our Services</a>
            <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Latest Blog</a>
            <a className="text-light" href="#"><i className="bi bi-arrow-right text-primary me-2" />Contact Us</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <h3 className="text-white mb-4">Get In Touch</h3>
          <p className="mb-2"><i className="bi bi-geo-alt text-primary me-2" />123 Street, New York, USA</p>
          <p className="mb-2"><i className="bi bi-envelope-open text-primary me-2" />info@example.com</p>
          <p className="mb-0"><i className="bi bi-telephone text-primary me-2" />+012 345 67890</p>
        </div>
        <div className="col-lg-3 col-md-6">
          <h3 className="text-white mb-4">Follow Us</h3>
          <div className="d-flex">
            <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#"><i className="fab fa-twitter fw-normal" /></a>
            <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#"><i className="fab fa-facebook-f fw-normal" /></a>
            <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#"><i className="fab fa-linkedin-in fw-normal" /></a>
            <a className="btn btn-lg btn-primary btn-lg-square rounded" href="#"><i className="fab fa-instagram fw-normal" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer End */}
</div>

  )
}

export default Footer