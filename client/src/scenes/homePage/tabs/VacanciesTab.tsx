import {useEffect, useMemo, useState} from "react";
import useAuthStore from "../../../store";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../../components/UI/Button.tsx";
import CreateVacancyModal from "../../../components/modals/CreateVacancyModal.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Vacancy} from "../../../../types.ts";
import fuzzySort from "../../../components/tables/sorting.tsx";
import {MdDeleteOutline, MdEdit, MdFileOpen} from "react-icons/md";
import DataTable from "../../../components/tables/DataTable.tsx";

const VacanciesTab = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [data, setData] = useState([]);

    const token = useAuthStore((state) => state.token);

    const getVacancies = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_ENDPOINT}/vacancies/`,
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
        getVacancies()
    }, []);

    const columns = useMemo<ColumnDef<Vacancy, any>[]>(
        () => [
            {
                id: '_id',
                accessorKey: 'name',
                header: 'Назва вакансії',
                cell: info => info.getValue(),
                filterFn: 'fuzzy',
                sortingFn: fuzzySort,
            },
            {
                accessorKey: 'description',
                header: () => 'Опис',
            },
            {
                accessorKey: 'location',
                header: () => 'Локація',
            },
            {
                accessorKey: 'salary',
                header: 'Зарплата',
            },
            {
                accessorKey: 'workType',
                header: 'Тип роботи',
            },
            {
                accessorKey: 'companyName',
                header: 'Назва компанії',
            },
            {
                header: 'Дії',
                cell: ({ row }) => {
                    return (
                        <div>
                            <button onClick={() => (console.log("edit"))}><MdEdit /></button>
                            <button onClick={() => (console.log("del"))}><MdDeleteOutline /></button>
                            <button onClick={() => (console.log("add"))}><MdFileOpen /></button>
                        </div>
                    )
                },
            }
        ],
        []
    )

    return (
        <div className="relative">
            <Button label="Додати вакансію" outline onClick={() => setIsOpenModal(true)}/>
            <DataTable defaultData={data} columns={columns} />
            <CreateVacancyModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} update={getVacancies}/>
        </div>
    )

}

export default VacanciesTab;