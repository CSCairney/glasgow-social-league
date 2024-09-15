export type Account = {
    id: string;
    name: string;
    email: string;
    password?: string;
    roleId: number;
    profilePicture?: string;
    createdAt: string;
    updatedAt: string;
    token?: string;
};
