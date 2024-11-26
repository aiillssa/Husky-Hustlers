import { memo, useState } from "react";
import type { FC } from "react";
import classes from "./AddbusinessPage.module.css";
import Button from "../../components/Button";
import InputField from "../../components/AddBusinessPageC/InputField/InputField";
import { Navigate } from "react-router-dom";

interface ContactInformation {
  instagram: string;
}

// Categories format passed in from server
interface Shops {
  shopName: string;
  shopDescription: string;
  ownerName: string;
  contactInformation: ContactInformation;
  userIdUsers: Number;
  categories: string[];
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // State variables for submission status and error handling
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State variable for redirection
  const [redirect, setRedirect] = useState(false);

  // Categories for users to select
  const categories: string[] = [
    "Food",
    "Artwork",
    "Service",
    "Craft",
    "Resell",
  ];

  // Set category state to the user selected one
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategories(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Construct the business data object
    const businessData: Shops = {
      shopName,
      shopDescription,
      ownerName,
      contactInformation: {
        instagram,
      },
      userIdUsers: 18, // TODO: fix later
      categories: selectedCategories.map((categoryName) => categoryName),
    };

    try {
      const response = await fetch("http://localhost:8088/shops/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessData),
      });

      if (response.ok) {
        // Handle success
        setSubmitted(true);
        setError(null);

        // Reset the form fields
        setShopName("");
        setShopDescription("");
        setOwnerName("");
        setInstagram("");
        setSelectedCategories([]);

        // Redirect to homepage
        setRedirect(true);
      } else {
        // Handle server errors
        const errorData = await response.json();
        setError(
          errorData.message || "An error occurred while submitting the form."
        );
      }
    } catch (err) {
      // Handle network errors
      console.error("Error submitting data:", err);
      setError("A network error occurred. Please try again later.");
    }
  };

  // Redirect to homepage if redirect state is true
  if (redirect) {
    return <Navigate to="/pages/Homepage" replace />;
  }

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
          label="Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        {/* Category Selection */}
        <div className={classes.inputGroup}>
          <label className={classes.label}>Categories</label>
          <select
            className={classes.select}
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <Button className={classes.button} type="submit">
          Submit
        </Button>

        {/* Success Message */}
        {submitted && !error && (
          <div className={classes.successMessage}>Submission successful!</div>
        )}

        {/* Error Message */}
        {error && <div className={classes.errorMessage}>{error}</div>}
      </form>
      <div className={classes.uWLogo}></div>
    </div>
  );
});

export default AddBusinessPage;
