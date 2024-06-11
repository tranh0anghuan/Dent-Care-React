import React from 'react';
import HeroHeader from '../hero-header';
import "./denture_teeth.css";
function Dentures() {
  return (
    <>
      <HeroHeader />
      <div className="container" id="contain1">
        <div className="row g-5">
          <h1 style={{ textAlign: 'center', marginTop: 20, color: 'rgba(6, 163, 218, .7)', fontSize: 50 }}>
            Aesthetics – The Solution for a Perfectly Beautiful Smile
          </h1>
          <div className="row" id="teeth">
            <div id="new-paragraph">
              <h1>What are Dentures?</h1>
              <div>
              Dentures are artificial teeth designed to replace missing or severely damaged natural teeth. They restore chewing function, 
              improve the aesthetics of your smile and facial structure, boost self-confidence, and maintain the alignment of remaining natural teeth, enhancing overall quality of life.
              </div>
              <img src="/price-2.jpg" style={{height: '10%', width: '78%', margin:'10px 90px'}} alt="Dentures Procedure" />
              <div>
                There are different types of dentures available, including:
              </div>
              <ul id="ul">
                <li><strong>Removable Dentures:</strong> Made of plastic or metal, these can be easily removed and inserted. They're often used to replace multiple or all teeth in the mouth.</li>
                <img src="/Dentures1.jpg" id="img" alt="Removable Dentures" />
                <li><strong>Dental Bridges:</strong> Fixed onto two natural teeth adjacent to the missing tooth, usually made of porcelain or metal.</li>
                <img src="/Dentures2.jpg" id="img" alt="Dental Bridges" />
                <li><strong>Dental Implants:</strong> Attached to the jawbone using titanium implants, these fixed dentures function and look like real teeth.</li>
                <img src="/Dentures3.jpg" id="img" alt="Dental Implants" />
              </ul>

              <h1>Benefits of Getting Dentures</h1>
              <div className="row" style={{ marginBottom: 20 }}>
                <div className="col-md-6">
                  <div>
                    Dentures offer numerous benefits, including:
                  </div>
                  <ul id="ul">
                    <li><strong>Restore Chewing Function:</strong> Dentures make eating and drinking easier, especially if you've lost many teeth.</li>
                    <li><strong>Improve Aesthetics:</strong> Dentures provide a beautiful smile, boosting your confidence in social interactions.</li>
                    <li><strong>Enhance Quality of Life:</strong> Dentures improve your ability to speak, chew, and swallow, making you feel more confident in social situations.</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <img src="/after.jpg" style={{ width: '67%', marginLeft: 20 }} alt="After Dentures" />
                </div>
              </div>
              <h1>DentCare Dental Clinic is one of the first dental clinics in Vietnam to safely perform tooth extraction:</h1>
              <ul id="ul">
                <li>Highly skilled and experienced dentists with professional certifications directly examine, consult, and gently perform procedures, ensuring customers feel comfortable and confident.</li>
                <li>Modern diagnostic and treatment equipment, such as X-ray machines, CT Cone Beam 3D, helps dentists accurately diagnose dental conditions and create detailed treatment plans; 
                tooth extraction using Piezotome technology minimizes invasiveness, is painless, and recovers quickly.</li>
                <li>Central sterilization system: 100% of instruments are sterilized, each customer has a separate set of instruments and a private treatment room to ensure safety and prevent cross-infection.</li>
                <li>Dental services certified by GCR (USA) and ISO 9001:2015: Convenient appointment scheduling at all 30+ Kim Dental Clinics nationwide; 
                Dedicated staff and dentists provide consultation and care; Customer management system to monitor and care for patients throughout each treatment stage.</li>
              </ul>
              <div className="row" style={{ marginLeft: 15 }}>
                <div className="col-md-4">
                  <img src="/Wisdom2.jpg" style={{ width: '100%', height: '100%' }} alt="DentCare Dental Clinic" />
                </div>
                <div className="col-md-4">
                  <img src="/Wisdom5.jpg" style={{ width: '100%', height: '100%' }} alt="DentCare Dental Clinic" />
                </div>
                <div className="col-md-4">
                  <img src="/Wisdom4.jpg" style={{ width: '100%', height: '100%' }} alt="DentCare Dental Clinic" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dentures
