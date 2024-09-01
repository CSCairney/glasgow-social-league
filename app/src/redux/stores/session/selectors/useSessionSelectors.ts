import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Account } from "@/types/account";

export const useSessionSelectors = () => {
    const selectAccountNameById = (id: string | null): string | undefined => {
        return useSelector((state: RootState) => {
            if (id === null) {
                return undefined;
            }

            const account = state.session.availableAccounts.find(
                (account: Account) => account.id === id
            );

            return account ? account.name : undefined;
        });
    };

    return {
        selectAccountNameById,
    };
};
