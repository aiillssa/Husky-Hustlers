import React, { useState, useEffect } from "react";
import { getShop } from "../../utils/api";
import { useParams } from "react-router-dom";

function StorePage() {
  const { shopId } = useParams<{ shopId: string }>();

  const [contactInformation, setContactInformation] = useState<Map<
    string,
    string
  > | null>(null);
  const [shopName, setShopName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch shop data when shopId is available
  useEffect(() => {
    if (shopId) {
      const fetchData = async () => {
        try {
          const shop = await getShop(Number(shopId));
          console.log(`Shop received from getShop: ${shop}`);
          const contactInfoMap = new Map();
          for (const [key, value] of Object.entries(shop.contactInformation)) {
            contactInfoMap.set(key, value);
          }
          console.log(contactInfoMap);
          setContactInformation(contactInfoMap);
          setShopName(shop.shopName);
          setOwnerName(shop.ownerName);
          setCategories(shop.categories);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <>
      <div>Shop to display to users after clicking on card</div>
      <div>Shop Name: {shopName}</div>
      <div>Owner Name: {ownerName}</div>
      <div>Contact Information: {contactInformation}</div>
    </>
  );
}

export default StorePage;
