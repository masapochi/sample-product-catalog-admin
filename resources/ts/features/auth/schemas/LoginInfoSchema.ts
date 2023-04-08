import { z } from "zod";

export const LoginInfoSchema = z.object({
    username: z.string().min(1, { message: "ユーザー名は入力必須項目です" }),
    password: z.string().min(1, { message: "パスワードは入力必須項目です" }),
});
