import {useEffect, useMemo, useState} from "react";
import useAuthStore from "../../../store/authStore.ts";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../../components/UI/Button.tsx";
import CreateVacancyModal from "../../../components/modals/CreateVacancyModal.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Vacancy} from "../../../../types.ts";
import fuzzySort from "../../../components/tables/sorting.tsx";
import {MdDeleteOutline, MdEdit, MdFileOpen} from "react-icons/md";
import DataTable from "../../../components/tables/DataTable.tsx";
import useContractStore from "../../../store/contractStore.ts";

const VacanciesTab = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [data, setData] = useState([]);
    const contract = useContractStore(state => state)
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

    const deleteVacancy = async (id: any) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_ENDPOINT}/vacancies/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )

            getVacancies()
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
                        <div className="flex gap-3">
                            <MdDeleteOutline size={30} className="cursor-pointer" onClick={() => { // @ts-ignore
                                deleteVacancy(data[row.index]._id)
                            }}/>
                            <MdFileOpen size={28} className="cursor-pointer" onClick={() => contract.addVacancy(row.original)}/>
                        </div>
                    )
                },
            }
        ],
        [data]
    )

    return (
        <div className="relative px-10 pt-5">
            <div className="absolute w-40 mx-2 top-7 right-10">
                <Button label="Додати вакансію" outline onClick={() => setIsOpenModal(true)}/>
            </div>
            <DataTable defaultData={data} columns={columns}/>
            <CreateVacancyModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} update={getVacancies}/>
        </div>
    )

}

export default VacanciesTab;