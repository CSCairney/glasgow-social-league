import {Account} from "@/types/account";

export const retrieveAccountName = async (id: string, accounts: Account[]) => {
    const account = accounts.find(
        (account: Account) => account.id === id
    );

    return account?.name;
}