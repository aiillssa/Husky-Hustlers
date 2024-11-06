import React, { memo, useState, useEffect, FC } from "react";
import { googleLogout, useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios"


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
      // Security Risk here as it might be called
      // despite login fail.
      // Must check that google login is successful first
      // before calling setSignedIn(true);
      setSignedIn(true);
    },
    flow: "auth-code",
    onError: (error) => {
      console.error("Login Failed:", error);
      setErrorMessage("Login failed. Please try again.");
    },
  });

  const logOut = () => {
    googleLogout();
    // Possible security Risk to an XSS attack
    localStorage.removeItem("appJwt");
    setErrorMessage(null);
    setSignedIn(false);
    console.log("signed out");
  };

  return (
    <div className={`${classes.root}`}>
      <div className={classes.navBar}>
        <div className={classes.huskyHustler}>Husky Hustler</div>
        <div className={classes.logInSignUpFirstToSeeAllStuden}>
          Log In / Sign Up First to See All Student Business
        </div>
      </div>
      <div className={classes.content_wrapper}>
        <div className={classes.caption}>
          A platform that fosters student businesses and UW community!
        </div>
        <div className={classes.loginComponent}>
          <div className={classes.title}>
            <div className={classes.helloWelcome}>Hello, Welcome!</div>
            <div className={classes.logInPage}>Log-In Page</div>
          </div>
          <div className={classes.frame1}>
            <div className={classes.formLogIn}>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div>
                  <button
                    className={classes.login_button}
                    onClick={() => login()}
                  >
                    Sign in with Google 🚀
                  </button>
                  <button onClick={() => logOut()}>log out</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoginPage: FC<Props> = memo(function LoginPage(props: Props) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      {/*Largest security Risk is showing this client ID*/}
      <GoogleOAuthProvider clientId="410136854211-33d088kspbh9se3oej3sebpmj0jal8v7.apps.googleusercontent.com">
        <LoginPageContent {...props} />
      </GoogleOAuthProvider>
    </div>
  );
});

export default LoginPage;
