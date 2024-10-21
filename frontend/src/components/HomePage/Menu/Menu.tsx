import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './Menu.module.css';
import { MenuIcon } from './MenuIcon';

interface Props {
  className?: string;
  swap?: {
    icon?: ReactNode;
  };
}
/* @figmaId 11:310 */
export const Menu: FC<Props> = memo(function Menu(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.icon}>{props.swap?.icon || <MenuIcon className={classes.icon2} />}</div>
    </div>
  );
});
