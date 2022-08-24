import React, { useState, useContext } from "react";
import ShowdownApi from "../../api/api";
import UserContext from "../../auth/UserContext";
import "./Account.css";

/** Account/Profile page.
 * 
 * Displays currentUser information.
 * 
 * Routed as /account
 * 
 * Routes => Account
 */

function Account() {
  const { currentUser } = useContext(UserContext);
  console.debug("Account", "currentUser:", currentUser);

  return (
    <div className="Account col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Account</h1>
        {currentUser ? (
          <div>
            <p>First name: {currentUser.firstName}</p>
            <p>Last name: {currentUser.lastName}</p>
            <p>Gender: {currentUser.gender}</p>
            <p>School: {currentUser.school}</p>
          </div>
          ) : (
            <div>
              <p>Sign up</p>
            </div>
          )}
      </div>

    </div>

  );
}

export default Account;