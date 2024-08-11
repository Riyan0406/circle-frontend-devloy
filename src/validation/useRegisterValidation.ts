import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IRegisterForm {
    fullname: string;
    email: string;
    password: string;
}

const useRegisterValidation = () => {
    const initialValue: IRegisterForm = {
        fullname: "",
        email: "",
        password: ""
    };

    const schema = yup.object().shape({
        fullname: yup.string().required("Please type your fullname!"),
        email: yup.string().email().required("Please type your email!"),
        password: yup
            .string()
            .required("Please type your password!")
            .min(8, "Password must be at least 8 characters!")
    });

    return useForm<IRegisterForm>({
        defaultValues: initialValue,
        mode: "all",
        reValidateMode: "onBlur",
        resolver: yupResolver(schema)
    });
};

export default useRegisterValidation;
