import React, { useState, useEffect } from "react";
import { memo, FC } from "react";
import {
  googleLogout,
  useGoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

import classes from "./LoginPage.module.css";
import resets from "../../components/_resets.module.css";
import { googleBackendLogin } from "../../utils/api";

interface Props {
  setSignedIn: (value: boolean) => void;
}

const LoginPageContent: FC<Props> = ({ setSignedIn }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // ask backend to autheticate the login
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      googleBackendLogin(code);
    },
    flow: "auth-code",
    onError: (error) => {
      console.error("Login Failed:", error);
      setErrorMessage("Login failed. Please try again.");
    },
  });

  const logOut = () => {
    googleLogout();
    localStorage.removeItem("appJwt");
    setErrorMessage(null);
    setSignedIn(false);
    console.log("signed out");
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={() => login()}>Sign in with Google 🚀</button>
      <button onClick={() => logOut()}>log out</button>
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
