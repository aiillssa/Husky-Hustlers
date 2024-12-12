import React, { useState, useEffect } from "react";
import { getShop } from "../../utils/api";
import { useParams } from "react-router-dom";
import classes from "./StorePage.module.css";
import ProductsGrid from "../../components/ProductsGridC/ProductsGrid";
import { checkImageExistence } from "./BusinessPage";

const DEBUG: boolean = false;

function StorePage() {
  const { shopId, userId } = useParams<{ shopId: string, userId: string }>(); /*Gets ShopID */
  const [contactInformation, setContactInformation] = useState<Map<string, string> | null>(null);
  const [shopName, setShopName] = useState<string>("");
  const [shopDescription, setShopDescription] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Basics"); // State to track active tab
  const [bannerURL, setBannerURL] = useState<string>("No banner image");
  const [necessaryDescription, setnecessaryDescription] = useState<Map<string, string> | null>(null); // Map to hold necessary description

  // Fetch shop data when shopId is available
  useEffect(() => {
    if (shopId) {
      const fetchData = async () => {
        try {
          const shop = await getShop(Number(shopId));
          const contactInfoMap = new Map();
          for (const [key, value] of Object.entries(shop.contactInformation)) {
            contactInfoMap.set(key, value);
          }
          setContactInformation(contactInfoMap);
          setShopName(shop.shopName);
          setShopDescription(shop.shopDescription);
          const necessaryDescript = new Map<string, string>(
            Object.entries(shop.necessaryDescription || {}).map(
              ([key, value]) => [key, String(value)] // Ensure value is cast to a string
            )
          );
          setnecessaryDescription(necessaryDescript);
          console.log(shop.userID)
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };

      const fetchBanner = async () => {
        if (DEBUG) console.log("inside fetchBanner")

        //const id = 'testID';
        const id = Number(localStorage.getItem("userID"));
        //const id = 'userIDtest';
        if (userId === undefined) {
          console.error("userID is undefined");
        }

        if (await checkImageExistence(Number(userId), "banner")) {
          const bannerURLtest = `http://localhost:8088/blob/${userId}/banner`;

          if (DEBUG) console.log(bannerURLtest);
          if (DEBUG) console.log(id);
          setBannerURL(bannerURLtest);

          if (DEBUG) console.log("banner URL", bannerURL)

        } else {
          setBannerURL("https://hustlers.blob.core.windows.net/images/defaultbanner.jpg");
        }

      };


      fetchData();
      fetchBanner();
    }
  }, [shopId]);

  return (
    <div className={classes.pageContainer}>

      {/* Header Section */}
      <div className={classes.businessNameContainer}>
        <h1 className={classes.shopName}>{shopName}</h1>
      </div>

      {/** BANNER */}
      <img  src={bannerURL} className="store-header-img" style={{ width: "100%", height: "200px", objectFit: "cover" }} />

      {/* Tabs Section */}
      <div className={classes.tabs}>
        <div
          className={`${classes.tab} ${activeTab === "Basics" ? classes.activeTab : ""}`}
          onClick={() => setActiveTab("Basics")}
        >
          Basics
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
              <div className={classes.sectionContent}>{shopDescription || "No description available."}</div>
            </div>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Contact Info:</div>
              <div className={classes.sectionContent}>
              {contactInformation && 
                Array.from(contactInformation.entries()).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))
              }
              </div>
            </div>

            <div className={classes.section}>
                  {necessaryDescription && Array.from(necessaryDescription.entries()).length > 0 ? (
                    Array.from(necessaryDescription.entries()).map(([key, value]) => (
                      <div key={key}>
                        <div className={classes.sectionTitle}>{key}:</div>
                        <div className={classes.sectionContent}>{value}</div>
                      </div>
                    ))
                  ) : (
                    "No Description Available"
                  )}
                </div>
              </>
        )}
        {activeTab === "Pictures" && (
          <div>
            <ProductsGrid userId={userId} />
          </div>

        )}
      </div>
    </div>
  );
}

export default StorePage;
