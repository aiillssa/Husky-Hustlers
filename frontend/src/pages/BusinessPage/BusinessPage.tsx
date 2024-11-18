import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import type { FC } from 'react';
import { ProfilePicIcon } from './ProfilePicIcon';
import resets from '../../components/_resets.module.css';
import classes from './BusinessPage.module.css';

interface Props {
  className?: string;
}

// Main functional component for the BusinessPage
export const BusinessPage: FC<Props> = memo(function BusinessPage(props = {}) {
  // State to track if a business is associated with the user
  const [hasBusiness, setHasBusiness] = useState(false); // True will rendere the user's business page

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      {/* Main container for the business information */}
      <div className={classes.infoFrame}>
        {!hasBusiness ? (
          // If no business is associated, display a prompt to add a business
          <div className={classes.addBusinessContainer}>
            <h1 className={classes.heading}>BusinessPage</h1>
            {/* Link to the Add Business Page */}
            <Link to="/pages/AddBusinessPage" className={classes.navButton}>
              Add my business
            </Link>
          </div>
        ) : (
          // If a business is associated, display the business information
          <>
            <div className={classes.upperFrame}>
              {/* Section for profile and business details */}
              <div className={classes.frame11}>
                <div className={classes.profilePic}>
                  {/* Profile picture icon */}
                  <ProfilePicIcon className={classes.icon} />
                </div>
                <div className={classes.frame10}>
                  {/* Business name */}
                  <div className={classes.businessName}>Business Name</div>
                </div>
              </div>
            </div>
            <div className={classes.lowerFrame}>
              {/* Navigation frame for additional business info */}
              <div className={classes.infoNavigationFrame}>
                <div className={classes.infoNavigation}>
                  <div className={classes.frame8}>
                    <div className={classes.basics}>Basics</div>
                    <div className={classes.other}>Other</div>
                  </div>
                  <div className={classes.pictures}>Pictures</div>
                </div>
                {/* Divider line */}
                <div className={classes.line1}></div>
              </div>
              {/* Section for detailed business information */}
              <div className={classes.frame18}>
                {/* Description section */}
                <div className={classes.descriptionFrame}>
                  <div className={classes.description}>Description:</div>
                  <div className={classes.thisIsDescriptionThisIsDescrip}>
                    This is Description. This is Description. This is Description.
                  </div>
                </div>
                {/* Contact information section */}
                <div className={classes.contactInfoFrame}>
                  <div className={classes.contactInfo}>Contact Info:</div>
                  <div className={classes.emailXxxxxxInstagramXxxxxxxFac}>
                    <div className={classes.textBlock}>Email: xxxxxx</div>
                    <div className={classes.textBlock2}>Instagram: xxxxxxx</div>
                    <div className={classes.textBlock3}>Facebook: xxxxxx</div>
                  </div>
                </div>
                {/* Dietary accommodations section */}
                <div className={classes.diettaryFrame}>
                  <div className={classes.dietaryAccommodation}>Dietary Accommodation:</div>
                  <div className={classes.thisIsDietaryAccommodationThis}>
                    This is dietary accommodation.
                  </div>
                </div>
                {/* Delivery options section */}
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
      </div>
    </div>
  );
});

export default BusinessPage;
