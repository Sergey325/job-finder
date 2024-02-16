import {FieldValues, useForm} from "react-hook-form";
import FormInput from "../../components/UI/FormInput.tsx";
import Button from "../../components/UI/Button.tsx";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../../store";

type Props = {

};

const Form = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const auth = useAuthStore((state) => state);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        watch,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            email: 'test@gmail.com',
            password: 'test',
        }
    })


    const loginUser = (formData: FieldValues) => {
        setIsLoading(true)
        axios.post(`http://localhost:5001/auth/login`, formData)
            .then(res => {
                const loggedIn = res.data
                reset()

                if (loggedIn) {
                    toast.success("Logged in")
                    auth.login(loggedIn.token)
                    navigate("/home");
                }
            })
            .catch(error => {
                toast.error(error.response?.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    return (
        <div className="w-1/2 gap-4 flex flex-col">
            <FormInput
                id="email"
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <FormInput
                id="password"
                type="password"
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <div className="text-sm">
                <Button
                    label={"LOGIN"}
                    disabled={isLoading}
                    outline
                    onClick={handleSubmit(loginUser)}
                />
            </div>

        </div>
    );
};

export default Form;