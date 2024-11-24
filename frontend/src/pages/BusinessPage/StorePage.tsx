import React, { useState, useEffect } from "react";
import { getShop } from "../../utils/api";
import { useParams } from "react-router-dom";
import classes from "./StorePage.module.css";

function StorePage() {
  const { shopId } = useParams<{ shopId: string }>(); /*Gets ShopID */
  const [contactInformation, setContactInformation] = useState<Map<string, string> | null>(null);
  const [shopName, setShopName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [shopDescription, setShopDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

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
          console.log(contactInfoMap);
          setContactInformation(contactInfoMap);
          setShopName(shop.shopName);
          setOwnerName(shop.ownerName);
          setShopDescription(shop.shopDescription);
          setCategories(shop.categories);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [shopId]);

  return (
    <div className={classes.pageContainer}>
      {/* Header Section */}
      <div className={classes.header}>
        <div className={classes.profilePic}></div>
        <div className={classes.shopName}>{shopName}</div>
      </div>

      {/* Tabs Section */}
      <div className={classes.tabs}>
        <div className={classes.tab}>Basics</div>
        <div className={classes.tab}>Other</div>
        <div className={classes.tab}>Pictures</div>
      </div>

      {/* Divider Line */}
      <div className={classes.divider}></div>

      {/* Content Section */}
      <div className={classes.content}>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>Description:</div>
          <div className={classes.sectionContent}>{shopDescription}</div>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>Contact Info:</div>
          <div className={classes.sectionContent}>
            {contactInformation}
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>Dietary Accommodation:</div>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>Delivery Option:</div>
        </div>
      </div>
    </div>
  );
}

export default StorePage;