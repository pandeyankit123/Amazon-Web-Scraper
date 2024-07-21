import React from 'react'
import {Link,useLocation} from 'react-router-dom'

function Navbar() {
    let location=useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand ml-5" to="/">
                    e-Commerce
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} to="/">Scrapper</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/comp"? "active": ""}`} to="/comp">Comparator</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar