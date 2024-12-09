import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { memo } from "react";
import type { FC } from "react";
import classes from "./BusinessPage.module.css";
import DeleteButton from "../../components/BusinessPage/DeleteButton/DeleteButton";
import EditButton from "../../components/BusinessPage/EditButton/EditButton";
import { getShopWithUserID, updateShop } from "../../utils/api";
import { setMaxIdleHTTPParsers } from "http";
import axios from "axios";
import ProductsGrid from "../../components/ProductsGridC/ProductsGrid";

const DEBUG: boolean = false;

interface Props {
  className?: string;
}


//Method takes in a userID and imgSource. checks if a certain image exists with a specific user. 
//Returns true if it does, false otherwise. 
export const checkImageExistence = async (userID: number, imgSource: String, productId?: String) => {
  const res = await axios.get('http://localhost:8088/blob/');
  if (DEBUG) console.log("blob list:", res.data.blobs);
  const blobNames = (res.data.blobs);  // Assuming 'this' context is correct here
  for (const str of blobNames) {
    const [id, source] = str.split('-');

    if (DEBUG) console.log("id: ", id);
    if (DEBUG) console.log("source: ", source);
    if (DEBUG) console.log("return: ", id === userID.toString() && source === imgSource);

    if (id === userID.toString() && imgSource === source) {
      return true
    }
  }
  return false
}



// Main functional component for the BusinessPage
export const BusinessPage: FC<Props> = memo(function BusinessPage(props = {}) {
  const [hasBusiness, setHasBusiness] = useState(false); // True will render the user's business page
  const [shopData, setShopData] = useState<any>(null);
  const [shopDescription, setShopDescription] = useState<string>();
  const [contactInformation, setContactInformation] = useState<Map<string, string> | null>(null); // Map to hold contact info
  const [activeTab, setActiveTab] = useState<string>("Basics"); // State to track active tab
  const [message, setMessage] = useState<string>("You do not have a shop right now. Click add your business button to add your business.");
  const [bannerURL, setBannerURL] = useState<string>("No banner image");

  const userIDString = localStorage.getItem("userID")

  useEffect(() => {
    console.log("Business page called")
    const fetchShop = async () => {
      //const userIDString = localStorage.getItem("userID"); // redundant with line 64. Can we factor this out?????
      if (userIDString) {
        const userID = Number(userIDString);
        console.log("userID", userID);
        // Fetch user data to check if they have a business
        try {
          const res = await getShopWithUserID(userID);
          console.log("fetched data", res);
          if (res.hasShop) {
            setHasBusiness(true);
            setMessage("Successfully fetched your business data");
            setShopData(res.shop);
            const contactInfoMap = new Map<string, string>(
              Object.entries(res.shop.contactInformation || {}).map(
                ([key, value]) => [key, String(value)] // Ensure value is cast to a string
              )
            );
            setContactInformation(contactInfoMap);
          }
        } catch (error: any) {
          // Check if error is a 404 (no shop found)
          if (error.response && error.response.status === 404) {
            // User does not have a business
            setHasBusiness(false);
            setMessage("You do not have a shop right now. Click add your business button to add your business.");
          } else {
            // Other errors
            setHasBusiness(false);
            setMessage("Cannot fetch your business data.");
            console.error("Error fetching user data:", error);
          }
        }
      }
    };

    const fetchBanner = async () => {
      if (DEBUG) console.log("inside fetchBanner")
      const id = Number(localStorage.getItem("userID"));
      //if user has banner image, we retrieve it. Otherwise, we have a default one
      if (await checkImageExistence(id, "banner")) {
        const bannerURLtest = `http://localhost:8088/blob/${id}/banner`;

        if (DEBUG) console.log(bannerURLtest);
        if (DEBUG) console.log(id);
        setBannerURL(bannerURLtest);

        if (DEBUG) console.log("banner URL", bannerURL)

      } else {
        setBannerURL("https://hustlers.blob.core.windows.net/images/defaultbanner.jpg")
      }
    };

    fetchShop();
    fetchBanner();
  }, []);

  const handleBusinessDeletion = () => {
    setHasBusiness(false);
    setShopData(null);
    setContactInformation(null);
    setMessage("Your business has been deleted. Add a business again!");
  };

  interface ContactInformation {
    instagram: string;
  }

  interface Shops {
    shopName: string;
    shopDescription: string;
    ownerName: string;
    contactInformation: ContactInformation;
    userIdUsers: number;
    categories: string[];
    necessaryDescription?: Record<string, string>;
  }




  return (
    <div className={classes.root}>
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
            <div>
              <h2> {message}</h2>
            </div>
          </div>
        ) : (
          <div className={classes.pageContainer}>


            {/* Header Section */}
            <div className={classes.header}>
              <div className={classes.shopName}>
                {shopData?.shopName || "Unnamed Shop"}
              </div>
            </div>

            {/** BANNER */}
            <img src={bannerURL} style={{ width: "100%", height: "200px", objectFit: "cover" }} />

            <div className={classes.actionButtons}>
                <EditButton
                  idshops={shopData?.idshops || 0}
                  description={shopData?.shopDescription || ""}
                  contactInfo={contactInformation || new Map()} // Ensure it's a Map, even if empty
                  onEdit={(updatedDescription, updatedContactInfo) => {
                    setShopData({
                      ...shopData,
                      shopDescription: updatedDescription,
                    });
                    setContactInformation(updatedContactInfo);
                    setHasBusiness(true);
                  }}
                  onSave={() => {
                    setShopDescription("hello world");
                  }}
                />

              <DeleteButton
                  idshops={shopData?.idshops || 0}
                  iduser={Number(userIDString)}
                  onDelete={handleBusinessDeletion}
              />
                
              </div>

              

            {/* Tabs Section */}
            <div className={classes.tabs}>
              <div
                className={`${classes.tab} ${activeTab === "Basics" ? classes.activeTab : ""
                  }`}
                onClick={() => setActiveTab("Basics")}
              >
                Basics
              </div>
              <div

                className={`${classes.tab} ${activeTab === "Pictures" ? classes.activeTab : ""
                  }`}
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
                    <div className={classes.sectionContent}>
                      {shopData?.shopDescription || "No description available."}
                    </div>
                  </div>
                  <div className={classes.section}>
                    <div className={classes.sectionTitle}>Contact Info:</div>
                    <div className={classes.sectionContent}>
                      {contactInformation
                        ? Array.from(contactInformation.entries()).map(
                          ([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong> {value}
                            </div>
                          )
                        )
                        : "No contact information available."}
                    </div>
                  </div>
                </>
              )}
              {activeTab === "Pictures" && (
                <div className={classes.picturesSection}>
                  <ProductsGrid userId={String(localStorage.getItem("userID"))} />
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
