export type Account = {
    id: string;  // UUID for the account
    name: string;
    email: string;
    password?: string;  // Password is optional since it might not always be needed in the frontend context
    roleId: number;
    profilePicture?: string;  // Optional, can be null or undefined
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
    token?: string;  // JWT token, optional
};
