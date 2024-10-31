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

export const googleBackendLogin = async (code: string): Promise<void> => {
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
  } catch (error) {
    console.error("Login failed:", error);
   
  }
}

export {};
