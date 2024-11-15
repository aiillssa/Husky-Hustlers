import React, { Component } from "react";
import type { FC } from "react";

import resets from "../../components/_resets.module.css";
import classes from "./Homepage.module.css";
import { Rectangle1Default } from "../../components/HomePageC/Rectangle1Default/Rectangle1Default";
import { SearchBar } from "../../components/HomePageC/SearchBar/SearchBar";

// Format for contact informatoin
interface ContactInformation {
  instagram?: string;
  email?: string;
  phone?: string;
  // Add other contact fields as needed
}

// Categories format passed in from server
interface Category {
  categoryName: "Food" | "Artwork" | "Service" | "Craft" | "Resell";
}

// Define the type for a single seller's data
type SellerData = {
  types: any;
  idshops: number;
  shopName: string;
  shopDescription: string;
  ownerName: string;
  contactInformation: ContactInformation;
  categories: Category[];
  image?: string;
};

// Define the state type for the Homepage component
type HomepageState = {
  listOfSellers: SellerData[];
  selectedType: "food" | "artwork" | "service" | "craft" | "resell" | "all";
  searchTerm: string;
};

export class Homepage extends Component<{}, HomepageState> {
  constructor(props: {}) {
    super(props);
    this.state = { listOfSellers: [], selectedType: "all", searchTerm: "" };
  }

  componentDidMount() {
    this.fetchData("all");
  }

  fetchData(type: string) {
    let url = "http://localhost:8088/shops";
    if (type !== "all") {
      url += `/${type}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: any) => {
        const sellers = data.shops.map((shop: SellerData) => {
          // Map categories to types array for each shop
          // add types array to each shop in sellers
          // and types is an array containing
          // only these specific string literals.
          const types = shop.categories.map((category) =>
            category.categoryName.toLowerCase()
          ) as ("food" | "artwork" | "service" | "craft" | "resell")[];

          // Add place holder image
          const placeholderImage = 'test';
          const image = shop.image || placeholderImage;

          return { ...shop, types };
        });

        this.setState({ listOfSellers: sellers });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // add click behavior for each type on homepage
  handleTypeClick = (
    type: "food" | "artwork" | "service" | "craft" | "resell" | "all"
  ) => {
    this.setState({ selectedType: type }, () => {
      this.fetchData(type);
    });
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    // modify filteredSellers arrays to only include shops that have selectedType
    // display filteredSellers on homepage only
    const { listOfSellers, selectedType, searchTerm } = this.state;

    const filteredSellers = listOfSellers.filter((seller) => {
      const matchesType =
        selectedType === "all" || seller.types.includes(selectedType);

      const matchesSearch = seller.shopName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesType && matchesSearch;
    });

    return (
      <div className={classes.root}>
        <SearchBar
          className={classes.searchBar}
          onSearchChange={this.handleSearchChange}
          value={this.state.searchTerm}
        />

        <div className={classes.type}>
          {/* 'All' button to reset the filter */}
          <div
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
              <img
              src={seller.image}
              alt={`${seller.shopName} image`}
              className={classes.shopImage}
              />
              <div className={classes.cardHeading}>
                <div className={classes.name}>{seller.ownerName}</div>
                <div className={classes.businessName}>{seller.shopName}</div>
              </div>
              <div className={classes.description}>
                  {seller.shopDescription}
              </div>
              <Rectangle1Default type={seller.types[0]} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
