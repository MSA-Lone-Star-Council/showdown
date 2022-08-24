import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import "./Competitions.css";

/** Competitions of site.
 * 
 * Shows welcome message
 * 
 * Routed at /
 * 
 * Routes => Competitions
 */

function Competitions() {
  const { currentUser } = useContext(UserContext);
  console.debug("Competitions", "currentUser:", currentUser);

  return (
    <div className="Competitions">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Competitions</h1>
      </div>

    </div>

  );
}

export default Competitions;