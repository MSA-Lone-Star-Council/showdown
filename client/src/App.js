import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import ShowdownApi from "./api/api";
import Navigation from "./nav-routes-footer/Navigation";
import Routes from "./nav-routes-footer/Routes";
import Footer from "./nav-routes-footer/Footer";
import jwt from "jsonwebtoken";
// import logo from './logo.svg';
// import './App.css';

export const TOKEN_STORAGE_ID = "showdown-token";

/** Showdown application.
 * 
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throught app.
 * 
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced via the useLocalStorage hook.
 * 
 * App -> Routes
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "currentUser:", currentUser,
    "token:", token,
  );

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token:", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          ShowdownApi.token = token;
          let currentUser = await ShowdownApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.err("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   * 
   * Automatically logs them in (set token) upon signup.
   */
  async function signup(signupData) {
    try {
      let token = await ShowdownApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  }

  /** Handles site-wide login. */
  async function login(loginData) {
    try {
      let token = await ShowdownApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation signup={signup} login={login} logout={logout} />
          <Routes />
          <Footer />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
