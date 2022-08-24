import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import Homepage from "../pages/homepage/Homepage";
import About from "../pages/about/About";
import Schools from "../pages/schools/Schools";
import Competitions from "../pages/competitions/Competitions";
import Account from "../pages/account/Account";

function Routes({ login, signup }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
  )

  return (
    <div className="Routes pt-5">
      <Switch>

        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/schools" element={<Schools />} />
        <Route exact path="/competitions" element={<Competitions />} />
        <Route exact path="/account" element={<Account />} />

      </Switch>
    </div>
  );
}

export default Routes;