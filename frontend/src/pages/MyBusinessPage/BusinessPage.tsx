import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../components/_resets.module.css';
import classes from './BusinessPage.module.css';
import { ProfilePicIcon } from './ProfilePicIcon';
import { Rectangle1Default } from '../../components/BusinessPageC/Rectangle1Default/Rectangle1Default';

interface Props {
  className?: string;
}

/* @figmaId 28:2266 */
export const BusinessPage: FC<Props> = memo(function BusinessPage(props = {}) {
  const [hasBusiness, setHasBusiness] = useState(false);

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.infoFrame}>
        {!hasBusiness ? (
          <div className={classes.addBusinessContainer}>
            <h1 className={classes.heading}>BusinessPage</h1>
            <Link to="/pages/AddBusinessPage" className={classes.navButton}>
              Add my business
            </Link>
          </div>
        ) : (
          <>
            <div className={classes.upperFrame}>
              <div className={classes.frame11}>
                <div className={classes.profilePic}>
                  <ProfilePicIcon className={classes.icon} />
                </div>
                <div className={classes.frame10}>
                  <div className={classes.businessName}>Business Name</div>
                  <Rectangle1Default className={classes.rectangle1Default} />
                </div>
              </div>
            </div>
            <div className={classes.lowerFrame}>
              <div className={classes.infoNavigationFrame}>
                <div className={classes.infoNavigation}>
                  <div className={classes.frame8}>
                    <div className={classes.basics}>Basics</div>
                    <div className={classes.other}>Other</div>
                  </div>
                  <div className={classes.pictures}>Pictures</div>
                </div>
                <div className={classes.line1}></div>
              </div>
              <div className={classes.frame18}>
                <div className={classes.descriptionFrame}>
                  <div className={classes.description}>Description:</div>
                  <div className={classes.thisIsDescriptionThisIsDescrip}>
                    This is Description. This is Description. This is Description.
                  </div>
                </div>
                <div className={classes.contactInfoFrame}>
                  <div className={classes.contactInfo}>Contact Info:</div>
                  <div className={classes.emailXxxxxxInstagramXxxxxxxFac}>
                    <div className={classes.textBlock}>Email: xxxxxx</div>
                    <div className={classes.textBlock2}>Instagram: xxxxxxx</div>
                    <div className={classes.textBlock3}>Facebook: xxxxxx</div>
                  </div>
                </div>
                <div className={classes.diettaryFrame}>
                  <div className={classes.dietaryAccommodation}>Dietary Accommodation:</div>
                  <div className={classes.thisIsDietaryAccommodationThis}>
                    This is dietary accommodation.
                  </div>
                </div>
                <div className={classes.deliveryFrame}>
                  <div className={classes.deliveryOption}>Delivery Option:</div>
                  <div className={classes.thisIsDeliveryOptionThisIsDeli}>
                    This is delivery option.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={classes.huskyHustler}>Husky Hustler</div>
      </div>
    </div>
  );
});

export default BusinessPage;
