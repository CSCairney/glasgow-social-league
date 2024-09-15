import {Account} from "@/types/account";

export const retrieveAccountName = async (id: string, accounts: Account[]) => {
    const account = accounts.find(
        (account: Account) => account.id === id
    );

    return account?.name;
}

export const accountNameFromId: { [key: string]: string } = {
    '15d8150f-3ad2-43a5-898c-79fbf61310ea': 'Charlie',
    '1bf4c70b-7bad-43a6-bd12-5826fb549d4c': 'Michael',
    '4ef28666-8e2d-4622-9e3d-bdc061fdbc2e': 'Euan',
    '6c4d8bdd-af74-4671-954a-2f9494e34684': 'Ross',
    'c120a3c7-184a-4cce-9010-7dfac94d6d6a': 'Hamish',
    'd2f1f7be-bc04-49b8-8c2d-38a53bd6fc01': 'Tyeson',
    'da57c36b-4a5e-41a7-96a5-a40d155ee17b': 'James',
    'efd63004-0940-4b66-8255-0c08d36c34e2': 'Kieran'
};