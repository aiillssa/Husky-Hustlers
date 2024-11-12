import axios from "axios";
export const addUser = async (name: string, email: string): Promise<void> => {
  try {
    const urlencodedBody = new URLSearchParams();
    urlencodedBody.append("name", name);
    urlencodedBody.append("email", email);
    console.log(name, email);
    const response = await fetch("http://localhost:8088/users", {
      //   mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email }),
    });

    const data = await response.json();
    console.log(`This is the data: ${data}`); // Check if the backend responds correctly
  } catch (error) {
    console.error("Error connecting to backend:", error);
  }
};

// Logs the user in to their account through google
export const googleBackendLogin = async (code: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Send code to the backend to get appJwt
    const response = await axios.post("http://localhost:8088/google", {
      code,
    });
    const { appJwt, name, email, user_id } = response.data;

    // Save JWT in local storage
    localStorage.setItem("appJwt", appJwt);
    console.log("User's ID:", user_id);
    console.log("User's name:", name);
    console.log("User's email:", email);
    console.log("jwt: ", appJwt);
    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error: "Login failed. Please try again." };
   
  }
}

// List of all current shops
export const getAllShops = async (): Promise<void> => {
  try {
    // Send GET request to /shops endpoint
    const response = await axios.get("http://localhost:8088/shops");

    // Extract shops array from the response
    const shops = response.data;

    console.log("Shops:", shops);
  } catch (error) {
    console.error("Failed to fetch shops:", error);
  }
};

export const createShop = async (
  shopName: string,
  shopDescription: string,
  ownerName: string,
  contactInformation: string,
  userIdUsers: string,
  categories: string
): Promise<void> => {
  try {
    const response = await axios.post("http://localhost:8088/shops", {
      shopName,
      shopDescription,
      ownerName,
      contactInformation,
      userIdUsers, 
      categories: [categories],
    });

    console.log("Shop created successfully:", response.data);
  } catch (error: any) {
    console.error("Failed to create shop:", error.response ? error.response.data : error.message);
  }
};





export {};
