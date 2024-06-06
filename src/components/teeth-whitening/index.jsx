import React from 'react'
import HeroHeader from '../hero-header'

function TeethWhitening() {
  return (
    <>
        <HeroHeader/>

        <div className="container" id="contain1">
        <div className="row g-5">
            <h1 style={{textAlign: 'center'}}>What is Teeth Whitening? Is Teeth Whitening Good?</h1>
            <p>Teeth whitening is a method that helps restore and improve the condition of yellowed teeth, which is currently popular. As a simple dental cosmetic procedure with a relatively affordable price, it is considered one of the easiest ways to achieve white, even, and beautiful teeth. However, many people believe that teeth whitening can severely affect tooth enamel. Let's explore this method in more detail with Kim Dental in the following article.</p>
            <div className="row" id="teeth">
            <h1>What is Teeth Whitening?</h1>
            <p>Teeth whitening is a method that uses compounds combined with light energy to create an oxidation reaction that breaks the color molecule chains in the dentin. This helps the teeth become whiter than their original color without damaging the tooth surface or any internal components of the teeth.</p>
            <p>Nowadays, teeth whitening is considered one of the popular dental cosmetic methods and is used by many people, especially for yellow teeth caused by the following reasons:</p>
            <div className="col-md-5" id="whiting">
                <ul id="ul">
                    <li>Excessive use of food and beverages containing colorants such as coffee, fruit juice, wine, etc.</li>
                    <li>Long-term smoking.</li>
                    <li>Improper oral hygiene.</li>
                    <li>Using water or toothpaste containing high fluoride levels over a long period.</li>
                    <li>Using antibiotics containing Tetracycline, especially in pregnant women and young children.</li>
                    <li>Due to genetic factors and aging.</li>
                </ul>
            </div>
            <div className="col-md-6">
                <img src="/price-1.jpg" id="img" alt="Teeth Whitening" />
            </div>
            <h1>Popular Teeth Whitening Methods</h1>
            <p>Currently, the two most popular methods are <strong>at-home teeth whitening</strong> and <strong>in-office teeth whitening</strong>. Each method has its own advantages and disadvantages as follows:</p>
            <h3>At-home Teeth Whitening</h3>
            <p>The dentist will take an impression of the teeth and make a clear plastic tray that fits snugly over each person's teeth. This tray holds the whitening gel and prevents saliva from entering.</p>
            <ul id="ul">
                <li>The advantage of this method is convenience, flexible timing, and relatively low cost, ranging from 1,400,000 VND.</li>
                <li>The disadvantage is that it only whitens in cases of mild staining such as external factors or aging. Incorrect use can affect oral health in the long term.</li>
            </ul>
            <h1>DentCare Dental Clinic is one of the first dental clinics in Vietnam to perform safe tooth extraction:</h1>
            <ul id="ul">
                <li>A team of highly specialized and skilled doctors, with professional certifications, directly examine, consult, and perform procedures gently and accurately, making customers feel comfortable and assured.</li>
                <li>Modern diagnostic and treatment technology systems, such as X-ray machines, CT Cone Beam 3D, help doctors accurately diagnose dental conditions and develop detailed treatment plans; tooth extraction with Piezotome technology targets the extracted tooth part, minimizes invasion, is painless, and recovers quickly.</li>
                <li>Central sterilization system: 100% of tools are sterilized, each customer has a separate set of tools and treatment room to ensure safety and prevent cross-infection.</li>
                <li>Dental service certified by GCR (USA) and ISO 9001:2015: Convenient appointment booking at over 30 Kim Dental Clinics nationwide; dedicated and caring doctors and staff; management system that monitors and cares for customers throughout the treatment stages.</li>
            </ul>
            <div className="row" style={{marginLeft: 15}}>
                <div className="col-md-4">
                <img src="/Wisdom2.jpg" style={{width: '100%', height: '100%'}} />
                </div>
                <div className="col-md-4">
                <img src="/Wisdom5.jpg" style={{width: '100%', height: '100%'}} />
                </div>
                <div className="col-md-4">
                <img src="/Wisdom4.jpg" style={{width: '100%', height: '100%'}} />
                </div>
            </div>
            </div>
        </div>
        </div>


    </>
  )
}

export default TeethWhitening