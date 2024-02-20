import {useState} from "react";
import CreateApplicantModal from "../../components/modals/CreateApplicantModal.tsx";
import DataTable from "../../components/Seeker/DataTable.tsx";
import Button from "../../components/UI/Button.tsx";

const HomePage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <div>
            <Button label="add applicant" outline onClick={() => setIsOpenModal(true)}/>
            <DataTable/>
            <CreateApplicantModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}/>
        </div>
    );
};

export default HomePage;