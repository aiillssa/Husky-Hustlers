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

export {};
