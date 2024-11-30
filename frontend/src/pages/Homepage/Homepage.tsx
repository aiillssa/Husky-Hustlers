import React, { Component } from "react";
import classes from "./Homepage.module.css";
import { CategoryButton } from "../../components/HomePageC/CategoryButton/CategoryButton";
import { SearchBar } from "../../components/HomePageC/SearchBar/SearchBar";
import { getShops } from "../../utils/api";
import { Link } from "react-router-dom";

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

  async fetchData(type: string) {
    try {
      const shops = await getShops(type);
      console.log(`Shops received from getShops: ${shops}`);
      const sellers = shops.map((shop: SellerData) => {
        const types = shop.categories.map((category) =>
          category.categoryName.toLowerCase()
        ) as ("food" | "artwork" | "service" | "craft" | "resell")[];
        const placeholderImage = "test";
        const image = shop.image || placeholderImage;
        return { ...shop, types };
      });
      this.setState({ listOfSellers: sellers });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
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
            style={{
              cursor: "pointer",
              fontWeight: this.state.selectedType === "all" ? 1000 : "normal",
            }}
          >
            Show All
          </div>

          {/* Categories */}
          <CategoryButton
            type="food"
            onClick={() => this.handleTypeClick("food")}
            selected={selectedType === "food"}
          />
          <CategoryButton
            type="artwork"
            onClick={() => this.handleTypeClick("artwork")}
            selected={selectedType === "artwork"}
          />
          <CategoryButton
            type="service"
            onClick={() => this.handleTypeClick("service")}
            selected={selectedType === "service"}
          />
          <CategoryButton
            type="craft"
            onClick={() => this.handleTypeClick("craft")}
            selected={selectedType === "craft"}
          />
          <CategoryButton
            type="resell"
            onClick={() => this.handleTypeClick("resell")}
            selected={selectedType === "resell"}
          />
        </div>
        <div className={classes.cardGrid}>
          {filteredSellers.map((seller, index) => (
            <Link
            key={index}
            to={`/pages/StorePage/${seller.idshops}`}
            className={classes.cardLink}
          >
              <div className={classes.card}>
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
                <CategoryButton type={seller.types[0]} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
