import React from 'react';
import HeroHeader from '../hero-header';
import './teeth.css';

function TeethWhitening() {
  return (
    <>
      <HeroHeader/>

      <div className="container" id="contain1">
        <div className="row g-5">
          <h1 style={{textAlign: 'center'}}>Understanding Teeth Whitening: Is It Beneficial      fgffef</h1>
          <div id="new-paragraph">Teeth whitening is a popular cosmetic dental procedure aimed at restoring and enhancing the brightness of discolored teeth. It is an affordable and simple solution, considered one of the most effective ways to achieve a bright, white smile. However, some believe that teeth whitening can damage tooth enamel. Let's delve into this method with Kim Dental in the following article.</div>
          
          <div className="row" id="teeth">
            <h1>What is Teeth Whitening?</h1>
            <div id="new-paragraph">Teeth whitening involves using compounds combined with light energy to create an oxidation reaction that breaks down color molecules in the dentin. This process whitens the teeth beyond their natural color without harming the tooth surface or its internal components.</div>
            <div id="new-paragraph">Today, teeth whitening is widely used, especially for yellow teeth caused by factors such as:</div>
            <div className="col-md-5" id="whiting">
              <ul id="ul">
                <li>Consuming foods and beverages with strong colorants like coffee, fruit juice, and wine.</li>
                <li>Prolonged smoking.</li>
                <li>Poor oral hygiene.</li>
                <li>Long-term use of water or toothpaste with high fluoride content.</li>
                <li>Antibiotics containing Tetracycline, especially used during pregnancy and in young children.</li>
                <li>Genetic factors and aging.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <img src="/price-1.jpg" id="img" alt="Teeth Whitening" />
            </div>
            
            <h1>Popular Teeth Whitening Methods</h1>
            <div id="new-paragraph">Currently, the two most popular methods are <strong>at-home teeth whitening</strong> and <strong>in-office teeth whitening</strong>. Each has its own set of advantages and disadvantages:</div>
            
            <h3>At-home Teeth Whitening</h3>
            <div id="new-paragraph">In this method, a dentist takes an impression of your teeth to create a custom-fit plastic tray that holds the whitening gel and prevents saliva from diluting the gel.</div>
            <ul id="ul">
              <li>Advantages: Convenience, flexibility, and cost-effectiveness, with prices starting around 1,400,000 VND.</li>
              <li>Disadvantages: Best suited for mild staining; improper use can lead to long-term oral health issues.</li>
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

export default TeethWhitening;
