import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './BegingingLogIn.module.css';
import Button from './Button/Button';
import { InputField } from './InputField/InputField';
import { TextLink } from './TextLink/TextLink';

interface Props {
  className?: string;
}
/* @figmaId 9:502 */
export const BegingingLogIn: FC<Props> = memo(function BegingingLogIn(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.caption}>A platform that fosters student businesses and UW community!</div>
      <div className={classes.loginComponent}>
        <div className={classes.frame1}>
          <div className={classes.formLogIn}>
            <InputField
              className={classes.username2}
              text={{
                label: <div className={classes.username}>Username or UW Email</div>,
              }}
            />
            <InputField
              className={classes.password2}
              text={{
                label: <div className={classes.password}>Password</div>,
              }}
            />
            <TextLink
              className={classes.createAnAccount}
              text={{
                textLink: <div className={classes.textLink}>Create an Account</div>,
              }}
            />
            <div className={classes.buttonGroup}>
              <Button
                className={classes.button2}
                text={{
                  button: <div className={classes.button}>Log In</div>,
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.title}>
          <div className={classes.helloWelcome}>Hello, Welcome!</div>
          <div className={classes.logInPage}>Log-In Page</div>
        </div>
      </div>
      <div className={classes.image2}></div>
      <div className={classes.uWLogo}></div>
      <div className={classes.navBar}>
        <div className={classes.huskyHustler}>Husky Hustler</div>
        <div className={classes.logInSignUpFirstToSeeAllStuden}>Log In / Sign Up First to See All Student Business</div>
      </div>
    </div>
  );
});
