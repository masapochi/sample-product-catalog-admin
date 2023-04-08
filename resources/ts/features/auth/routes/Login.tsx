import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInfoSchema } from "../schemas/LoginInfoSchema";
import type { LoginInfo } from "../types/auth";
import { Navigate, useNavigate } from "react-router-dom";

const defaultLoginInfo = {
  username: "",
  password: "",
};

export function Login(): JSX.Element {
  const navigate = useNavigate();

  const { user } = JSON.parse(
    sessionStorage.getItem("user") || JSON.stringify({ user: null })
  );
  // console.log(user);
  if (user) {
    return <Navigate to="/" />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>({
    defaultValues: defaultLoginInfo,
    resolver: zodResolver(LoginInfoSchema),
  });

  function onSubmit(formData: LoginInfo) {
    sessionStorage.setItem(
      "user",
      JSON.stringify({ user: { username: formData.username } })
    );
    navigate("/");
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" {...register("username")} />
          {errors.username && <p>{errors.username?.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p data-testid="password-error">{errors.password?.message}</p>
          )}
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
