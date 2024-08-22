import { fetchWithAuth, fetchWithoutAuth } from "@/api/common/fetchWithAuth";
import { useAppSelector } from "@/app/store";
import { Account } from "@/types/account";

export const useAccounts = () => {
    const stateToken = useAppSelector(state => state.account.token);

    const getAllAccounts = async (): Promise<Account[]> => {
        return await fetchWithAuth('/accounts', {}, stateToken);
    };

    const getAccountById = async (id: string): Promise<Account> => {
        return await fetchWithAuth(`/accounts/${id}`, {}, stateToken);
    };

    const createAccount = async (accountData: Omit<Account, 'id'>): Promise<Account> => {
        return await fetchWithAuth('/accounts', {
            method: 'POST',
            body: JSON.stringify(accountData),
        }, stateToken);
    };

    const updateAccount = async (id: string, accountData: Partial<Account>): Promise<Account> => {
        return await fetchWithAuth(`/accounts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(accountData),
        }, stateToken);
    };

    const deleteAccount = async (id: string): Promise<void> => {
        await fetchWithAuth(`/accounts/${id}`, {
            method: 'DELETE',
        }, stateToken);
    };

    const login = async (email: string, password: string): Promise<{ token: string, email: string, id: number, name: string }> => {
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
