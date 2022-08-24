import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import logo from "../assets/LSC.svg";

/** Navigation bar for site. Shows up on every page.
 * 
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 * 
 * Rendered by App.
 */

function Navigation({ login, logout }) {
  const { currentUser } = useContext(UserContext);
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  console.debug(
    "Navigation",
    "currentUser:", currentUser,
    "formErrors:", formErrors, 
  );

  /** Handle form submit:
   * 
   * Calls login func prop and if successful, redirects to /home.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await login(formData);
    if (res.success) {
      history.push("/");
    } else {
      setFormErrors(res.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  function loggedInNav() {
    return (
      // <div className="ms-auto me-4">
      //   <Link className="nav-link" to="/account">
      //     Account
      //   </Link>
      // </div>
      <div className="ms-auto me-4">
        <div className="dropdown">
          <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-fill pe-1"></i>
            {currentUser.username}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a className="dropdown-item" href="/account">Account</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item text-danger" href="/" onClick={logout}>Log out</a></li>
          </ul>
        </div>
      </div>
    );
  }

  function loggedOutNav() {
    return (
      <div className="dropdown ms-auto me-4">
        <button className="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Log in
        </button>
        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
          <form className="px-4 py-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label 
                for="username" 
                className="form-label">
                  Username
                </label>
              <input 
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                placeholder="username" 
              />
            </div>
            <div className="mb-3">
              <label 
                for="password" 
                className="form-label">
                  Password
                </label>
              <input 
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="password" 
              />
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                <p className="form-check-label" for="dropdownCheck">
                  Remember me
                </p>
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              onSubmit={handleSubmit}>
                Sign in
            </button>
          </form>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/account">New around here? Sign up</a>
          <a className="dropdown-item" href="/account">Forgot password?</a>
        </div>
      </div>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">

      <div className="me-auto ms-4">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width="30" height="24" className="d-inline-block align-text-top" />
          Showdown
        </Link>
      </div>

      <div className="mx-auto">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/schools">
              Schools
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/competitions">
              Competitions
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </ul>
      </div>

      {currentUser ? loggedInNav() : loggedOutNav()}
      
    </nav>
  )
}

export default Navigation;