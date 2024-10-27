import React, { useState, useEffect } from "react";
import { memo, FC } from "react";
import { googleLogout, useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import classes from "./LoginPage.module.css";
import resets from "../../components/_resets.module.css";

interface Props {
  setSignedIn: (value: boolean) => void; // Accepts setSignedIn as a prop from App.tsx
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

const LoginPageContent: FC<Props> = ({ setSignedIn }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: User) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const userProfile: Profile = res.data;
          if (userProfile.hd === "uw.edu") {
            setProfile(userProfile);
            setErrorMessage(null);
            setSignedIn(true); // Update signedIn state in App.tsx
          } else {
            setProfile(null);
            setErrorMessage("Access denied. Please use a UW email account.");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, setSignedIn]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setErrorMessage(null);
    setSignedIn(false); // Reset signedIn on logout
  };

  return (
    <div>
      <h2>Login Here!</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {profile ? (
        <div>
          <img src={profile.picture} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      )}
    </div>
  );
};

export const LoginPage: FC<Props> = memo(function LoginPage(props: Props) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <GoogleOAuthProvider clientId="410136854211-33d088kspbh9se3oej3sebpmj0jal8v7.apps.googleusercontent.com">
        <LoginPageContent {...props} />
      </GoogleOAuthProvider>
    </div>
  );
});

export default LoginPage;
