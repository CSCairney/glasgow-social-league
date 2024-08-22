import { useSelector } from 'react-redux';
import {RootState} from "@/app/store";

export const useAuthToken = () => {
    return useSelector((state: RootState) => state.account.token);
};
