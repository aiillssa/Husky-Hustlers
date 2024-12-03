import axios from '../utils/axios';


// Logs the user in to their account through google
export const googleLogIn = async (
  code: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Send code to the backend to get appJwt
    const response = await axios.post("/google/signIn", {
      code,
    });

    const { auth, token, id, email, name, message } = response.data;
    console.log("Auth:", auth);
    console.log("Token:", token);
    console.log("User's id:", id);
    console.log("User's email: ", email);
    console.log("User's name: ", name);
    localStorage.setItem('userID', id);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name)
    localStorage.setItem('authToken', token);
    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
};

export const googleSignUp = async (
  code: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Send code to the backend to get appJwt
    const response = await axios.post("/google/signUp", {});
    return { success: true };
    
  }catch (error) {
    console.error("Signup failed:", error);
    return { success: false, error: "Sign up failed. Please try again." };
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
    const response = await axios.post("/shops", {
      shopName,
      shopDescription,
      ownerName,
      contactInformation,
      userIdUsers,
      categories: [categories],
    });

    console.log("Shop created successfully:", response.data);
  } catch (error: any) {
    console.error(
      "Failed to create shop:",
      error.response ? error.response.data : error.message
    );
  }
};

export const getShops = async (type: string): Promise<any> => {
  

  try {
    // Send GET request to /shops endpoint
    let url = "/shops";
    if (type !== "all") {
      url += `/categories/${type}`;
    }
    
    const response = await axios.get(url);

    
    
    // Extract shops array from the response
    const shops = response.data.shops;

    console.log("Shops:", shops);
    return shops;
  } catch (error: any) {
    console.error(
      `Failed to get shops: ${
        error.response ? error.response.data : error.message
      }`
    );
    console.error("Failed to fetch shops:", error);
  }
};

export const getShop = async (shopId: number): Promise<any> => {
  try {
    const response = await axios.get(`shops/${shopId}`);
    const shopInfo = response.data.shop;

    console.log(`Shop info: ${shopInfo}`);
    return shopInfo;
  } catch (error: any) {
    console.error(
      `Failed to get shops: ${
        error.response ? error.response.data : error.message
      }`
    );
    console.error("Failed to fetch shops:", error);
  }
};

export const logOut = async (): Promise<void> => {
  try {
    const response = await axios.post(`/google/logOut`);
  } catch (error: any){
    console.log("Error in signing out: ", error);
  }
}
export {};
