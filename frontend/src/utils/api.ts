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


    const { token, id, email, name, picture } = response.data;
    // Save JWT in local storage
    localStorage.setItem("authToken", token);
    console.log("User's ID:", id);
    localStorage.setItem("userID", id);
    console.log("User's name:", name);
    console.log("User's email:", email);
    console.log("jwt: ", token);
    console.log("Google profile picture url: ", picture);

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
    const response = await axios.post("/google/signUp", { code });
    return { success: true };

  } catch (error) {
    console.error("Signup failed:", error);
    return { success: false, error: "Sign up failed. Please try again." };
  }
};

interface ShopResponse {
  status: number;
  data: any;
}

export const createShop = async (businessData: string): Promise<ShopResponse> => {
  try {
    const response = await axios.post("/shops", businessData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Shop created successfully:", response.data);
    return { status: response.status, data: response.data };
  } catch (error: any) {
    console.error(
      "Failed to create shop:",
      error.response ? error.response.data : error.message
    );
    const e = error.response;
    if (e) {
      return { status: e.status, data: JSON.stringify(e.data.error) };
    } else {
      return { status: 500, data: { error: "A network error occurred." } };
    }
  }
};

export const updateShop = async (updatedDescription: string, updatedContactInfo: Map<string, string>, shopID: number): Promise<ShopResponse> => {
  try {
    const info = { instagram: updatedContactInfo.get("instagram") }
    console.log("Shop description: ", updatedDescription);
    console.log("Shop info: ", info);

    //const response  = fetch(`http://localhost:8088/shops/${shopID}`, {method: "PATCH"})
    const response = await axios.patch(`/shops/${shopID}`, {
      shopDescription: updatedDescription,
      contactInformation: info
    });
    console.log("Shop edited successfully:", response.data);
    return { status: response.status, data: response.data };
  } catch (error: any) {
    console.error(
      "Failed to edit shop:",
      error.response ? error.response.data : error.message
    );
    const e = error.response;
    if (e) {
      return { status: e.status, data: JSON.stringify(e.data.error) };
    } else {
      return { status: 500, data: { error: "A network error occurred." } };
    }
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
      `Failed to get shops: ${error.response ? error.response.data : error.message
      }`
    );
    console.error("Failed to fetch shops:", error);
  }
};

// get shop information using shopID 
export const getShop = async (shopId: number): Promise<any> => {
  try {
    const response = await axios.get(`shops/${shopId}`);
    const shopInfo = response.data.shop;

    console.log(`Shop info: ${shopInfo}`);
    return shopInfo;
  } catch (error: any) {
    console.error(
      `Failed to get shops: ${error.response ? error.response.data : error.message
      }`
    );
    console.error("Failed to fetch shops:", error);
  }
};

// get shop infromation using userID
export const getShopWithUserID = async (userID: number): Promise<any> => {
  try {
    const response = await axios.get(`shops/user/${userID}`);
    const shopInfo = response.data;
    return shopInfo;
  } catch (error: any) {
    console.error(
      `Failed to get shops: ${error.response ? error.response.data : error.message
      }`
    );
    console.error("Failed to fetch shops:", error);
    return error;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    const response = await axios.post(`/google/logOut`);
  } catch (error: any) {
    console.log("Error in signing out: ", error);
  }
}

export const deleteShop = async (idshops: number): Promise<any> => {
  try {
    const response = await axios.delete(`/shops/${idshops}`);
    console.log(response.data)
    return response;
  } catch (error: any) {
    // network issues or unexpected errors
    console.error("Failed to delete shops:", error);
    return undefined;
  }
};

export const deleteShopImages = async (userID: number): Promise<any> => {
  try {
    const response = await axios.delete(`/blob/${userID}`);
    console.log(response.data);
    return response;
  } catch (error: any) {
    console.error("failed to delete shop images: ", error);
    return undefined
  }
}


export { };
