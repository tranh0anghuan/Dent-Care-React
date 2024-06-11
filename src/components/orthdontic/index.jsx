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
            <img src="/price-2.jpg" style={{ margin: 'auto', height: 500, width: 1000 }} alt="Braces Procedure" />

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

            <h1>Types of Braces</h1>
            <div id="new-paragraph">
              Various orthodontic methods are available to meet different needs and preferences. Here are some of the most common types:
            </div>

            <h4><i className="fas fa-gem" /> Metal Braces</h4>
            <div id="new-paragraph">
              Metal braces involve attaching brackets and wires to the teeth to create force that moves the teeth into the desired position. They are highly effective due to their sturdy construction.
            </div>
            <ul id="ul">
              <li><strong>Standard Metal Brackets:</strong> These are effective and reliable, providing strong force for teeth alignment. Cost: from 35,000,000 VND.</li>
              <img src="/Othdontics2.jpg" id="img" alt="Standard Metal Brackets" />
              <li><strong>Ceramic Brackets:</strong> These match the natural color of teeth, offering higher aesthetic value. Cost: from 40,000,000 VND.</li>
              <img src="/Orthdontics3.jpg" id="img" alt="Ceramic Brackets" />
              <li><strong>Self-ligating Brackets:</strong> These have flexible clips that reduce friction and discomfort. Cost: from 40,000,000 VND.</li>
              <img src="/Orthdontics4.jpg" id="img" alt="Self-ligating Brackets" />
              <li><strong>Lingual Braces:</strong> Placed on the inside of the teeth, they are invisible from the outside but can be uncomfortable. Cost: around 100,000,000 VND.</li>
              <img src="/Orthdontics5.jpg" id="img" alt="Lingual Braces" />
            </ul>

            <h4><i className="fas fa-gem" /> Clear Aligners</h4>
            <div id="new-paragraph">
              Clear aligners are transparent, flexible plastic trays that fit snugly over the teeth to move and align them. They offer several benefits:
            </div>
            <ul id="ul">
              <li><strong>High Aesthetic Value:</strong> The aligners are nearly invisible, maintaining your natural smile.</li>
              <li><strong>Easy to Clean:</strong> Removable aligners allow for better oral hygiene.</li>
              <li><strong>Convenient:</strong> They can be removed during meals and for cleaning.</li>
              <li><strong>Less Frequent Check-ups:</strong> Visits to the dentist are required only every 6-8 weeks.</li>
              <li><strong>Predictable Treatment Duration:</strong> The treatment plan provides an overview of the entire process.</li>
              <img src="/Othdontics6.jpg" id="img" alt="Clear Aligners" />
            </ul>

            <h1>Why Choose Kim Dental Clinic?</h1>
            <div id="new-paragraph">
              Kim Dental Clinic is a pioneer in providing safe and effective orthodontic treatments in Vietnam. Here are some reasons to choose us:
            </div>
            <ul id="ul">
              <li><strong>Expertise:</strong> Our highly skilled and experienced dentists are certified to provide top-notch orthodontic care.</li>
              <li><strong>Advanced Technology:</strong> We use modern diagnostic and treatment equipment, such as X-ray machines and CT Cone Beam 3D, to ensure accurate diagnosis and effective treatment plans.</li>
              <li><strong>Centralized Sterilization:</strong> All instruments are thoroughly sterilized, and each patient has a separate set of tools and a private treatment room to prevent cross-infection.</li>
              <li><strong>Certified Services:</strong> Our dental services are certified by GCR (USA) and ISO 9001:2015, ensuring high standards of care and customer satisfaction.</li>
              <li><strong>Comprehensive Care:</strong> Our customer management system tracks and monitors each patient's progress throughout their treatment journey.</li>
            </ul>
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

