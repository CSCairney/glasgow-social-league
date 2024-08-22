import {useAuthToken} from "@/api/common/useAuthToken";
import {fetchWithAuth, fetchWithoutAuth} from "@/api/common/fetchWithAuth";


export const useAccounts = () => {
    const token = useAuthToken();

    const getAllAccounts = async () => {
        return await fetchWithAuth('/accounts', {}, token);
    };

    const getAccountById = async (id: string) => {
        return await fetchWithAuth(`/accounts/${id}`, {}, token);
    };

    const createAccount = async (accountData: any) => {
        return await fetchWithAuth('/accounts', {
            method: 'POST',
            body: JSON.stringify(accountData),
        }, token);
    };

    const updateAccount = async (id: string, accountData: any) => {
        return await fetchWithAuth(`/accounts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(accountData),
        }, token);
    };

    const deleteAccount = async (id: string) => {
        return await fetchWithAuth(`/accounts/${id}`, {
            method: 'DELETE',
        }, token);
    };

    const login = async (email: string, password: string) => {
        return await fetchWithoutAuth('/accounts/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    };

    return {
        getAllAccounts,
        getAccountById,
        createAccount,
        updateAccount,
        deleteAccount,
        login,
    };
};
