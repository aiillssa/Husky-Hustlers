import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Arrow_back.module.css';
import { Arrow_backIcon } from './Arrow_backIcon';

interface Props {
  className?: string;
}
/* @figmaId 25:503 */
export const Arrow_back: FC<Props> = memo(function Arrow_back(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.icon}>
        <Arrow_backIcon className={classes.icon2} />
      </div>
    </div>
  );
});
