export const fetchWithAuth = async (url: string, options: RequestInit = {}, token: string) => {
    const response = await fetch(`http://localhost:8080${url}`, {
        ...options,
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
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const fetchWithoutAuth = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`http://localhost:8080${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        // You can add specific handling for different HTTP status codes if needed
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};
