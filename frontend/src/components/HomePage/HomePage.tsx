import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './HomePage.module.css';
import { Rectangle1Default } from './Rectangle1Default/Rectangle1Default';
import { SearchBar_StateEnabledShowAvat } from './SearchBar_StateEnabledShowAvat/SearchBar_StateEnabledShowAvat';

interface Props {
  className?: string;
}
/* @figmaId 18:73 */
export const HomePage: FC<Props> = memo(function HomePage(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.uWLogo}></div>
      <div className={classes.cardGrid}>
        <div className={classes.card1}>
          <div className={classes.cardHeading}>
            <div className={classes.name}>Name</div>
            <div className={classes.businessName}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr}>
            <div className={classes.textBlock}>Keyword Description</div>
            <div className={classes.textBlock2}>Keyword Description</div>
            <div className={classes.textBlock3}>Keyword Description</div>
          </div>
          <Rectangle1Default classes={{ rectangle1: classes.rectangle1 }} />
        </div>
        <div className={classes.card12}>
          <div className={classes.cardHeading2}>
            <div className={classes.name2}>Name</div>
            <div className={classes.businessName2}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr2}>
            <div className={classes.textBlock4}>Keyword Description</div>
            <div className={classes.textBlock5}>Keyword Description</div>
            <div className={classes.textBlock6}>Keyword Description</div>
          </div>
          <Rectangle1Default
            classes={{ rectangle1: classes.rectangle12 }}
            text={{
              food: <div className={classes.food}>Art Work</div>,
            }}
          />
        </div>
        <div className={classes.card13}>
          <div className={classes.cardHeading3}>
            <div className={classes.name3}>Name</div>
            <div className={classes.businessName3}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr3}>
            <div className={classes.textBlock7}>Keyword Description</div>
            <div className={classes.textBlock8}>Keyword Description</div>
            <div className={classes.textBlock9}>Keyword Description</div>
          </div>
          <Rectangle1Default
            classes={{ rectangle1: classes.rectangle13 }}
            text={{
              food: <div className={classes.food2}>Service</div>,
            }}
          />
        </div>
        <div className={classes.card14}>
          <div className={classes.cardHeading4}>
            <div className={classes.name4}>Name</div>
            <div className={classes.businessName4}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr4}>
            <div className={classes.textBlock10}>Keyword Description</div>
            <div className={classes.textBlock11}>Keyword Description</div>
            <div className={classes.textBlock12}>Keyword Description</div>
          </div>
          <Rectangle1Default classes={{ rectangle1: classes.rectangle14 }} />
        </div>
        <div className={classes.card15}>
          <div className={classes.cardHeading5}>
            <div className={classes.name5}>Name</div>
            <div className={classes.businessName5}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr5}>
            <div className={classes.textBlock13}>Keyword Description</div>
            <div className={classes.textBlock14}>Keyword Description</div>
            <div className={classes.textBlock15}>Keyword Description</div>
          </div>
          <Rectangle1Default
            classes={{ rectangle1: classes.rectangle15 }}
            text={{
              food: <div className={classes.food3}>Service</div>,
            }}
          />
        </div>
        <div className={classes.card16}>
          <div className={classes.cardHeading6}>
            <div className={classes.name6}>Name</div>
            <div className={classes.businessName6}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr6}>
            <div className={classes.textBlock16}>Keyword Description</div>
            <div className={classes.textBlock17}>Keyword Description</div>
            <div className={classes.textBlock18}>Keyword Description</div>
          </div>
          <Rectangle1Default
            classes={{ rectangle1: classes.rectangle16 }}
            text={{
              food: <div className={classes.food4}>Art Work</div>,
            }}
          />
        </div>
        <div className={classes.card17}>
          <div className={classes.cardHeading7}>
            <div className={classes.name7}>Name</div>
            <div className={classes.businessName7}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr7}>
            <div className={classes.textBlock19}>Keyword Description</div>
            <div className={classes.textBlock20}>Keyword Description</div>
            <div className={classes.textBlock21}>Keyword Description</div>
          </div>
          <Rectangle1Default
            classes={{ rectangle1: classes.rectangle17 }}
            text={{
              food: <div className={classes.food5}>Service</div>,
            }}
          />
        </div>
        <div className={classes.card18}>
          <div className={classes.cardHeading8}>
            <div className={classes.name8}>Name</div>
            <div className={classes.businessName8}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr8}>
            <div className={classes.textBlock22}>Keyword Description</div>
            <div className={classes.textBlock23}>Keyword Description</div>
            <div className={classes.textBlock24}>Keyword Description</div>
          </div>
          <Rectangle1Default
            classes={{ rectangle1: classes.rectangle18 }}
            text={{
              food: <div className={classes.food6}>Art Work</div>,
            }}
          />
        </div>
        <div className={classes.card19}>
          <div className={classes.cardHeading9}>
            <div className={classes.name9}>Name</div>
            <div className={classes.businessName9}>Business Name</div>
          </div>
          <div className={classes.keywordDescriptionKeywordDescr9}>
            <div className={classes.textBlock25}>Keyword Description</div>
            <div className={classes.textBlock26}>Keyword Description</div>
            <div className={classes.textBlock27}>Keyword Description</div>
          </div>
          <Rectangle1Default classes={{ rectangle1: classes.rectangle19 }} />
        </div>
      </div>
      <div className={classes.typeSelection}>
        <Rectangle1Default />
        <Rectangle1Default
          text={{
            food: <div className={classes.artWork}>Art Work</div>,
          }}
        />
        <Rectangle1Default
          text={{
            food: <div className={classes.food7}>Service</div>,
          }}
        />
        <Rectangle1Default
          text={{
            food: <div className={classes.food8}>Craft</div>,
          }}
        />
        <Rectangle1Default
          text={{
            food: <div className={classes.food9}>Re-Sell</div>,
          }}
        />
      </div>
      <SearchBar_StateEnabledShowAvat className={classes.searchBar} />
      <div className={classes.huskyHustler}>Husky Hustler</div>
      <div className={classes.homepage}>Homepage</div>
      <div className={classes.profile}>Profile</div>
    </div>
  );
});
