import { memo, useState } from "react";
import type { FC } from "react";
import resets from "../../components/_resets.module.css";

import Button from "../../components/AddBusinessPageC/Button/Button";
import InputField from "../../components/AddBusinessPageC/InputField/InputField";
import classes from "./AddBusinessPage.module.css";

interface ContactInformation {
  instagram: string;
}

interface Category {
  id: number;
  name: string;
}

interface Shops {
  idshops: number;
  shopName: string;
  shopDescription: string;
  ownerName: string;
  contactInformation: ContactInformation;
  categories: Category[];
}

interface Props {
  className?: string;
}

/* @figmaId 120:727 */
const AddBusinessPage: FC<Props> = memo(function AddBusinessPage(props) {
  // State variables for each form field
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // Mock categories data (you can replace this with data fetched from an API)
  const categories: Category[] = [
    { id: 1, name: "Art" },
    { id: 2, name: "Retail" },
    { id: 3, name: "Service" },
    // Add more categories as needed
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => Number(option.value)
    );
    setSelectedCategories(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct the business data object
    const businessData: Shops = {
      idshops: Date.now(), // Generate a unique ID (you can adjust this as needed)
      shopName,
      shopDescription,
      ownerName,
      contactInformation: {
        instagram,
      },
      categories: selectedCategories.map(
        (id) => categories.find((cat) => cat.id === id)!
      ),
    };
    console.log("Submitted Business Data:", businessData);
    // TODO: Send this data to the server or perform any action
  };

  return (
    <div className={classes.root}>
      <div className={classes.addYourBusiness}>
        <div className={classes.textBlock}>Add Your Business</div>
        <div className={classes.startYourBusinessHere}>
          Start Your Business Here
        </div>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        {/* Business Name Field */}
        <InputField
          label="Business Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />

        {/* Shop Description Field */}
        <InputField
          label="Shop Description"
          value={shopDescription}
          onChange={(e) => setShopDescription(e.target.value)}
        />

        {/* Owner Name Field */}
        <InputField
          label="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />

        {/* Instagram Handle Field */}
        <InputField
          label="Instagram Handle"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        {/* Category Selection */}
        <div className={classes.inputGroup}>
          <label className={classes.label}>Categories</label>
          <select
            className={classes.select}
            multiple
            value={selectedCategories.map(String)}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className={classes.buttonGroup}>
          <Button
            className={classes.button2}
            text={{
              button: <div className={classes.button}>Submit</div>,
            }}
          />
        </div>
      </form>
      <div className={classes.uWLogo}></div>
    </div>
  );
});

export default AddBusinessPage;
