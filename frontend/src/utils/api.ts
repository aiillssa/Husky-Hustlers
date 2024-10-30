export const addUser = async (name: string, email: string): Promise<void> => {
    try {
        const response = await fetch('http://localhost:8088/users', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                key1: name, 
                key2: email 
            }),
        });

        const data = await response.json();
        console.log(data); // Check if the backend responds correctly
    } catch (error) {
        console.error('Error connecting to backend:', error);
    }
};

export{};