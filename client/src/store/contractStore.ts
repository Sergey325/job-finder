import {Applicant, Vacancy} from "../../types.ts";
import create from "zustand";

interface ContractState {
    applicant: Applicant | null;
    vacancy: Vacancy | null;
    addApplicant: (applicant: Applicant) => void;
    addVacancy: (vacancy: Vacancy) => void;
    clear: () => void;
}
const useContractStore = create<ContractState>((set) => ({
    applicant: null,
    vacancy: null,
    addApplicant: (applicant: Applicant) => {
        set({applicant: applicant})
    },
    addVacancy: (vacancy: Vacancy) => {

        set({vacancy: vacancy})
    },
    clear: () => {
        set(
            {
                applicant: null,
                vacancy:null
            })
    }
}));

export default useContractStore;