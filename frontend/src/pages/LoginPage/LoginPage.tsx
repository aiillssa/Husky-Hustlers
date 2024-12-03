import React, { memo, useState, FC } from "react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogIn, googleSignUp } from "../../utils/api";
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
      } else {
        // Display an error message if the sign up fails
        setErrorMessage(result.error || "Sign up failed. Please try again.");
      }
    },
    flow: "auth-code",
    onError: (error) => {
      // Handle errors during the sign up process
      console.error("Sign up Failed:", error);
      setErrorMessage("Sign up failed. Please try again.");
    },
  });

  // Function to handle logging out the user

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
            <div className={classes.logInPage}>Join Our Community</div>
          </div>
          <div>
            <div className={classes.formLogIn}>
              {/* Display an error message if present */}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {/* Button to trigger Google Sign up */}
              <button className={classes.logout_button} onClick={() => signup()}>
                  Sign up with Google
                </button>
                {/* Button to trigger Google login */}
                <button className={classes.login_button} onClick={() => login()}>
                  Sign in with Google
                </button>
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
