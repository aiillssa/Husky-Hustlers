import React, { Component } from 'react';
import type { FC } from 'react';

import resets from '../../components/_resets.module.css';
import classes from './Homepage.module.css';
import { Rectangle1Default } from '../../components/HomePageC/Rectangle1Default/Rectangle1Default';
import { SearchBar } from '../../components/HomePageC/SearchBar/SearchBar';

type HomepageState = {
  listOfSellers: String | null;
};

// interface Props {
//   className?: string;
// }
/* @figmaId 18:73 */
export class Homepage extends Component<{}, HomepageState> {
  constructor(props: {}) {
    super(props);
    this.state = { listOfSellers: null };
  }

  render () {
    return (
      <div className={classes.root}>
        <SearchBar className={classes.searchBar} />
        <div className = {classes.type}>
          <Rectangle1Default classes={{ rectangle1: classes.rectangle1 }} />
          <Rectangle1Default
              classes={{ rectangle1: classes.rectangle2 }}
              text={{
                food: <div className={classes.food}>Art Work</div>,
              }}
            />
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle3 }}
              text={{
                food: <div className={classes.food}>Service</div>,
              }}
            />
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle10 }}
              text={{
                food: <div className={classes.food}>Craft</div>,
              }}
            />
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle12 }}
              text={{
                food: <div className={classes.food}>Resell</div>,
              }}
            />
        </div>
        <div className={classes.cardGrid}>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name}>Name</div>
              <div className={classes.businessName}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr1}>
              <div className={classes.textBlock}>Keyword Description</div>
            </div>
            <Rectangle1Default classes={{ rectangle1: classes.rectangle1 }} />
          </div>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name2}>Name</div>
              <div className={classes.businessName2}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr2}>
              <div className={classes.textBlock2}>Keyword Description</div>
            </div>
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle2 }}
              text={{
                food: <div className={classes.food}>Art Work</div>,
              }}
            />
          </div>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name3}>Name</div>
              <div className={classes.businessName3}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr3}>
              <div className={classes.textBlock3}>Keyword Description</div>
            </div>
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle3 }}
              text={{
                food: <div className={classes.food2}>Service</div>,
              }}
            />
          </div>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name4}>Name</div>
              <div className={classes.businessName4}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr4}>
              <div className={classes.textBlock4}>Keyword Description</div>
            </div>
            <Rectangle1Default classes={{ rectangle1: classes.rectangle4 }} />
          </div>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name5}>Name</div>
              <div className={classes.businessName5}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr5}>
              <div className={classes.textBlock5}>Keyword Description</div>
            </div>
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle5 }}
              text={{
                food: <div className={classes.food3}>Service</div>,
              }}
            />
          </div>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name6}>Name</div>
              <div className={classes.businessName6}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr6}>
              <div className={classes.textBlock6}>Keyword Description</div>
            </div>
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle6 }}
              text={{
                food: <div className={classes.food4}>Art Work</div>,
              }}
            />
          </div>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name7}>Name</div>
              <div className={classes.businessName7}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr7}>
              <div className={classes.textBlock7}>Keyword Description</div>
            </div>
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle7 }}
              text={{
                food: <div className={classes.food5}>Service</div>,
              }}
            />
          </div>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name8}>Name</div>
              <div className={classes.businessName8}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr8}>
              <div className={classes.textBlock8}>Keyword Description</div>
            </div>
            <Rectangle1Default
              classes={{ rectangle1: classes.rectangle8 }}
              text={{
                food: <div className={classes.food6}>Art Work</div>,
              }}
            />
          </div>
          <div className={classes.card}>
            <div className={classes.cardHeading}>
              <div className={classes.name9}>Name</div>
              <div className={classes.businessName9}>Business Name</div>
            </div>
            <div className={classes.keywordDescriptionKeywordDescr9}>
              <div className={classes.textBlock9}>Keyword Description</div>
            </div>
            <Rectangle1Default classes={{ rectangle1: classes.rectangle9 }} />
          </div>
        </div>
      </div>
    );
  }
};

export default Homepage