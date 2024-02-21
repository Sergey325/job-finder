import {useEffect, useMemo, useState} from "react";
import useAuthStore from "../../../store/authStore.ts";
import axios from "axios";
import toast from "react-hot-toast";
import CreateApplicantModal from "../../../components/modals/CreateApplicantModal.tsx";
import Button from "../../../components/UI/Button.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Applicant} from "../../../../types.ts";
import fuzzySort from "../../../components/tables/sorting.tsx";
import {MdDeleteOutline, MdEdit, MdFileOpen} from "react-icons/md";
import DataTable from "../../../components/tables/DataTable.tsx";
import useContractStore from "../../../store/contractStore.ts";


const ApplicantsTab = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [data, setData] = useState([]);
    const contract = useContractStore((state) => state);
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

            getApplicants()
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
                cell: ({row}) => <a className="underline" href={row.original.cvUrl} target="_blank">{`${row.original.firstName}-${row.original.lastName}CV`}</a>
            },
            {
                header: 'Дії',
                cell: ({ row }) => {
                    return (
                        <div className="flex gap-3">
                            <MdDeleteOutline size={30} className="cursor-pointer" onClick={() => { // @ts-ignore
                                deleteApplicant(data[row.index]._id)}}/>
                            <MdFileOpen size={28} className="cursor-pointer" onClick={() => contract.addApplicant(row.original)}/>
                        </div>
                    )
                },
            }
        ],
        [data]
    )

    useEffect(() => {
        getApplicants()
    }, []);

    return (
        <div className="relative px-10 pt-5">
            <div className="absolute w-40 mx-2 top-7 right-10">
                <Button label="Додати шукача" outline onClick={() => setIsOpenModal(true)}/>
            </div>
            <DataTable defaultData={data} columns={columns} />
            <CreateApplicantModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} update={getApplicants}/>
        </div>
    )

}

export default ApplicantsTab;