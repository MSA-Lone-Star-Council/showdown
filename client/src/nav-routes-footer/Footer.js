import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
/** import pages */
import "./Footer.css";
import logo from "../assets/LSC.svg";

function Footer() {
  console.debug(
    "Footer",
  )

  return (
    <div className="Footer container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">Home</a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">Competitions</a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">Register</a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">Footer</a>
          </li>
        </ul>
        
        <p className="text-center text-muted">© 2022 Showdown</p>

      </footer>
    </div>

    // <div className="Footer container">
    //   <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
    //     <div className="col mb-3">
    //       <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
    //         <img src={logo} alt="logo" width="40" height="32" className="bi me-2" />
    //       </a>
    //       <p className="text-muted">© 2022</p>
    //     </div>
    //     <div className="col mb-3">

    //     </div>
    //     <div className="col mb-3">

    //     </div>
    //     <div className="col mb-3">

    //     </div>
    //     <div className="col mb-3">
    //       <h5>Socials</h5>
    //       <ul className="nav flex-column">
    //         <li className="nav-item mb-2">
    //           <a href="instagram.com" className="nav-link p-0 text-muted">
    //             <i className="bi bi-instagram"></i>
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </footer>

    // </div>


  );
}

export default Footer;