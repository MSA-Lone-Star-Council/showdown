import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import "./About.css";

/** About page of site.
 * 
 * Shows welcome message
 * 
 * Routed at /
 * 
 * Routes => Homepage
 */

function About() {
  const { currentUser } = useContext(UserContext);
  console.debug("About", "currentUser:", currentUser);

  return (
    <div className="About">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">About</h1>
      </div>

    </div>

  );
}

export default About;