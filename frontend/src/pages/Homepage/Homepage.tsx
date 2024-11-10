import React, { Component } from "react";
import type { FC } from "react";

import resets from "../../components/_resets.module.css";
import classes from "./Homepage.module.css";
import { Rectangle1Default } from "../../components/HomePageC/Rectangle1Default/Rectangle1Default";
import { SearchBar } from "../../components/HomePageC/SearchBar/SearchBar";

// Define the type for a single seller's data
type SellerData = {
  ownerName: string;
  businessName: string;
  keyword: string;
  type: "food" | "artwork" | "service" | "craft" | "resell";
};

// Create an array of 10 mock sellers
const mockSellers: SellerData[] = [
  {
    ownerName: "Alice Johnson",
    businessName: "Alice’s Artistry",
    keyword: "Handmade paintings",
    type: "artwork",
  },
  {
    ownerName: "Bob Smith",
    businessName: "Bob’s Burgers",
    keyword: "Delicious burgers",
    type: "food",
  },
  {
    ownerName: "Carol White",
    businessName: "Carol’s Crafts",
    keyword: "Knitted scarves",
    type: "craft",
  },
  {
    ownerName: "Dave Brown",
    businessName: "Dave’s Delivery",
    keyword: "Fast delivery service",
    type: "service",
  },
  {
    ownerName: "Eve Davis",
    businessName: "Eve’s Emporium",
    keyword: "Vintage reselling",
    type: "resell",
  },
  {
    ownerName: "Frank Green",
    businessName: "Frank’s Food Truck",
    keyword: "Gourmet street food",
    type: "food",
  },
  {
    ownerName: "Grace Lee",
    businessName: "Grace’s Gallery",
    keyword: "Modern art pieces",
    type: "artwork",
  },
  {
    ownerName: "Henry Miller",
    businessName: "Henry’s Handiwork",
    keyword: "Custom woodworking",
    type: "craft",
  },
  {
    ownerName: "Isabella Wilson",
    businessName: "Isabella’s IT Services",
    keyword: "Tech support and services",
    type: "service",
  },
  {
    ownerName: "Jack Taylor",
    businessName: "Jack’s Junk Shop",
    keyword: "Antique reselling",
    type: "resell",
  },
];

type HomepageState = {
  listOfSellers: SellerData[];
  selectedType: "food" | "artwork" | "service" | "craft" | "resell" | "all";
};

export class Homepage extends Component<{}, HomepageState> {
  constructor(props: {}) {
    super(props);
    this.state = { listOfSellers: mockSellers, selectedType: "all" };
  }

  handleTypeClick = (
    type: "food" | "artwork" | "service" | "craft" | "resell" | "all"
  ) => {
    this.setState({ selectedType: type });
  };

  render() {
    const { listOfSellers, selectedType } = this.state;

    // Filter the sellers based on the selected type
    const filteredSellers =
      selectedType === "all"
        ? listOfSellers
        : listOfSellers.filter((seller) => seller.type === selectedType);

    return (
      <div className={classes.root}>
        <SearchBar className={classes.searchBar} />
        <div className={classes.type}>
          {/* 'All' button to reset the filter */}
          <div
            className={classes.allButton}
            onClick={() => this.handleTypeClick("all")}
            style={{ cursor: "pointer" }}
          >
            Show All
          </div>
          {/* Type buttons */}
          <Rectangle1Default
            type="food"
            onClick={() => this.handleTypeClick("food")}
            selected={selectedType === "food"}
          />
          <Rectangle1Default
            type="artwork"
            onClick={() => this.handleTypeClick("artwork")}
            selected={selectedType === "artwork"}
          />
          <Rectangle1Default
            type="service"
            onClick={() => this.handleTypeClick("service")}
            selected={selectedType === "service"}
          />
          <Rectangle1Default
            type="craft"
            onClick={() => this.handleTypeClick("craft")}
            selected={selectedType === "craft"}
          />
          <Rectangle1Default
            type="resell"
            onClick={() => this.handleTypeClick("resell")}
            selected={selectedType === "resell"}
          />
        </div>
        <div className={classes.cardGrid}>
          {filteredSellers.map((seller, index) => (
            <div key={index} className={classes.card}>
              <div className={classes.cardHeading}>
                <div className={classes.name}>{seller.ownerName}</div>
                <div className={classes.businessName}>
                  {seller.businessName}
                </div>
              </div>
              <div className={classes.keywordDescription}>
                <div className={classes.textBlock}>{seller.keyword}</div>
              </div>
              <Rectangle1Default type={seller.type} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
