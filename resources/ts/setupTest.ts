import "@testing-library/jest-dom";
import { server } from "./mocks/servers";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
