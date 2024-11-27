import { memo, useState } from "react";
import type { FC } from "react";
import classes from "./AddbusinessPage.module.css";
import Button from "../../components/Button";
import InputField from "../../components/AddBusinessPageC/InputField/InputField";
import { Navigate } from "react-router-dom";

interface ContactInformation {
  instagram: string;
}

// Updated Shops interface with necessaryDescription field
interface Shops {
  shopName: string;
  shopDescription: string;
  ownerName: string;
  contactInformation: ContactInformation;
  userIdUsers: Number;
  categories: string[];
  necessaryDescription?: any;
}

interface Props {
  className?: string;
}

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
  // State for necessaryDescription
  const [necessaryDescription, setNecessaryDescription] = useState<Record<string, string>>({});

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
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
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
      userIdUsers: Number(localStorage.getItem("userID")), 
      categories: selectedCategories,
      necessaryDescription,
    };
    console.log(businessData);
    console.log("userID")
    console.log(localStorage.getItem("userID"));
    
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
        setNecessaryDescription({});

        // Redirect to homepage
        setRedirect(true);
      } else {
        // Handle errors at server
        console.log(response.status)
        if (response.status === 400) {
          setError("Cannot add a business because you have already added one previously, and each person is only allowed to enter one.")
        }
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

  // Function to handle changes in necessaryDescription fields
  const handleNecessaryDescriptionChange = (question: string, answer: string) => {
    setNecessaryDescription((prev) => ({
      ...prev,
      [question]: answer,
    }));
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

        {/* Additional Questions for Food Category */}
        {selectedCategories.includes("Food") && (
          <>
            {/* Any dietary accommodation */}
            <InputField
              label="Any dietary accommodation"
              value={necessaryDescription["Any dietary accommodation"] || ""}
              onChange={(e) =>
                handleNecessaryDescriptionChange("Any dietary accommodation", e.target.value)
              }
            />
            {/* Pick-up option: delivery on campus, pick at seller’s location */}
            <div className={classes.inputGroup}>
              <label className={classes.label}>Pick-up option</label>
              <select
                className={classes.select}
                value={necessaryDescription["Pick-up option (Food)"] || ""}
                onChange={(e) =>
                  handleNecessaryDescriptionChange("Pick-up option (Food)", e.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="delivery on campus">Delivery on campus</option>
                <option value="pick at seller’s location">
                  Pick at seller’s location
                </option>
              </select>
            </div>
          </>
        )}

        {/* Additional Questions for Artwork, Craft, Resell Categories */}
        {(selectedCategories.includes("Artwork") ||
          selectedCategories.includes("Craft") ||
          selectedCategories.includes("Resell")) && (
          <>
            {/* Pick-up option: delivery on campus, pickup at seller’s location, digital */}
            <div className={classes.inputGroup}>
              <label className={classes.label}>Pick-up option</label>
              <select
                className={classes.select}
                value={necessaryDescription["Pick-up option (ACR)"] || ""}
                onChange={(e) =>
                  handleNecessaryDescriptionChange("Pick-up option (ACR)", e.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="delivery on campus">Delivery on campus</option>
                <option value="pickup at seller’s location">
                  Pickup at seller’s location
                </option>
                <option value="digital">Digital</option>
              </select>
            </div>
          </>
        )}

        {/* Additional Questions for Service Category */}
        {selectedCategories.includes("Service") && (
          <>
            {/* Business hour */}
            <InputField
              label="Business hour"
              value={necessaryDescription["Business hour"] || ""}
              onChange={(e) =>
                handleNecessaryDescriptionChange("Business hour", e.target.value)
              }
            />
            {/* Open to travel: yes, no, my business is online */}
            <div className={classes.inputGroup}>
              <label className={classes.label}>Open to travel</label>
              <select
                className={classes.select}
                value={necessaryDescription["Open to travel"] || ""}
                onChange={(e) =>
                  handleNecessaryDescriptionChange("Open to travel", e.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="my business is online">
                  My business is online
                </option>
              </select>
            </div>
          </>
        )}

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
