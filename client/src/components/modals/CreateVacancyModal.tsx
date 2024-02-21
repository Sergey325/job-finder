import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "./Modal.tsx";
import FormInput from "../UI/FormInput.tsx";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../../store";
import {Vacancy} from "../../../types.ts";
import DropDown from "../UI/DropDown.tsx";

type Props = {
    isOpen: boolean
    onClose: () => void
    update: () => void
    vacancy?: Vacancy
};

const CreateVacancyModal = ({isOpen, onClose, update, vacancy}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const token = useAuthStore((state) => state.token);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        watch,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            name: vacancy?.name || '',
            description: vacancy?.description || '',
            location: vacancy?.location || '',
            salary: vacancy?.salary || '',
            workType: 'Full-time',
            companyName: vacancy?.companyName || ''
        }
    })

    const workType = watch('workType')

    // const cvUrl = watch('cvUrl')
    //
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post(
            `${import.meta.env.VITE_ENDPOINT}/vacancies/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                const loggedIn = res.data

                if (loggedIn) {
                    toast.success("Додано вакансію")
                    //
                    reset()
                    update()
                }
            })
            .catch(error => {
                toast.error(error.response?.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const options = [
        { value: "Remote", label: "Remote", onSelected: function(value: string) { setCustomValue("workType", value) }},
        { value: "Hybrid", label: "Hybrid", onSelected: function(value: string) { setCustomValue("workType", value) }},
        { value: "Full-time", label: "Full-time", onSelected: function(value: string) { setCustomValue("workType", value) }},
    ]

    const bodyContent = (
        <div className="flex flex-col text-gray-800 gap-4">
            <div className="flex gap-4">
                <FormInput
                    id="name"
                    label="Назва вакансії"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <FormInput
                    id="salary"
                    label='Зарплата'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            <FormInput
                id="companyName"
                label='Назва компанії'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <div className="z-20">
                <DropDown
                    placeholder="Full-time"
                    mainStyles="
                        hover:shadow-none
                        min-w-[140px]
                        rounded-md
                        text-neutral-800
                        bg-neutral-100
                        border-gray-300
                        px-1
                        z-10
                    "
                    childStyle={"flex items-center justify-center bg-neutral-200 hover:bg-neutral-300 text-sm"}
                    options={options}
                />
            </div>
            <FormInput
                id="location"
                label='Локація'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <FormInput
                id="description"
                label='Опис вакансії'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={isOpen}
            title="Додавання вакасії"
            actionLabel="Додати вакансію"
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
};

export default CreateVacancyModal;