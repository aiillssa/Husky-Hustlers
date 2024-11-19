import React, { useState } from "react";
import { getShop } from "../../utils/api";

function StorePage(props: { idshops: number }) {
  const [contactInformation, setContactInformation] = useState(null);
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const shop = await getShop(props.idshops);
      console.log(`Shop received from getShop: ${shop}`);
      setContactInformation(shop.contactInformation);
      setShopName(shop.shopName);
      setOwnerName(shop.ownerName);
      setCategories(shop.categories);
    } catch (err) {
      console.error("Error fetching data:", err);
      return;
    }
  };
  fetchData();
  return (
    <>
      <div>Shop to display to users after clicking on card</div>;
      <div>ContactInformation: {contactInformation}</div>
    </>
  );
}

export default StorePage;
