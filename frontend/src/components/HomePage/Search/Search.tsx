import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './Search.module.css';
import { SearchIcon } from './SearchIcon';

interface Props {
  className?: string;
  swap?: {
    icon?: ReactNode;
  };
}
/* @figmaId 11:312 */
export const Search: FC<Props> = memo(function Search(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.icon}>{props.swap?.icon || <SearchIcon className={classes.icon2} />}</div>
    </div>
  );
});
