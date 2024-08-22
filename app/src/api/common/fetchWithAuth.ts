export const fetchWithAuth = async (url: string, options: RequestInit = {}, token: string) => {
    try {
        const response = await fetch(`http://localhost:8080${url}`, {
            ...options,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized access
                console.error('Unauthorized access - handle accordingly');
                // Optionally, you might want to redirect to login or clear session storage here
            } else if (response.status === 403) {
                // Handle forbidden access
                console.error('Forbidden access - insufficient permissions');
            } else {
                console.error(`Unexpected error with status: ${response.status}`);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Fetch failed for ${url}:`, error);
        throw error; // Re-throw the error after logging it
    }
};

export const fetchWithoutAuth = async (url: string, options: RequestInit = {}) => {
    try {
        const response = await fetch(`http://localhost:8080${url}`, {
            ...options,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            console.error(`Unexpected error with status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Fetch failed for ${url}:`, error);
        throw error;
    }
};
