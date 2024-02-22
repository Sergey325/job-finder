import {useEffect, useMemo, useState} from "react";
import useAuthStore from "../../../store/authStore.ts";
import axios from "axios";
import toast from "react-hot-toast";
import {ColumnDef} from "@tanstack/react-table";
import {Contract} from "../../../../types.ts";
import moment from "moment/moment";
import fuzzySort from "../../../components/tables/sorting.tsx";
import DataTable from "../../../components/tables/DataTable.tsx";
import Button from "../../../components/UI/Button.tsx";
import CreateVacancyModal from "../../../components/modals/CreateVacancyModal.tsx";
import useContractStore from "../../../store/contractStore.ts";
import CreateContractModal from "../../../components/modals/CreateContractModal.tsx";

const ContractsTab = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [data, setData] = useState([]);
    const token = useAuthStore((state) => state.token);
    const contract = useContractStore(state => state)

    const getContracts = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_ENDPOINT}/contracts/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    useEffect(() => {
        getContracts()
    }, []);

    function getRandomNumber(): number {
        const min = 150;
        const max = 300;
        // Генерируем случайное число в диапазоне от min до max
        let randomNumber = Math.random() * (max - min) + min;
        // Округляем число до сотых
        randomNumber = Math.round(randomNumber * 100) / 100;
        return randomNumber;
    }

    const columns = useMemo<ColumnDef<Contract, any>[]>(
        () => [
            {
                id: '_id',
                accessorKey: 'date',
                header: 'Дата',
                cell: info => moment(info.getValue()).format("MMM Do YY"),
                sortType:'datetime',
                filterFn: 'fuzzy',
                sortingFn: fuzzySort,
            },
            {
                accessorKey: 'companyName',
                cell: info => <span>{info.getValue()}</span> ,
                header: () => 'Назва компанії',
            },
            {
                accessorKey: 'applicantFullName',
                header: () => "Повне ім`я шукача",
            },
            {
                accessorKey: 'jobPosition',
                header: 'Посада',
            },
            {
                accessorKey: 'companyAddress',
                header: 'Адреса компанії',
            },
            {
                accessorKey: 'commission',
                header: 'Комісійні',
                cell: ({ row }) => <div>{row.original.commission}$</div>
            }
        ],
        []
    )

    return (
        <div className="relative px-10 pt-5">
            <div className="absolute w-40 mx-2 top-7 right-10">
                <Button label="Створити договір" outline onClick={() => setIsOpenModal(true)}/>
            </div>
            <DataTable defaultData={data} columns={columns}/>
            <CreateContractModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} update={getContracts}/>
        </div>
    )
}

export default ContractsTab;