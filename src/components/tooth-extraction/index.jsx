import React from 'react'
import HeroHeader from '../hero-header'
import "./tooth.css";
function ToothExtraction() {
  return (
    <>
        <HeroHeader/>

            <div className="container" id="contain1">
                <div className="row g-5">
                    <h1 style={{textAlign: 'center'}}>Aesthetics – The Solution for a Perfectly Beautiful Smile</h1>
                    <div className="row" id="teeth">
                    <h1>Tooth Extraction</h1>
                    <div id="new-paragraph">Tooth extraction is a dental procedure to remove one or more teeth from the mouth. This procedure can be performed for various reasons.</div>
                    <div id="new-paragraph">Reasons for tooth extraction:</div>
                    <ul id="ul">
                        <li><strong>Severe tooth decay:</strong> When tooth decay has spread to the pulp and cannot be treated with fillings or root canal therapy, extraction is the only solution.</li>
                        <li><strong>Periodontitis:</strong> Periodontitis is a condition that affects the gums and bones around the teeth. If left untreated, it can lead to tooth loss.</li>
                        <li><strong>Misaligned teeth:</strong> Misaligned teeth can cause various problems, including pain, difficulty in oral hygiene, and aesthetic issues. In some cases, extracting misaligned teeth is necessary to create enough space for other teeth to align properly.</li>
                        <li><strong>Impacted wisdom teeth:</strong> Wisdom teeth are the last to emerge in adults. They often become impacted, causing pain, swelling, and infection. In this case, extracting wisdom teeth is necessary to eliminate the cause of these problems.</li>
                    </ul>
                    <img src="/price-2.jpg" style={{margin: 'auto', height: 500, width: 1000}} alt="Tooth Extraction" />
                    <div className="row" style={{marginBottom: 20, marginTop: 20}}>
                        <h1>Kim Dental Clinic is one of the first dental clinics in Vietnam to safely perform wisdom tooth extractions:</h1>
                        <ul id="ul">
                        <li>Highly skilled and experienced dentists with professional certifications directly examine, consult, and gently perform procedures, ensuring customers feel comfortable and confident.</li>
                        <li>Modern diagnostic and treatment equipment, such as X-ray machines, CT Cone Beam 3D, helps dentists accurately diagnose dental conditions and create detailed treatment plans; tooth extraction using Piezotome technology minimizes invasiveness, is painless, and recovers quickly.</li>
                        <li>Central sterilization system: 100% of instruments are sterilized, each customer has a separate set of instruments and a private treatment room to ensure safety and prevent cross-infection.</li>
                        <li>Dental services certified by GCR (USA) and ISO 9001:2015: Convenient appointment scheduling at all 30+ Kim Dental Clinics nationwide; dedicated staff and dentists provide consultation and care; customer management system to monitor and care for patients throughout each treatment stage.</li>
                        </ul>
                        <div className="row" style={{marginLeft: 15}}>
                        <div className="col-md-4">
                            <img src="/Wisdom2.jpg" style={{width: '100%', height: '100%'}} alt="Kim Dental Clinic" />
                        </div>
                        <div className="col-md-4">
                            <img src="/Wisdom5.jpg" style={{width: '100%', height: '100%'}} alt="Kim Dental Clinic" />
                        </div>
                        <div className="col-md-4">
                            <img src="/Wisdom4.jpg" style={{width: '100%', height: '100%'}} alt="Kim Dental Clinic" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
             </div>


    </>
  )
}

export default ToothExtraction