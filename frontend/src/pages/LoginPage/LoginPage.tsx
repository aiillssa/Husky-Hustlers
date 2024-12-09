import React, { memo, useState, FC } from "react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogIn, googleSignUp } from "../../utils/api";
import classes from "./LoginPage.module.css";
interface Props {
  // Prop to update the signed-in state in the parent component
  setSignedIn: (value: boolean) => void;
}

// Component responsible for rendering the login page content
const LoginPageContent: FC<Props> = ({ setSignedIn }) => {
  // State to manage error messages during login
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Google login function using OAuth for authentication
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      // Attempt to authenticate with the backend using the returned auth code
      const result = await googleLogIn(code);

      if (result.success) {
        // If login is successful, update the signed-in state and
        // clear any previous error messages
        console.log("User logged in successfully!");

        setSignedIn(true);
        setErrorMessage(null);
      } else {
        // Display an error message if the login fails
        setErrorMessage(result.error || "Login failed. Please try again.");
      }
    },
    flow: "auth-code",
    onError: (error) => {
      // Handle errors during the login process
      console.error("Login Failed:", error);
      setErrorMessage("Login failed. Please try again.");
    },
  });

  const signup = useGoogleLogin({
    onSuccess: async ({ code }) => {
      // Attempt to authenticate with the backend using the returned auth code
      const result = await googleSignUp(code);

      if (result.success) {
        // If login is successful, update the signed-in state and
        // clear any previous error messages
        console.log("User signed up successfully!");
        setErrorMessage(null);
        setSuccessMessage("Sign up successful! Please login to view Huskey Hustlers!");
      } else {
        // Display an error message if the sign up fails
        setErrorMessage(result.error || "Sign up failed. Please try again.");
        setSuccessMessage(null);
      }
    },
    flow: "auth-code",
    onError: (error) => {
      // Handle errors during the sign up process
      console.error("Sign up Failed:", error);
      setErrorMessage("Sign up failed. Please try again.");
      setSuccessMessage(null);
    },
  });

  // Function to handle logging out the user

  return (
    <div className={`${classes.root}`}>
      {/* Navigation bar with brand and prompt */}
      <div className={classes.navBar}>
        <span>Husky Hustlers</span>
        <span>Log In / Sign Up First to See All Student Business</span>
  </div>

      <div className={classes.content_wrapper}>
        {/* Logo */}
        <div className={classes.logoWrapper}>
          <img
            src="https://hustlers.blob.core.windows.net/images/defaultLogo.png"
            alt="Husky Hustlers Logo"
            className={classes.logo}
          />
        </div>
        {/* Caption describing the platform */}
        <div className={classes.caption}>
          A platform that fosters student businesses and UW community!
        </div>
          {/* Login form */}
          <div className={classes.loginComponent}>
            <div className={classes.title}>
              <div className={classes.helloWelcome}>
                Welcome to Husky Hustlers!
              </div>
              <div className={classes.join}>Join Our Community</div>
            </div>
            <div className={classes.formLogIn}>
              {/* Display an error message if present */}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
              {/* Button to trigger Google Sign up */}
              {/* Button to trigger Google login */}
              <button className={classes.login_button} onClick={() => login()}>
                Sign in with Google
              </button>
              <button
                className={classes.logout_button}
                onClick={() => signup()}
              >
                Don't have an account? Click here to sign up!
              </button>
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
    <div className={classes.root}>
      <GoogleOAuthProvider clientId="410136854211-33d088kspbh9se3oej3sebpmj0jal8v7.apps.googleusercontent.com">
        <LoginPageContent {...props} />
      </GoogleOAuthProvider>
    </div>
  );
});

export default LoginPage;
