import { memo } from 'react';
import type { FC } from 'react';
import resets from '../../components/_resets.module.css';

import Button from "../../components/AddBusinessPageC/Button/Button";
import { InputField } from '../../components/AddBusinessPageC/InputField/InputField';
import classes from './AddbusinessPage.module.css';

interface Props {
  className?: string;
  hide?: {
    description?: boolean;
    description2?: boolean;
    description3?: boolean;
    description4?: boolean;
  };
}

/* @figmaId 120:727 */
const AddBusinessPage: FC<Props> = memo(function AddBusinessPage(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.frame2}>
        <div className={classes.formSignUp}>
          {/* Business Name Field */}
          <InputField
            className={classes.username2}
            text={{
              label: <div className={classes.username}>Business Name</div>,
            }}
          />
          {!props.hide?.description && (
            <div className={classes.description}>Some Description</div>
          )}

          {/* Description Field */}
          <InputField
            className={classes.email2}
            text={{
              label: <div className={classes.email}>Description</div>,
            }}
          />
          {!props.hide?.description2 && (
            <div className={classes.description2}>Some Description</div>
          )}

          {/* Pricing Field */}
          <InputField
            className={classes.password2}
            text={{
              label: <div className={classes.password}>Pricing</div>,
            }}
          />
          {!props.hide?.description3 && (
            <div className={classes.description3}>Some Description</div>
          )}

          {/* Type Field */}
          <InputField
            className={classes.password4}
            text={{
              label: <div className={classes.password3}>Type</div>,
            }}
          />
          {!props.hide?.description4 && (
            <div className={classes.description4}>Some Description</div>
          )}

          {/* Submit Button */}
          <div className={classes.buttonGroup}>
            <Button
              className={classes.button2}
              text={{
                button: <div className={classes.button}>Submit</div>,
              }}
            />
          </div>
        </div>
      </div>
      <div className={classes.addYourBusiness}>
        <div className={classes.textBlock}>Add Your </div>
        <div className={classes.textBlock2}>Business</div>
      </div>
      <div className={classes.startYourBusinessHere}>Start Your Business Here</div>
      <div className={classes.uWLogo}></div>
    </div>
  );
});

export default AddBusinessPage;
