import { fetchWithAuth } from "@/api/common/fetchWithAuth";
import { useAppSelector } from "@/app/store";

export const useSports = () => {
    const stateToken = useAppSelector(state => state.account.token);

    const getAllSports = async () => {
        return await fetchWithAuth('/sports', {}, stateToken);
    };

    const getSportById = async (id: string) => {
        return await fetchWithAuth(`/sports/${id}`, {}, stateToken);
    };

    const createSport = async (sportData: any) => {
        return await fetchWithAuth('/sports', {
            method: 'POST',
            body: JSON.stringify(sportData),
        }, stateToken);
    };

    const updateSport = async (id: string, sportData: any) => {
        return await fetchWithAuth(`/sports/${id}`, {
            method: 'PUT',
            body: JSON.stringify(sportData),
        }, stateToken);
    };

    const deleteSport = async (id: string) => {
        return await fetchWithAuth(`/sports/${id}`, {
            method: 'DELETE',
        }, stateToken);
    };

    return {
        getAllSports,
        getSportById,
        createSport,
        updateSport,
        deleteSport,
    };
};
