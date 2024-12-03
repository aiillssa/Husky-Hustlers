import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { memo } from "react";
import type { FC } from "react";
import resets from "../../components/_resets.module.css";
import classes from "./BusinessPage.module.css";
import DeleteButton from "../../components/BusinessPage/DeleteButton/DeleteButton"; // Import the DeleteButton component

interface Props {
  className?: string;
}

// Main functional component for the BusinessPage
export const BusinessPage: FC<Props> = memo(function BusinessPage(props = {}) {
  const [hasBusiness, setHasBusiness] = useState(false); // True will render the user's business page
  const [shopData, setShopData] = useState<any>(null);
  const [contactInformation, setContactInformation] = useState<string | null>(null); // Assuming a stringified value
  const [activeTab, setActiveTab] = useState<string>("Basics"); // State to track active tab

  useEffect(() => {
    const userIDString = localStorage.getItem("userID");
    if (userIDString) {
      const userID = Number(userIDString);
      // Fetch user data to check if they have a business
      fetch(`http://localhost:8088/shops/user/${userID}`)
        .then((response) => response.json())
        .then((data) => {
          setHasBusiness(data.hasShop);
          if (data.hasShop) {
            setShopData(data.shop);
            setContactInformation(JSON.stringify(data.shop.contactInformation)); // Simplified for now
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleBusinessDeletion = () => {
    setHasBusiness(false);
    setShopData(null);
  };

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
          <div className={classes.pageContainer}>
            {/* Header Section */}
            <div className={classes.header}>
              <div className={classes.profilePic}></div>
              <div className={classes.shopName}>{shopData?.shopName || "Unnamed Shop"}</div>
            </div>

            <DeleteButton
              idshops={shopData.idshops}
              onDelete={handleBusinessDeletion}
            />

            {/* Tabs Section */}
            <div className={classes.tabs}>
              <div
                className={`${classes.tab} ${activeTab === "Basics" ? classes.activeTab : ""}`}
                onClick={() => setActiveTab("Basics")}
              >
                Basics
              </div>
              <div
                className={`${classes.tab} ${activeTab === "Other" ? classes.activeTab : ""}`}
                onClick={() => setActiveTab("Other")}
              >
                Other
              </div>
              <div
                className={`${classes.tab} ${activeTab === "Pictures" ? classes.activeTab : ""}`}
                onClick={() => setActiveTab("Pictures")}
              >
                Pictures
              </div>
            </div>

            {/* Divider Line */}
            <div className={classes.divider}></div>

            {/* Content Section */}
            <div className={classes.content}>
              {activeTab === "Basics" && (
                <>
                <div className={classes.section}>
                  <div className={classes.sectionTitle}>Description:</div>
                  <div className={classes.sectionContent}>{shopData.shopDescription || "No description available."}</div>
                </div>
                <div className={classes.section}>
                  <div className={classes.sectionTitle}>Contact Info:</div>
                  <div className={classes.sectionContent}>
                    {contactInformation}
                  </div>
                </div>
              </>
              )}
              {activeTab === "Pictures" && (
                <div className={classes.picturesSection}>
                  <div className={classes.pictureRow}>
                    <div className={classes.pictureCard}>
                      <div className={classes.imagePlaceholder}></div>
                      <div className={classes.caption}>Caption</div>
                      <div className={classes.pricing}>Pricing</div>
                    </div>
                    <div className={classes.pictureCard}>
                      <div className={classes.imagePlaceholder}></div>
                      <div className={classes.caption}>Caption</div>
                      <div className={classes.pricing}>Pricing</div>
                    </div>
                    <div className={classes.pictureCard}>
                      <div className={classes.imagePlaceholder}></div>
                      <div className={classes.caption}>Caption</div>
                      <div className={classes.pricing}>Pricing</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default BusinessPage;
