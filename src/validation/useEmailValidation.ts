import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IEmailForm {
    email: string;
}

const useEmailValidation = () => {
    const initialValue: IEmailForm = {
        email: ""
    };

    const schema = yup.object().shape({
        email: yup.string().email().required()
    });

    return useForm<IEmailForm>({
        defaultValues: initialValue,
        mode: "all",
        reValidateMode: "onBlur",
        resolver: yupResolver(schema)
    });
};

export default useEmailValidation;
