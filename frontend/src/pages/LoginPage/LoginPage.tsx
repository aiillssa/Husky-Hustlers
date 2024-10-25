import { memo } from "react";
import type { FC } from "react";

import classes from "./LoginPage.module.css";
import resets from "../../components/_resets.module.css";

import React, { useState, useEffect } from "react";
import {
  googleLogout,
  useGoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import axios from "axios";

interface Props {
  className?: string;
}

interface User {
  access_token: string;
}

interface Profile {
  picture: string;
  name: string;
  email: string;
  hd?: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const login = useGoogleLogin({
    onSuccess: (codeResponse: User) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          //getting user data from google server
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              // allmighty user token
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const userProfile: Profile = res.data;
          // Check if hd exists and is equal to 'uw.edu'
          if (userProfile.hd === "uw.edu") {
            setProfile(userProfile);
            setErrorMessage(null); // Clear any previous errors
            console.log("set profile");
          } else {
            setProfile(null); // Clear profile if hd is not uw.edu
            setErrorMessage("Access denied. Please use a UW email account."); // Set error message
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out button
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setErrorMessage(null); // Clear error message on logout
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
      {/* Render error message if it exists */}
      {profile ? (
        <div>
          <img src={profile.picture} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      )}
    </div>
  );
};

// Must wrap the page in the OAuth Provider to appease master google
export const LoginPage: FC<Props> = memo(function LoginPage(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <React.StrictMode>
        <GoogleOAuthProvider clientId="410136854211-33d088kspbh9se3oej3sebpmj0jal8v7.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </React.StrictMode>
    </div>
  );
});

export default LoginPage;
