import React, { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { IconButton } from '../IconButton/IconButton';
import { Menu } from '../Menu/Menu';
import { Search } from '../Search/Search';
import { Icon } from './Icon';
import { Icon2 } from './Icon2';
import classes from './SearchBar.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

/* @figmaId 11:334 */
export const SearchBar: FC<Props> = memo(function SearchBar(props) {
  return (
    <div className={`${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.stateLayer}>
        <IconButton
          swap={{
            icon: (
              <Menu
                swap={{
                  icon: <Icon className={classes.icon} />,
                }}
              />
            ),
          }}
        />
        <div className={classes.content}>
          <input
            placeholder="  Type to search by business name..."
            onChange={props.onSearchChange}
            value={props.value}
          />
        </div>
        <div className={classes.trailingElements}>
          <IconButton
            swap={{
              icon: (
                <Search
                  swap={{
                    icon: <Icon2 className={classes.icon2} />,
                  }}
                />
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default SearchBar;
