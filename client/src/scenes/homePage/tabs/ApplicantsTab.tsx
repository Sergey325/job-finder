import {useEffect, useMemo, useState} from "react";
import useAuthStore from "../../../store";
import axios from "axios";
import toast from "react-hot-toast";
import CreateApplicantModal from "../../../components/modals/CreateApplicantModal.tsx";
import Button from "../../../components/UI/Button.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Applicant} from "../../../../types.ts";
import fuzzySort from "../../../components/tables/sorting.tsx";
import {MdDeleteOutline, MdEdit, MdFileOpen} from "react-icons/md";
import DataTable from "../../../components/tables/DataTable.tsx";


const ApplicantsTab = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [data, setData] = useState([]);

    const token = useAuthStore((state) => state.token);

    const getApplicants = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_ENDPOINT}/applicants/`,
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

    const deleteApplicant = async (id: any) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_ENDPOINT}/applicants/${id}`,
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

    const columns = useMemo<ColumnDef<Applicant, any>[]>(
        () => [
            {
                accessorFn: row => `${row.firstName} ${row.lastName}`,
                id: '_id',
                header: "Повне ім`я",
                cell: info => info.getValue(),
                filterFn: 'fuzzy',
                sortingFn: fuzzySort,
            },
            {
                accessorKey: 'jobPosition',
                header: () => 'Посада',
            },
            {
                accessorKey: 'qualification',
                header: () => 'Кваліфікація',
            },
            {
                accessorKey: 'email',
                header: 'Пошта',
            },
            {
                accessorKey: 'cvUrl',
                header: 'CV',
                cell: (value) => <a href={value.getValue()} target="_blank">link</a>
            },
            {
                header: 'Дії',
                cell: ({ row }) => {
                    return (
                        <div className="flex">
                            <button onClick={() => (console.log(""))}><MdEdit size={25} /></button>
                            <button onClick={() => {
                                // deleteApplicant(data[row.index]._id)
                                // console.log(data[row.index], row.index)
                            }}><MdDeleteOutline size={25} /></button>
                            <button onClick={() => (console.log("add"))}><MdFileOpen size={25} /></button>
                        </div>
                    )
                },
            }
        ],
        []
    )

    useEffect(() => {
        getApplicants()
    }, []);

    return (
        <div className="relative">
            <Button label="Додати шукача" outline onClick={() => setIsOpenModal(true)}/>
            <DataTable defaultData={data} columns={columns} />
            <CreateApplicantModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} update={getApplicants}/>
        </div>
    )

}

export default ApplicantsTab;