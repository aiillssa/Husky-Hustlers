import React, { memo, useState, FC } from "react";
import { googleLogout, useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleBackendLogin } from "../../utils/api";
import classes from "./LoginPage.module.css";
import resets from "../../components/_resets.module.css";

interface Props {
  // Prop to update the signed-in state in the parent component
  setSignedIn: (value: boolean) => void;
}

// Component responsible for rendering the login page content
const LoginPageContent: FC<Props> = ({ setSignedIn }) => {
  // State to manage error messages during login
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Google login function using OAuth for authentication
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      // Attempt to authenticate with the backend using the returned auth code
      const { success, error } = await googleBackendLogin(code);

      if (success) {
        // If login is successful, update the signed-in state and 
        // clear any previous error messages
        setSignedIn(true);
        setErrorMessage(null);
      } else {
        // Display an error message if the login fails
        setErrorMessage(error || "Login failed. Please try again.");
      }
    },
    flow: "auth-code",
    onError: (error) => {
      // Handle errors during the login process
      console.error("Login Failed:", error);
      setErrorMessage("Login failed. Please try again.");
    },
  });

  // Function to handle logging out the user
  const logOut = () => {
    googleLogout(); // Clear Google authentication
    localStorage.removeItem("appJwt"); // Remove stored token from local storage
    setErrorMessage(null); // Clear any error messages
    setSignedIn(false); // Update the signed-in state to false
    console.log("signed out");
  };

  return (
    <div className={`${classes.root}`}>
      {/* Navigation bar with brand and prompt */}
      <div className={classes.navBar}>
        <div className={classes.huskyHustler}>Husky Hustler</div>
        <div className={classes.logInSignUpFirstToSeeAllStuden}>
          Log In / Sign Up First to See All Student Business
        </div>
      </div>

      <div className={classes.content_wrapper}>
        {/* Caption describing the platform */}
        <div className={classes.caption}>
          A platform that fosters student businesses and UW community!
        </div>

        {/* Login form */}
        <div className={classes.loginComponent}>
          <div className={classes.title}>
            <div className={classes.helloWelcome}>Hello, Welcome!</div>
            <div className={classes.logInPage}>Log-In Page</div>
          </div>
          <div className={classes.frame1}>
            <div className={classes.formLogIn}>
              {/* Display an error message if present */}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div>
                {/* Button to trigger Google login */}
                <button className={classes.login_button} onClick={() => login()}>
                  Sign in with Google 🚀
                </button>
                {/* Button to log out: We'll move that into a different area later */}
                <button onClick={() => logOut()}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component that wraps the LoginPageContent with the Google OAuth provider.
// All child components can use Google OAuth functionalities.
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
