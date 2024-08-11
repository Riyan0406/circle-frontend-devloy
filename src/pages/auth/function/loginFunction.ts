import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ILoginForm } from "../../../validation/useLoginValidation";
import { useAppDispatch } from "../../../store";
import { loginAsync } from "../../../store/asyncThunk/loginAsync";

interface IProps {
    reset: () => void;
}

export const useLoginFunction = ({ reset }: IProps) => {
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        console.log(data);
        dispatch(loginAsync(data));
        reset();
    };

    const onErrorSubmit: SubmitErrorHandler<ILoginForm> = (data) => {
        console.log(data);
    };

    return {
        onSubmit,
        onErrorSubmit,
    };
};
