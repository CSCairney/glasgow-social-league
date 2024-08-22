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