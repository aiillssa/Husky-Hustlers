import { memo } from 'react';
import type { FC } from 'react';

import classes from './LoginPage.module.css';
import resets from '../../components/_resets.module.css';
import { BegingingLogIn } from '../../components/BegingingLogIn/BegingingLogIn';

interface Props {
  className?: string;
}
export const LoginPage: FC<Props> = memo(function LoginPage(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <BegingingLogIn />
    </div>
  );
});

export default LoginPage