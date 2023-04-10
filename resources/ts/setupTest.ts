import "@testing-library/jest-dom";
import { server } from "./mocks/servers";
import axios from "axios";
import { QueryCache } from "@tanstack/react-query";

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
    const queryCache = new QueryCache();
    queryCache.clear();
});

afterAll(() => server.close());
