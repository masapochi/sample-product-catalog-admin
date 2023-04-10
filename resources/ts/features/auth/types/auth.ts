import { z } from "zod";
import { LoginInfoSchema } from "../schemas/LoginInfoSchema";

export type LoginInfoType = z.infer<typeof LoginInfoSchema>;

export type UserType = {
    name: string;
};
