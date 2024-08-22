import {accountState} from "@/redux/stores/account/types/account";

export function createInitialAccountState(): accountState {
    return {
        id: null,
        name: "",
        email: "",
        token: ""
    };
}