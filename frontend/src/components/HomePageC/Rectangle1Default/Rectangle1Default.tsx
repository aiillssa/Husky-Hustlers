import { memo } from 'react';
import type { FC, MouseEventHandler } from 'react';

import resets from '../../_resets.module.css';
import classes from './Rectangle1Default.module.css';

interface Props {
  type: 'food' | 'artwork' | 'service' | 'craft' | 'resell' | 'all';
  onClick?: MouseEventHandler<HTMLDivElement>;
  selected?: boolean;
}

export const Rectangle1Default: FC<Props> = memo(function Rectangle1Default({
  type,
  onClick,
  selected = false,
}) {
  const textMap = {
    food: 'Food',
    artwork: 'Artwork',
    service: 'Service',
    craft: 'Craft',
    resell: 'Resell',
    all: 'All',
  };

  const colorClassMap = {
    food: classes.food,
    artwork: classes.artwork,
    service: classes.service,
    craft: classes.craft,
    resell: classes.resell,
    all: classes.all,
  };

  return (
    <div
      className={`${resets.clapyResets} ${classes.root} ${selected ? classes.selected : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={`${classes.rectangle1} ${colorClassMap[type]}`}></div>
      <div className={classes.text}>{textMap[type]}</div>
    </div>
  );
});
