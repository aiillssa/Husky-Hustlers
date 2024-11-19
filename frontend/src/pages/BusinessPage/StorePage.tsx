import React, { useState } from "react";
import { getShop } from "../../utils/api";

function StorePage() {
  const [contactInformation, setContactInformation] = useState({});
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchData = async (idshops: number) => {
    try {
      const shop = await getShop(idshops);
      console.log(`Shop received from getShop: ${shop}`);
      setContactInformation(JSON.parse(shop.contactInformation));
      setShopName(shop.shopName);
      setOwnerName(shop.ownerName);
      setCategories(shop.categories);
    } catch (err) {
      console.error("Error fetching data:", err);
      return;
    }
  };
  return <div>Shop to display to users after clicking on card</div>;
}

export default StorePage;
