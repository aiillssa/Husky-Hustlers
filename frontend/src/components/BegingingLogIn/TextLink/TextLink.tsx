import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './TextLink.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  text?: {
    textLink?: ReactNode;
  };
}
/* @figmaId 9:254 */
export const TextLink: FC<Props> = memo(function TextLink(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      {props.text?.textLink != null ? props.text?.textLink : <div className={classes.textLink}>Text Link</div>}
    </div>
  );
});
