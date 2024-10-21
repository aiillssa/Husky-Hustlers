import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './InputField_StateDefaultValueTy.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  text?: {
    label?: ReactNode;
  };
}
/* @figmaId 9:82 */
export const InputField_StateDefaultValueTy: FC<Props> = memo(function InputField_StateDefaultValueTy(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      {props.text?.label != null ? props.text?.label : <div className={classes.label}>Label</div>}
      <div className={classes.input}>
        <div className={classes.value}>Value</div>
      </div>
    </div>
  );
});
