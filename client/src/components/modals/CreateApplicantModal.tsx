import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "./Modal.tsx";
import FormInput from "../UI/FormInput.tsx";
import CVupload from "../CVupload.tsx";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../../store";
import {Applicant} from "../../../types.ts";

type Props = {
    isOpen: boolean
    onClose: () => void
    update: () => void
    applicant?: Applicant
};

const CreateApplicantModal = ({isOpen, onClose, update, applicant}: Props) => {
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
            firstName: applicant?.firstName || '',
            lastName: applicant?.lastName || '',
            email: applicant?.email || '',
            qualification: applicant?.qualification || '',
            jobPosition: applicant?.jobPosition || '',
            cvUrl: applicant?.cvUrl || '',
        }
    })

    const cvUrl = watch('cvUrl')

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
            `${import.meta.env.VITE_ENDPOINT}/applicants/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                const loggedIn = res.data

                if (loggedIn) {
                    toast.success("Додано шукача")
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


    const bodyContent = (
        <div className="flex flex-col text-gray-800 gap-4">
            <div className="flex gap-4">
                <FormInput
                    id="firstName"
                    label="Ім'я"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <FormInput
                    id="lastName"
                    label='Прізвище'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            <FormInput
                id="jobPosition"
                label='Позиція'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <FormInput
                id="qualification"
                label='Кваліфікація'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <FormInput
                id="email"
                label='Пошта'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <div className="rounded-md border-2 border-neutral-400 p-2">
                <CVupload onChange={(cvUrl) => setCustomValue("cvUrl", cvUrl)}/>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={isOpen}
            title="Додавання шукача"
            actionLabel="Додати шукача"
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
};

export default CreateApplicantModal;