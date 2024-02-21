import {useEffect, useMemo, useState} from "react";
import useAuthStore from "../../../store";
import axios from "axios";
import toast from "react-hot-toast";
import {ColumnDef} from "@tanstack/react-table";
import {Contract} from "../../../../types.ts";
import moment from "moment/moment";
import fuzzySort from "../../../components/tables/sorting.tsx";
import DataTable from "../../../components/tables/DataTable.tsx";
import Button from "../../../components/UI/Button.tsx";
import CreateVacancyModal from "../../../components/modals/CreateVacancyModal.tsx";

const ContractsTab = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [data, setData] = useState([]);
    const token = useAuthStore((state) => state.token);

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
                cell: info => info.getValue(),
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
            // {
            //     header: 'Дії',
            //     cell: ({ row }) => {
            //         return (
            //             <div>
            //                 <button onClick={() => (console.log("edit"))}><MdEdit /></button>
            //                 <button onClick={() => (console.log("del"))}><MdDeleteOutline /></button>
            //                 <button onClick={() => (console.log("add"))}><MdFileOpen /></button>
            //             </div>
            //         )
            //     },
            // }
        ],
        []
    )

    return (
        <div className="relative">
            <Button label="Додати вакансію" outline onClick={() => setIsOpenModal(true)}/>
            <DataTable defaultData={data} columns={columns} />
            <CreateVacancyModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} update={getContracts}/>
        </div>
    )
}

export default ContractsTab;