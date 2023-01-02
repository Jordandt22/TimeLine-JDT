import React, { useState } from "react";
import { useSelector } from "react-redux";

// Components
import UpdateEmailForm from "./UpdateEmailForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

function Settings() {
  const {
    auth: {
      user: { email, provider },
    },
    user: { firstName, lastName },
  } = useSelector((state) => state);
  const isPasswordAccount = provider === "password";
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className="container settings-container">
      <h1 className="container__title">Your Account Settings</h1>
      {/* User Info Display */}
      <div className="settings-display">
        <h3 className="settings-display__title">Personal Information</h3>

        <div className="settings-display__info">
          <h4 className="settings-display__label">First Name</h4>
          <p className="settings-display__value">{firstName}</p>
        </div>
        <div className="settings-display__info">
          <h4 className="settings-display__label">Last Name</h4>
          <p className="settings-display__value">{lastName}</p>
        </div>
      </div>
      {/* User Log In Info Display */}
      <div className="settings-display">
        <h3 className="settings-display__title">Sign In Information</h3>

        <div className="settings-display__info">
          <h4 className="settings-display__label">Email Address</h4>
          <div className="row">
            <p className="settings-display__value">{email}</p>

            {/* Only for Email Users */}
            {isPasswordAccount && (
              <button
                type="button"
                className="settings-display__edit"
                onClick={() => setShowEmailForm(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Password Info Only for Email Users */}
        {isPasswordAccount && (
          <div className="settings-display__info">
            <h4 className="settings-display__label">Password</h4>
            <div className="row">
              <input
                className="settings-display__value"
                type="password"
                value="PLACEHOLDER__PASSWORD"
                disabled={true}
              />
              <button
                type="button"
                className="settings-display__edit"
                onClick={() => setShowPasswordForm(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Update Email Form */}
      {showEmailForm && (
        <UpdateEmailForm
          closeForm={() => setShowEmailForm(false)}
          oldEmail={email}
        />
      )}

      {/* Update Password Form */}
      {showPasswordForm && (
        <UpdatePasswordForm
          closeForm={() => setShowPasswordForm(false)}
          oldEmail={email}
        />
      )}
    </div>
  );
}

export default Settings;
