import React from 'react'
import './style.css'

function Testimonial() {
  return (
        <div className="container-fluid bg-primary bg-testimonial py-5 my-5 wow fadeInUp" data-wow-delay="0.1s">
    <div className="container py-5">
        <div className="row justify-content-center">
        <div className="col-lg-7">
            <div className="owl-carousel testimonial-carousel rounded p-5 wow zoomIn" data-wow-delay="0.6s">
            <div className="testimonial-item text-center text-white">
                <img className="testimonial-img img-fluid mx-auto rounded mb-4" src="img/testimonial-1.jpg" alt />
                <p className="fs-5">"I had a fantastic experience at DentCare. The staff was incredibly welcoming, and Dr. John Doe made me feel comfortable right away. The whole process, from the initial exam to the cleaning, was thorough and professional. I can honestly say my teeth have never felt cleaner. Highly recommend!"</p>
                <hr className="mx-auto w-25" />
                <h4 className="text-white mb-0">Sarah L.</h4>
            </div>
            <div className="testimonial-item text-center text-white">
                <img className="testimonial-img img-fluid mx-auto rounded mb-4" src="img/testimonial-2.jpg" alt />
                <p className="fs-5">"DentCare is the best dental clinic I've ever visited. The team is friendly and attentive, and Dr. John Doe is simply amazing. They took great care of my teeth and explained every step of the process clearly. I felt completely at ease and confident in their care. I wouldn’t go anywhere else!"</p>
                <hr className="mx-auto w-25" />
                <h4 className="text-white mb-0">Emily R.</h4>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>



  )
}

export default Testimonial