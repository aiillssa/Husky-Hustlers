import React, { useState, useEffect } from "react";
import { getShop } from "../../utils/api";
import { useParams } from "react-router-dom";

function StorePage() {
  const { shopId } = useParams<{ shopId: string }>();

  const [contactInformation, setContactInformation] = useState<string | null>(null);
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
          setContactInformation(shop.contactInformation);
          setShopName(shop.shopName);
          setOwnerName(shop.ownerName);
          setCategories(shop.categories);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  });

  return (
    <>
      <div>Shop to display to users after clicking on card</div>
      <div>Shop Name: {shopName}</div>
      <div>Owner Name: {ownerName}</div>
    </>
  );
}

export default StorePage;
