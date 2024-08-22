import { sportState } from "@/redux/stores/sport/types/sport";

export function createInitialSportState(): sportState {
    return {
        id: null,
        name: "",
        description: "",
    };
}
