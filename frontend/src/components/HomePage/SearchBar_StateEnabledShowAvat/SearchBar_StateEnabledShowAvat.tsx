import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { IconButton_StyleStandardStateE } from '../IconButton_StyleStandardStateE/IconButton_StyleStandardStateE';
import { Menu } from '../Menu/Menu';
import { Search } from '../Search/Search';
import { Icon } from './Icon';
import { Icon2 } from './Icon2';
import classes from './SearchBar_StateEnabledShowAvat.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 11:334 */
export const SearchBar_StateEnabledShowAvat: FC<Props> = memo(function SearchBar_StateEnabledShowAvat(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.stateLayer}>
        <IconButton_StyleStandardStateE
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
          <div className={classes.supportingText}>Hinted search text</div>
        </div>
        <div className={classes.trailingElements}>
          <IconButton_StyleStandardStateE
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
