import React from 'react'
import HeroHeader from '../hero-header'

function Dentures() {
  return (
    <>
        <HeroHeader/>
                <div className="container" id="contain1">
        <div className="row g-5">
            <h1 style={{textAlign: 'center'}}>Aesthetics – The Solution for a Perfectly Beautiful Smile</h1>
            <div className="row" id="teeth">
            <h1>What are Dentures?</h1>
            <p>Dentures are artificial teeth used to replace lost or severely damaged natural teeth. Dentures can help restore chewing function, aesthetics, and improve your quality of life.</p>
            <img src="/price-2.jpg" style={{margin: 'auto', height: 500, width: 1000}} alt="Dentures Procedure" />
            <p>There are different types of dentures, including:</p>
            <ul id="ul">
                <li><strong>Removable Dentures:</strong> These dentures are made of plastic or metal and can be easily removed and inserted. Removable dentures are often used to replace multiple or all teeth in the mouth.</li>
                <img src="/Dentures1.jpg" id="img" alt="Removable Dentures" />
                <li><strong>Dental Bridges:</strong> These dentures are fixed onto two natural teeth next to the missing tooth. Dental bridges are usually made of porcelain or metal.</li>
                <img src="/Dentures2.jpg" id="img" alt="Dental Bridges" />
                <li><strong>Dental Implants:</strong> These dentures are attached to the jawbone using titanium implants. Dental implants are fixed dentures that function and look like real teeth.</li>
                <img src="/Dentures3.jpg" id="img" alt="Dental Implants" />
            </ul>
            <h1>Benefits of Getting Dentures</h1>
            <div className="row" style={{marginBottom: 20}}>
                <div className="col-md-6">
                <p>Getting dentures can provide you with many benefits, including:</p>
                <ul id="ul">
                    <li><strong>Restore Chewing Function:</strong> Dentures help you eat and drink more easily, especially if you have lost many teeth.</li>
                    <li><strong>Improve Aesthetics:</strong> Dentures give you a more beautiful smile, boosting your confidence in social interactions.</li>
                    <li><strong>Enhance Quality of Life:</strong> Dentures help improve your ability to speak, chew, and swallow, and make you feel more confident in social life.</li>
                </ul>
                </div>
                <div className="col-md-6">
                <img src="/after.jpg" style={{width: '67%', marginLeft: 20}} alt="After Dentures" />
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
            <div className="row" style={{marginLeft: 15}}>
                <div className="col-md-4">
                <img src="/Wisdom2.jpg" style={{width: '100%', height: '100%'}} alt="DentCare Dental Clinic" />
                </div>
                <div className="col-md-4">
                <img src="/Wisdom5.jpg" style={{width: '100%', height: '100%'}} alt="DentCare Dental Clinic" />
                </div>
                <div className="col-md-4">
                <img src="/Wisdom4.jpg" style={{width: '100%', height: '100%'}} alt="DentCare Dental Clinic" />
                </div>
            </div>
            </div>
        </div>
        </div>

    </>
  )
}

export default Dentures