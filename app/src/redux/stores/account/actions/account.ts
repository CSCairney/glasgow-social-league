import {ActionWithThunk} from "@/redux/types/store";
import {accountState} from "@/redux/stores/account/types/account";
import {createAccountSettings} from "@/redux/localStorage/helpers/accountMerge";
import {setAccountState} from "@/redux/stores/account";

export const getPersistedAccountDetails = (): ActionWithThunk => {
    const accountDetails: accountState = createAccountSettings();
    return (dispatch) => {
        dispatch(setAccountState(accountDetails));
    };
};