import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './Rectangle1Default.module.css';

interface Props {
  className?: string;
  classes?: {
    rectangle1?: string;
  };
  text?: {
    food?: ReactNode;
  };
}
/* @figmaId 11:469 */
export const Rectangle1Default: FC<Props> = memo(function Rectangle1Default(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={`${props.classes?.rectangle1 || ''} ${classes.rectangle1}`}></div>
      {props.text?.food != null ? props.text?.food : <div className={classes.food}>Food</div>}
    </div>
  );
});
