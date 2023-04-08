import { z } from "zod";
import { LoginInfoSchema } from "../schemas/LoginInfoSchema";

export type LoginInfo = z.infer<typeof LoginInfoSchema>;

export type User = {
    username: string;
};
