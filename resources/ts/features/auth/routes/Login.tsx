import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInfoSchema } from "../schemas/LoginInfoSchema";
import type { LoginInfoType } from "../types/auth";
import { useLoginMutaion } from "../hooks/useLoginMutation";

const defaultLoginInfo = {
  username: "",
  password: "",
};

export function Login(): JSX.Element {
  const { mutation, loginError } = useLoginMutaion();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfoType>({
    defaultValues: defaultLoginInfo,
    resolver: zodResolver(LoginInfoSchema),
  });

  async function onSubmit(formData: LoginInfoType) {
    mutation.mutate(formData);
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <p>{loginError}</p>}
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
