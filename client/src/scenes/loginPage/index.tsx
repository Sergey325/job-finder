import FormInput from "../../components/UI/FormInput.tsx";
import Form from "./Form.tsx";

type Props = {

};

const LoginPage = (props: Props) => {
    return (
        <div className="h-[100%]">
            <div className="w-full py-8 px-[6%] text-center bg-bkg-alt">
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-primary-main select-none transition">
                    Pikorino
                </h1>
            </div>
            <div className="flex flex-col py-10 justify-center items-center">
                <Form />
            </div>
        </div>
    );
};

export default LoginPage;