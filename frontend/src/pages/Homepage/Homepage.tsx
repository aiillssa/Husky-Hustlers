import { memo } from 'react';
import type { FC } from 'react';

import classes from './Homepage.module.css';
import resets from '../../components/_resets.module.css';
import { HomePage } from '../../components/HomePage/HomePage';

interface Props {
  className?: string;
}
export const Homepage: FC<Props> = memo(function Homepage(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <HomePage />
    </div>
  );
});


export default Homepage 