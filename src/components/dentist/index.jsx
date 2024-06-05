import React from 'react'
import HeroHeader from '../hero-header'

function Dentist() {
  return (
    <>
    
        <HeroHeader/>

        <main className="pt-4 bg-light" style={{fontSize: 20, overflow: 'hidden'}}>
            <div className="container mt-5 pb-5 ">
                {/*Grid row*/}
                <div className="row pt-5" style={{backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)'}}>
                {/*Grid column*/}
                <div className="col-md-6 mb-4">
                    <img src="/team-1.jpg" className="img-fluid" alt style={{width: 500}} />
                </div>
                {/*Grid column*/}
                {/*Grid column*/}
                <div className="col-md-6 mb-4">
                    {/*Content*/}
                    <div className="p-4">
                    <div className="mb-3">
                        <a href style={{textDecoration: 'none'}}>
                        <span className="badge bg-info me-3">Enthusiastic</span>
                        </a>
                        <a href>
                        <span className="badge bg-secondary me-1">Careful</span>
                        </a>
                    </div>
                    <p style={{fontSize: 30}}>huan</p>
                    <div className="d-flex" style={{margin: '10px 0'}}>
                        <p style={{marginRight: 20, width: 150}}>Age</p>
                        <p style={{marginRight: 20, width: 150}}>23</p>
                    </div>
                    <div className="d-flex" style={{margin: '10px 0'}}>
                        <p style={{marginRight: 20, width: 150}}>Phone</p>
                        <p style={{marginRight: 20, width: 150}}>123</p>
                    </div>
                    <div className="d-flex" style={{margin: '10px 0'}}>
                        <p style={{marginRight: 20, width: 150}}>Gender</p>
                        <p style={{marginRight: 20, width: 150}}>Male</p>
                    </div>
                    <form action="MainController" className="d-flex justify-content-left" />
                    <input type="hidden" name="action" defaultValue="cart" />
                    <input type="hidden" name="id" defaultValue />
                    <button className="btn ms-1" type="submit" style={{fontSize: 15, width: 150, height: 50, backgroundColor: '#fe6433', color: '#fff'}}>
                        Appointment
                    </button>
                    </div>
                    {/*Content*/}
                </div>
                {/*Grid column*/}
                </div>
                {/*Grid row*/}
                <div className="row" style={{backgroundColor: '#fff', marginTop: 20, borderRadius: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)', fontSize: 15, padding: 20}}>
                <div className="d-flex" style={{margin: '10px 0'}}>
                    <p style={{marginRight: 20, width: 150}}>Experiences</p>
                    <p>10</p>
                </div>
                <div className="d-flex" style={{margin: '10px 0'}}>
                    <p style={{marginRight: 20, width: 150}}>Accomplishments</p>
                    <ul style={{listStyle: 'none'}}>
                    <li>
                        <p>huan</p>
                    </li>
                    <li>
                        <p>huan</p>
                    </li>
                    <li>
                        <p>huan</p>
                    </li>
                    <li>
                        <p>huan</p>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </main>

    
    </>
  )
}

export default Dentist