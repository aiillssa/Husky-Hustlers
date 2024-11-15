import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Rectangle1Default.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 11:469 */
export const Rectangle1Default: FC<Props> = memo(function Rectangle1Default(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.rectangle1}></div>
      <div className={classes.food}>Food</div>
    </div>
  );
});
