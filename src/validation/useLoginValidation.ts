import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface ILoginForm {
    condition: string;
    password: string;
}

const useLoginValidation = () => {
    const initialValue: ILoginForm = {
        condition: "",
        password: ""
    };

    const schema = yup.object().shape({
        condition: yup.string().required("Please type your username or email!"),
        password: yup
            .string()
            .required("Please type your password!")
            .min(8, "Password must be at least 8 characters!")
    });

    return useForm<ILoginForm>({
        defaultValues: initialValue,
        mode: "all",
        reValidateMode: "onBlur",
        resolver: yupResolver(schema)
    });
};

export default useLoginValidation;
