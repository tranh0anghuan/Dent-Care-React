import React from 'react';
import HeroHeader from '../hero-header';

function Wisdom() {
  return (
    <>
      <HeroHeader content="Wisdom"/>

      <div className="container" id="contain1">
        <div className="row g-5">
          <h1 style={{ textAlign: 'center' }}>Impacted Wisdom Tooth Extraction – What You Need to Know</h1>
          <div className="row" id="teeth">
            <div id="new-paragraph">
              Impacted wisdom teeth are misaligned teeth that fail to emerge properly and need to be extracted early to prevent complications. Recognizing the signs of an impacted wisdom tooth can be challenging, as they may not always cause obvious symptoms. In some cases, the tooth can grow without causing immediate pain, making it harder to detect. This article provides valuable insights into identifying impacted wisdom teeth early and the steps to manage them effectively.
            </div>

            <h1>Signs and Symptoms of an Impacted Wisdom Tooth</h1>
            <div id="new-paragraph">
              An impacted wisdom tooth remains trapped beneath the gum line and jawbone, unable to emerge properly. These teeth can either grow normally or form cysts, leading to significant discomfort and health issues. Here are some common indicators of an impacted wisdom tooth:
            </div>
            <div className="row" style={{ height: 400 }}>
              <div className="col-md-5" id="whiting">
                <ul id="ul">
                  <li>Swelling in the cheeks</li>
                  <li>Fever and swollen lymph nodes</li>
                  <li>Decreased appetite and difficulty eating</li>
                  <li>Persistent pain and discomfort</li>
                  <li>Red, swollen, and painful gums at the back of the mouth</li>
                  <li>Bad breath and a bitter taste in the mouth</li>
                  <li>Increased sensitivity and ongoing pain</li>
                </ul>
              </div>
              <div className="col-md-6">
                <img src="/Wisdom.jpg" style={{height: '92%', width: '94%', marginTop: '20px'}} className="h-50" />
              </div>
            </div>

            <h1>Potential Risks of Impacted Wisdom Teeth</h1>
            <div id="new-paragraph">
              Impacted wisdom teeth might not initially cause noticeable pain, but they can lead to serious complications over time. Addressing these issues early is crucial to protect your oral health. Here are some of the risks associated with impacted wisdom teeth:
            </div>

            <h3>Damage to Adjacent Teeth and Risk of Losing the Second Molar</h3>
            <div id="new-paragraph">
              As impacted wisdom teeth continue to grow, they can exert pressure on the adjacent second molar, potentially damaging its roots and structure. This pressure can lead to chronic pain and may eventually result in the loss of the second molar if not treated promptly.
            </div>

            <h3>Increased Risk of Gum Inflammation</h3>
            <div id="new-paragraph">
              The movement and growth of impacted wisdom teeth can cause continuous damage to the gums. This ongoing irritation can lead to gum inflammation, characterized by swollen, red, and painful gums. In severe cases, pus may form, indicating an infection that requires immediate attention.
            </div>

            <h3>Development of Jawbone Cysts</h3>
            <div id="new-paragraph">
              If impacted wisdom teeth are not removed in a timely manner, they can lead to the formation of cysts in the jawbone. These cysts can cause significant damage to the jawbone, surrounding teeth, and nerves, necessitating prompt detection and treatment to avoid severe complications.
            </div>

            <h1>Managing Impacted Wisdom Teeth</h1>
            <div id="new-paragraph">
              Early detection and management of impacted wisdom teeth are crucial to prevent these complications. Regular dental check-ups, including X-rays, can help identify impacted teeth before they cause significant problems. If you experience any of the symptoms mentioned, it is essential to consult with a dentist promptly. Treatment options may include monitoring the tooth's development or surgical removal if necessary.
            </div>

            <h3>Consultation and Diagnosis</h3>
            <div id="new-paragraph">
              During your consultation, the dentist will perform a thorough examination and may take X-rays to assess the position and condition of the impacted wisdom teeth. This evaluation helps in planning the appropriate treatment strategy, whether it involves monitoring or extraction.
            </div>

            <h3>Surgical Extraction</h3>
            <div id="new-paragraph">
              If extraction is deemed necessary, the procedure will be carefully planned and performed by an experienced dental surgeon. The surgery involves
              making an incision in the gum to access and remove the impacted tooth. Post-operative care instructions will be provided to ensure proper healing and recovery.
            </div>

            <h3>Post-Extraction Care</h3>
            <div id="new-paragraph">
              After the extraction, following the dentist's care instructions is vital for a smooth recovery. This includes taking prescribed medications, maintaining oral hygiene, avoiding certain foods, and attending follow-up appointments to monitor healing.
            </div>

            <div id="new-paragraph">
              Addressing impacted wisdom teeth early can prevent a range of complications and ensure better overall oral health. Stay proactive about your dental care and consult with your dentist if you suspect any issues with your wisdom teeth.
            </div>
            <h1>DentCare Dental Clinic is one of the first dental clinics in Vietnam to perform safe tooth extraction:</h1>
            <ul id="ul">
              <li>A team of highly specialized and skilled doctors with professional certifications directly examine, consult, and perform procedures gently and accurately, ensuring comfort and peace of mind for customers.</li>
              <li>Modern diagnostic and treatment technology systems, such as X-ray machines, CT Cone Beam 3D, help doctors accurately diagnose dental conditions and develop detailed treatment plans; tooth extraction with Piezotome technology targets the extracted tooth area, minimizing invasion, is painless, and recovers quickly.</li>
              <li>Central sterilization system: 100% of tools are sterilized, each customer has a separate set of tools and treatment room to ensure safety and prevent cross-infection.</li>
              <li>Dental service certified by GCR (USA) and ISO 9001:2015: Convenient appointment booking at over 30 Kim Dental Clinics nationwide; dedicated and caring doctors and staff; management system that monitors and cares for customers throughout the treatment stages.</li>
            </ul>
            <div className="row" style={{ marginLeft: 15 }}>
              <div className="col-md-4">
                <img src="/Wisdom2.jpg" style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="col-md-4">
                <img src="/Wisdom5.jpg" style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="col-md-4">
                <img src="/Wisdom4.jpg" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Wisdom;
