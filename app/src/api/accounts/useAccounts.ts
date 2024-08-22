import {fetchWithAuth, fetchWithoutAuth} from "@/api/common/fetchWithAuth";
import {useAppSelector} from "@/app/store";


export const useAccounts = () => {
    const stateToken = useAppSelector(state => state.account.token);

    const getAllAccounts = async () => {
        return await fetchWithAuth('/accounts', {}, stateToken);
    };

    const getAccountById = async (id: string) => {
        return await fetchWithAuth(`/accounts/${id}`, {}, stateToken);
    };

    const createAccount = async (accountData: any) => {
        return await fetchWithAuth('/accounts', {
            method: 'POST',
            body: JSON.stringify(accountData),
        }, stateToken);
    };

    const updateAccount = async (id: string, accountData: any) => {
        return await fetchWithAuth(`/accounts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(accountData),
        }, stateToken);
    };

    const deleteAccount = async (id: string) => {
        return await fetchWithAuth(`/accounts/${id}`, {
            method: 'DELETE',
        }, stateToken);
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
