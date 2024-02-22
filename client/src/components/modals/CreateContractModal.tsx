import {useState} from "react";
import Modal from "./Modal.tsx";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore.ts";
import {Vacancy} from "../../../types.ts";
import useContractStore from "../../store/contractStore.ts";

type Props = {
    isOpen: boolean
    onClose: () => void
    update: () => void
    vacancy?: Vacancy
};

const CreateContractModal = ({isOpen, onClose, update, vacancy}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const token = useAuthStore((state) => state.token);
    const contract = useContractStore(state => state)

    function getRandomNumber(): number {
        const min = 150;
        const max = 300;
        // Генерируем случайное число в диапазоне от min до max
        let randomNumber = Math.random() * (max - min) + min;
        // Округляем число до сотых
        randomNumber = Math.round(randomNumber * 100) / 100;
        return randomNumber;
    }

    const onSubmit = () => {
        if (!contract.applicant) {
            toast.error("Шукача не додано")
            return
        }
        if (!contract.vacancy) {
            toast.error("Вакансію не додано")
            return
        }
        setIsLoading(true)

        axios.post(
            `${import.meta.env.VITE_ENDPOINT}/contracts/`,
            {
                applicantId: contract.applicant?._id,
                vacancyId: contract.vacancy?._id,
                jobPosition: contract.vacancy?.name,
                applicantFullName: `${contract.applicant?.firstName} ${contract.applicant?.lastName}`,
                companyName: contract.vacancy?.companyName,
                companyAddress: contract.vacancy?.location,
                salary: contract.vacancy?.salary,
                commission: getRandomNumber().toString(),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                const loggedIn = res.data

                if (loggedIn) {
                    toast.success("Додано контракт")
                    update()
                }
            })
            .catch(error => {
                toast.error(error.response?.data.message)
            })
            .finally(() => {
                contract.clear()
                setIsLoading(false)
            })
    }


    const bodyContent = (
        <div className="flex text-gray-800 justify-between gap-4">
            <div className="flex flex-col gap-3">
                <span className="text-xl">{`${contract.applicant ? "Шукач:" : "Шукача не додано"}`}</span>
                <span>{contract.applicant?.firstName}</span>
                <span>{contract.applicant?.lastName}</span>
                <span>{contract.applicant?.jobPosition}</span>
                <span>{contract.applicant?.qualification}</span>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-xl">{`${contract.vacancy ? "Вакансія:" : "Вакансії не додано"}`}</span>
                <span>{contract.vacancy?.name}</span>
                <span>{contract.vacancy?.salary}</span>
                <span>{contract.vacancy?.companyName}</span>
                <span>{contract.vacancy?.workType}</span>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={isOpen}
            title="Створення договору"
            actionLabel="Створити договір"
            onClose={onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default CreateContractModal;