/* eslint-disable react-hooks/rules-of-hooks */
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { IRegisterForm } from "../../../validation/useRegisterValidation";
import { useAppDispatch } from "../../../store";
import { registerAsync } from "../../../store/asyncThunk/registerAsync";
// import { useNavigate } from "react-router-dom"

interface IProps {
    reset: () => void;
}

export const useRegisterFunction = ({ reset }: IProps) => {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate()

    const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
        console.log(data);
        dispatch(registerAsync(data));
        reset();
    };

    const onErrorSubmit: SubmitErrorHandler<IRegisterForm> = (data) => {
        console.log(data);
    };

    return {
        onSubmit,
        onErrorSubmit,
    };
};
