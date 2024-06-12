import React from 'react';
import HeroHeader from '../hero-header';
function Ceramic() {
  return (
    <>
      <HeroHeader content="Ceramic Teeth"/>

      <div className="container" id="contain1">
        <div className="row g-5">
          <h1 style={{textAlign: 'center', marginTop: 20, color: 'rgba(6, 163, 218, .7)', fontSize: 50}}>
            Aesthetic Porcelain Veneers: Beautiful, Safe, and What You Need to Know
          </h1>
          <div className="row" id="teeth">
          <div id="new-paragraph">
              Aesthetic porcelain veneers are a fixed restoration technique using porcelain material that restores chewing function, improves aesthetics, and helps you feel confident with a naturally bright smile. Questions about whether getting porcelain veneers is painful, the types of porcelain veneers, and the cost of porcelain veneers will be answered in the following article.
            </div>
            
            <h1>What are Porcelain Veneers? When Should You Get Porcelain Veneers?</h1>
            <div id="new-paragraph">
              Porcelain veneers (fixed porcelain restoration) involve using porcelain or porcelain combined with metal to cover defective or damaged teeth, restoring their shape, size, and color to resemble natural teeth. This method is ideal for individuals with chipped, discolored, or misaligned teeth, providing both functional and aesthetic benefits.
            </div>
            <img src="/Creamic.webp" id="img" alt="Porcelain Veneers" />
            
            <h4 style={{marginTop: 20}}>Types of Porcelain Veneers</h4>
            <div id="new-paragraph">There are two main methods of applying porcelain veneers:</div>
            <ul id="ul">
              <li><strong>Porcelain Crowns:</strong> A porcelain cap that covers the entire natural tooth, ideal for teeth that are significantly damaged or decayed.</li>
              <li><strong>Porcelain Veneers:</strong> A thin layer of porcelain applied to the front surface of the tooth, best suited for teeth that are largely intact but require cosmetic improvement.</li>
            </ul>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Ceramic;
