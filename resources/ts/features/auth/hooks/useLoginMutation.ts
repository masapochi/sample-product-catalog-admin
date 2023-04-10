import { useState } from "react";
import { LoginInfoType, UserType } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

async function dummy(formData: LoginInfoType) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: formData.username } as UserType);
        }, 1000);
    });
}

async function postLogin(formData: LoginInfoType) {
    const { data } = await axios.post("/api/login", formData);
    // const data = await dummy(formData);
    return data;
}

export const useLoginMutaion = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const { logIn } = useAuth();
    const mutation = useMutation<UserType, Error, LoginInfoType>(postLogin, {
        onSuccess: (user: UserType) => {
            if (user) {
                setLoginError("");
                logIn(user.name);
                navigate("/", { replace: true });
            }
        },
        onError: (error: Error) => {
            setLoginError("ユーザー名かパスワードが間違っています");
        },
    });
    return { mutation, loginError };
};
