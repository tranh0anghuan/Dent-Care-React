import React from 'react';
import HeroHeader from '../hero-header';
import "./implan.css";
function Implant() {
  return (
    <>
      <HeroHeader />

      <div className="container" id="contain1">
        <div className="row g-5">
          <h1>What is Implant Dentistry? Should You Consider Implants?</h1>
          <div className="row" id="teeth">
          <div id="new-paragraph">
              Implant dentistry is widely recognized as the most effective solution for replacing missing teeth. It not only restores the aesthetic appearance of your smile but also ensures optimal chewing function. Implants offer durability and numerous other advantages that set them apart from traditional dental solutions.
            </div>

            <h1>Understanding Implant Dentistry</h1>
            <div id="new-paragraph">
              Implant dentistry, or dental implant placement, involves the insertion of a titanium post into the jawbone at the site of the missing tooth. This post acts as an artificial tooth root, providing a stable foundation for a dental crown that mimics the look and function of a natural tooth.
            </div>
            <div id="new-paragraph">
              Currently, dental implants are considered the most advanced and effective method for tooth replacement. They not only restore your confident smile but also help regain proper chewing function, prevent bone loss, and mitigate other dental issues.
            </div>
            <img src="/Implant.jpg"  style={{height: '25%', width: '100%', marginTop: '20px', marginbottom: '20px'}} />

            <h1>Is Getting Dental Implants the Right Choice for You?</h1>
            <div id="new-paragraph">
              Dental implants are a modern and highly effective solution for tooth loss, offering numerous benefits, including:
            </div>
            <ul id="ul">
              <li>
                <strong>Superior Aesthetics:</strong> Implants closely resemble natural teeth in size, shape, and color, providing a highly aesthetic result compared to other prosthetic options.
              </li>
              <li>
                <strong>Enhanced Chewing Ability:</strong> Implants function like natural teeth, offering a similar level of chewing efficiency thanks to the stability provided by the titanium post.
              </li>
              <li>
                <strong>Prevention of Bone Loss:</strong> Unlike traditional dentures, implants replace the tooth root, helping to prevent jawbone resorption and associated issues such as gum recession, tooth shifting, and bad breath.
              </li>
              <li>
                <strong>Long-lasting Durability:</strong> The average lifespan of an implant ranges from 20 to 30 years, and with proper care, they can last a lifetime, making them a cost-effective long-term solution.
              </li>
            </ul>

            <h1>Why Choose DentCare Dental Clinic for Safe Tooth Extraction?</h1>
            <ul id="ul">
              <li>Our team of highly skilled and certified dentists ensures gentle and precise procedures, providing comfort and reassurance to our patients.</li>
              <li>We use advanced diagnostic and treatment technologies such as X-ray machines and 3D CT Cone Beam to accurately diagnose dental issues and plan detailed treatments. Our Piezotome technology minimizes invasiveness, pain, and recovery time.</li>
              <li>Our central sterilization system ensures 100% sterilization of all tools. Each patient is provided with a personal set of tools and a private treatment room to ensure safety and prevent cross-infection.</li>
              <li>Our dental services are certified by GCR (USA) and ISO 9001:2015. We offer convenient appointment scheduling at over 30 Kim Dental Clinic locations nationwide. Our dedicated and caring staff and doctors provide comprehensive care throughout each stage of treatment.</li>
            </ul>
            
            <div className="row" style={{marginLeft: 15}}>
              <div className="col-md-4">
                <img src="/Wisdom2.jpg" style={{width: '100%', height: '100%'}} alt="Dental Image 1" />
              </div>
              <div className="col-md-4">
                <img src="/Wisdom5.jpg" style={{width: '100%', height: '100%'}} alt="Dental Image 2" />
              </div>
              <div className="col-md-4">
                <img src="/Wisdom4.jpg" style={{width: '100%', height: '100%'}} alt="Dental Image 3" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Implant;
