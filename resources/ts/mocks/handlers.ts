import { rest } from "msw";
export const handlers = [
    rest.post("/api/login", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ user: { username: "test" }, success: true })
        );
    }),
];
