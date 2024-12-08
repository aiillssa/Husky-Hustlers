import { memo, useState } from "react";
import type { FC } from "react";
import classes from "./AddbusinessPage.module.css";
import Button from "../../components/Button";
import InputField from "../../components/AddBusinessPageC/InputField/InputField";
import { Navigate } from "react-router-dom";
import UploadBannerImage from "../../components/UploadBannerFormC/UploadBannerForm";
import { createShop } from "../../utils/api";
import { UploadProductImages } from "../../components/UploadMultiProductImgGridC/UploadMultiProductImgGrid";
import UploadHomepageIcon from "../../components/UploadHomepageIconC/UploadHomepageIcon";

interface ContactInformation {
  instagram: string;
}

// Updated Shops interface with necessaryDescription field
interface Shops {
  shopName: string;
  shopDescription: string;
  ownerName: string;
  contactInformation: ContactInformation;
  userIdUsers: number;
  categories: string[];
  necessaryDescription?: Record<string, string>;
  products?: Product[];
}

export type Product = {
  caption: string,
  price: string,
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // State variables for submission status and error handling
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State variable for redirection
  const [redirect, setRedirect] = useState(false);

  // State for necessaryDescription
  const [necessaryDescription, setNecessaryDescription] = useState<
    Record<string, string>
  >({});

  // State for form field errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [products, setProducts] = useState<Product[]>([])

  // Categories for users to select
  const categories: string[] = [
    "Food",
    "Artwork",
    "Service",
    "Craft",
    "Resell",
  ];

  const uploadImageCallback = (products: Product[]) => {
    console.log("updated products");
    if (products.length == 0) {
      return;
    }
    setProducts(products);

  }

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async () => {
    // Reset previous errors
    setErrors({});
    let formIsValid = true;
    let fieldErrors: { [key: string]: string } = {};

    // Basic fields and additional fields are required
    const requiredFields = [
      { value: shopName, name: "shopName" },
      { value: shopDescription, name: "shopDescription" },
      { value: ownerName, name: "ownerName" },
      { value: instagram, name: "instagram" },
    ];

    // Validate basic required fields
    requiredFields.forEach(({ value, name }) => {
      if (!value.trim()) {
        formIsValid = false;
        fieldErrors[name] = "This field is required.";
      }
    });

    // Validate category
    if (!selectedCategory) {
      formIsValid = false;
      fieldErrors["categories"] = "This field is required.";
    }

    // Additional validations based on selected category
    const categoryFields: { [key: string]: string[] } = {
      Food: ["Any dietary accommodation", "Pick-up option (Food)"],
      Artwork: ["Pick-up option (ACR)"],
      Craft: ["Pick-up option (ACR)"],
      Resell: ["Pick-up option (ACR)"],
      Service: ["Business hour", "Open to travel"],
    };

    // Helper function to validate necessaryDescription fields
    const validateNecessaryFields = (fields: string[]) => {
      fields.forEach((name) => {
        if (!necessaryDescription[name]?.trim()) {
          formIsValid = false;
          fieldErrors[name] = "This field is required.";
        }
      });
    };

    // Perform validations based on selected category
    if (selectedCategory) {
      const fieldsToValidate = categoryFields[selectedCategory];
      if (fieldsToValidate) {
        validateNecessaryFields(fieldsToValidate);
      }
    }

    if (!formIsValid) {
      setErrors(fieldErrors);
      return;
    }

    // Construct the business data object
    const businessData: Shops = {
      shopName,
      shopDescription,
      ownerName,
      contactInformation: {
        instagram,
      },
      userIdUsers: Number(localStorage.getItem("userID")),
      categories: [selectedCategory], // Adjusted to be an array of one category
      necessaryDescription,
      products
    };
    console.log("products!", businessData);

    try {
      const response = await createShop(JSON.stringify(businessData));
      console.log("response: ", response);
      if (response.status === 201) {
        // Handle success
        setSubmitted(true);
        setError(null);
        // Reset the form fields
        setShopName("");
        setShopDescription("");
        setOwnerName("");
        setInstagram("");
        setSelectedCategory("");
        setNecessaryDescription({});

        // Redirect to homepage
        setRedirect(true);
      } else {
        // Handle errors at server
        console.log(response.data);
        setError(response.data);
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
  const handleNecessaryDescriptionChange = (
    question: string,
    answer: string
  ) => {
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
      <form className={classes.form}>
        {/* Business Name Field */}
        <InputField
          label="Business Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        {errors["shopName"] && (
          <div className={classes.errorMessage}>{errors["shopName"]}</div>
        )}

        {/* Shop Description Field */}
        <InputField
          label="Shop Description"
          value={shopDescription}
          onChange={(e) => setShopDescription(e.target.value)}
        />
        {errors["shopDescription"] && (
          <div className={classes.errorMessage}>
            {errors["shopDescription"]}
          </div>
        )}

        {/* Owner Name Field */}
        <InputField
          label="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
        {errors["ownerName"] && (
          <div className={classes.errorMessage}>{errors["ownerName"]}</div>
        )}

        {/* Instagram Handle Field */}
        <InputField
          label="Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        {errors["instagram"] && (
          <div className={classes.errorMessage}>{errors["instagram"]}</div>
        )}

        {/* Category Selection */}
        <div className={classes.inputGroup}>
          <label className={classes.label}>Category</label>
          <select
            className={classes.select}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select an option</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          {errors["categories"] && (
            <div className={classes.errorMessage}>{errors["categories"]}</div>
          )}
        </div>

        {/* Additional Questions Based on Selected Category */}
        {selectedCategory === "Food" && (
          <>
            {/* Any dietary accommodation */}
            <InputField
              label="Any dietary accommodation"
              value={necessaryDescription["Any dietary accommodation"] || ""}
              onChange={(e) =>
                handleNecessaryDescriptionChange(
                  "Any dietary accommodation",
                  e.target.value
                )
              }
            />
            {errors["Any dietary accommodation"] && (
              <div className={classes.errorMessage}>
                {errors["Any dietary accommodation"]}
              </div>
            )}
            {/* Pick-up option: delivery on campus, pick at seller’s location */}
            <div className={classes.inputGroup}>
              <label className={classes.label}>Pick-up option</label>
              <select
                className={classes.select}
                value={necessaryDescription["Pick-up option (Food)"] || ""}
                onChange={(e) =>
                  handleNecessaryDescriptionChange(
                    "Pick-up option (Food)",
                    e.target.value
                  )
                }
              >
                <option value="">Select an option</option>
                <option value="delivery on campus">Delivery on campus</option>
                <option value="pick at seller’s location">
                  Pick at seller’s location
                </option>
              </select>
              {errors["Pick-up option (Food)"] && (
                <div className={classes.errorMessage}>
                  {errors["Pick-up option (Food)"]}
                </div>
              )}
            </div>
          </>
        )}

        {(selectedCategory === "Artwork" ||
          selectedCategory === "Craft" ||
          selectedCategory === "Resell") && (
            <>
              {/* Pick-up option: delivery on campus, pickup at seller’s location, digital */}
              <div className={classes.inputGroup}>
                <label className={classes.label}>Pick-up option</label>
                <select
                  className={classes.select}
                  value={necessaryDescription["Pick-up option (ACR)"] || ""}
                  onChange={(e) =>
                    handleNecessaryDescriptionChange(
                      "Pick-up option (ACR)",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select an option</option>
                  <option value="delivery on campus">Delivery on campus</option>
                  <option value="pickup at seller’s location">
                    Pickup at seller’s location
                  </option>
                  <option value="digital">Digital</option>
                </select>
                {errors["Pick-up option (ACR)"] && (
                  <div className={classes.errorMessage}>
                    {errors["Pick-up option (ACR)"]}
                  </div>
                )}
              </div>
            </>
          )}

        {selectedCategory === "Service" && (
          <>
            {/* Business hour */}
            <InputField
              label="Business hour"
              value={necessaryDescription["Business hour"] || ""}
              onChange={(e) =>
                handleNecessaryDescriptionChange(
                  "Business hour",
                  e.target.value
                )
              }
            />
            {errors["Business hour"] && (
              <div className={classes.errorMessage}>
                {errors["Business hour"]}
              </div>
            )}
            {/* Open to travel: yes, no, my business is online */}
            <div className={classes.inputGroup}>
              <label className={classes.label}>Open to travel</label>
              <select
                className={classes.select}
                value={necessaryDescription["Open to travel"] || ""}
                onChange={(e) =>
                  handleNecessaryDescriptionChange(
                    "Open to travel",
                    e.target.value
                  )
                }
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="my business is online">
                  My business is online
                </option>
              </select>
              {errors["Open to travel"] && (
                <div className={classes.errorMessage}>
                  {errors["Open to travel"]}
                </div>
              )}
            </div>
          </>
        )}

        {/*Upload image*/}
        <UploadHomepageIcon />

        <UploadBannerImage />

        <UploadProductImages productsCB={uploadImageCallback} />

        {/* Submit Button */}
        <Button className={classes.button} type="button" onClick={handleSubmit}>
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
