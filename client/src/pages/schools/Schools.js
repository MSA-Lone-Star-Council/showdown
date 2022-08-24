import React, { useState, useEffect } from "react";
import ShowdownApi from "../../api/api";
import SchoolCard from "./SchoolCard";

import "./Schools.css";

/** Show page with list of schools.
 * 
 * On mount, loads schools from API.
 * Re-loads filtered schools on submit from search form.
 * 
 * Routed at /schools
 * 
 * Routes => { SchoolCard, SearchForm }
 */

function Schools() {
  console.debug("Schools");

  const [schools, setSchools] = useState([]);

  useEffect(function getCompaniesOnMount() {
    console.debug("Schools useEffect getSchoolsOnMount");
    search();
  }, []);

  async function search(school_handle) {
    let schools = await ShowdownApi.getSchools(school_handle);
    setSchools(schools);
  }

  return (
    <div className="Schools col-md-8 offset-md-2">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Schools</h1>
        {schools.length
          ? (
            <div className="Schools-list row">
              {schools.map(s => (
                <SchoolCard 
                    key={s.school_handle}
                    school_handle={s.school_handle}
                    school_name={s.school_name}
                    city={s.city}
                    state={s.state}
                    logoUrl={s.logoUrl}
                    facebookUrl={s.facebookUrl}
                    instagramUrl={s.instagramUrl}
                />
              ))}
            </div>
          ) : ""}
      </div>

    </div>

  );
}

export default Schools;