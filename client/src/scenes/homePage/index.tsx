import {useState} from "react";
import ApplicantsTab from "./tabs/ApplicantsTab.tsx";
import VacanciesTab from "./tabs/VacanciesTab.tsx";
import ContractsTab from "./tabs/ContractsTab.tsx";
import Navbar from "../../components/UI/Navbar.tsx";

const HomePage = () => {

    const [activeTab, setActiveTab] = useState('applicants');

    const handleTabChange = (newTab: string) => setActiveTab(newTab);

    return (
        <div>
            <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === 'applicants' && <ApplicantsTab />}
            {activeTab === 'vacancies' && <VacanciesTab />}
            {activeTab === 'contracts' && <ContractsTab />}
        </div>
    );
};

export default HomePage;