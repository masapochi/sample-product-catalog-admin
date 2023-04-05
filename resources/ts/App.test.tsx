import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { App } from "./App";

describe("first test", () => {
    it("render App component", async () => {
        render(<App />);
        const hello = screen.getByText(/hello/i);

        expect(hello).toBeInTheDocument();
    });
});
