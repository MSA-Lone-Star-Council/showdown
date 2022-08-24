import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import "./Homepage.css";

/** Homepage of site.
 * 
 * Shows welcome message
 * 
 * Routed at /
 * 
 * Routes => Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser:", currentUser);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Showdown</h1>
      </div>

    </div>

  );
}

export default Homepage;