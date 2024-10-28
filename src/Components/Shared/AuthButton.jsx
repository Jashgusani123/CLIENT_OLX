import React from 'react';

const AuthButton = ({ isSignup, handleAuth }) => {
  return (
    <div className="auth-button-container">
      <button className="auth-button" onClick={handleAuth}>
        {isSignup ? 'Sign Up with Auth0' : 'Log In with Auth0'}
      </button>
    </div>
  );
};

export default AuthButton;
