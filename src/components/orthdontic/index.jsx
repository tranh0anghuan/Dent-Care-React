import React from 'react';
import HeroHeader from '../hero-header';
import "./orthdontic_teeth.css";

function Orthodontic() {
  return (
    <>
      <HeroHeader content="Orthodontic"/>

      <div className="container" id="contain1">
        <div className="row g-5">
          <h1 style={{ textAlign: 'center', marginTop: 20, color: 'rgba(6, 163, 218, .7)', fontSize: 50 }}>
            Aesthetic Braces – Your Path to a Perfect Smile
          </h1>
          <div className="row" id="teeth">
            <div id="new-paragraph">
              Orthodontic treatment, commonly known as braces, is a highly effective way to correct dental issues such as protruding, underbite, spaced, crooked, and misaligned teeth. At Kim Dental Clinic, we leverage advanced orthodontic techniques and a dedicated team of specialists to ensure our patients achieve the best results and a radiant smile.
            </div>
            <h1>Understanding Braces</h1>
            <div id="new-paragraph">
              Braces are specialized devices, either fixed or removable, designed to move and align teeth into their correct positions. This not only enhances the appearance of your smile but also ensures proper chewing function and bite alignment, significantly improving dental health and overall facial aesthetics.
            </div>
            <img src="/Orthodontic1.jpg" style={{ margin: 'auto', height: 500, width: 1000 }} alt="Braces Procedure" />

            <h1 style={{ marginTop: 20 }}>When Should You Consider Braces?</h1>
            <div id="new-paragraph">
              Braces are recommended for a variety of dental issues. Here are some specific conditions that braces can effectively address:
            </div>
            <ul id="ul">
              <li><strong>Protruding Teeth:</strong> These can cause aesthetic concerns and wear down more quickly due to improper bite alignment.</li>
              <li><strong>Underbite:</strong> This condition can affect facial aesthetics, chewing function, and may cause speech difficulties.</li>
              <li><strong>Spaced Teeth:</strong> Gaps between teeth can lead to food getting stuck, causing discomfort and impacting pronunciation.</li>
              <li><strong>Crowded Teeth:</strong> Overlapping teeth can cause aesthetic issues and make dental care challenging.</li>
              <li><strong>Open Bite:</strong> When the teeth do not meet properly, it can make chewing difficult and affect speech.</li>
              <li><strong>Deep Bite:</strong> This condition can cause facial imbalance and affect the temporomandibular joint.</li>
            </ul>
            <img src="/Orthdontics.webp" alt="Orthodontics" />
            
            <div className="row" style={{ marginLeft: 15 }}>
              <div className="col-md-4">
                <img src="/Wisdom2.jpg" style={{ width: '100%', height: '100%' }} alt="Kim Dental Clinic" />
              </div>
              <div className="col-md-4">
                <img src="/Wisdom5.jpg" style={{ width: '100%', height: '100%' }} alt="Kim Dental Clinic" />
              </div>
              <div className="col-md-4">
                <img src="/Wisdom4.jpg" style={{ width: '100%', height: '100%' }} alt="Kim Dental Clinic" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orthodontic;

