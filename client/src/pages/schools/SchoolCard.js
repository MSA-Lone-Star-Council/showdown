import React from "react";
import { Link } from "react-router-dom";

import "./SchoolCard.css";

/** Show limited information about a school
 * 
 * Is rendered by Schools to show a "card" for each school.
 * 
 * Schools -> SchoolCard
 */

function SchoolCard({ school_handle, school_name, city, state, logoUrl, facebookUrl, instagramUrl }) {
  console.debug("SchoolCard", school_handle);

  return (
    <div className="col-sm-4 pb-3">
      <div className="card">
        <img src="/logos/logo2.png" class="card-img-top" alt={school_name} />
        <div className="card-body">
          <h6 className="card-title">{school_name}</h6>
          <p className="card-text"><small>{city}</small></p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  );
}

export default SchoolCard;