import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IForgotForm {
    newPassword: string;
    confirmNewPassword: string;
}

const useForgotValidation = () => {
    const initialValue: IForgotForm = {
        newPassword: "",
        confirmNewPassword: ""
    };

    const schema = yup.object().shape({
        newPassword: yup
            .string()
            .required("Please type your new password!")
            .min(8, "Password must be at least 8 characters!"),
        confirmNewPassword: yup
            .string()
            .required("Please retype your new password!")
            .min(8, "Password must be at least 8 characters!")
    });

    return useForm<IForgotForm>({
        defaultValues: initialValue,
        mode: "all",
        reValidateMode: "onBlur",
        resolver: yupResolver(schema)
    });
};

export default useForgotValidation;
