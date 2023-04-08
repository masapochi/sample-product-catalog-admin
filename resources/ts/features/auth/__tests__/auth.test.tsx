import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../routes/Login";
import { App } from "../../../App";
import {
  BrowserRouter,
  MemoryRouter,
  Router,
  Routes,
  createMemoryRouter,
} from "react-router-dom";
import { createMemoryHistory } from "history";
function usernameInput() {
  return screen.getByLabelText(/username/i);
}
function passwordInput() {
  return screen.getByLabelText(/password/i);
}
function loginButton() {
  return screen.getByRole("button", { name: /login/i });
}

function renderApp(initialEntries: string[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("Login", () => {
  it("ログイン画面が表示される", async () => {
    renderApp(["/login"]);
    expect(usernameInput()).toBeInTheDocument();
    expect(passwordInput()).toBeInTheDocument();
    expect(loginButton()).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });
  it("ユーザー名とパスワードを入力できる", async () => {
    renderApp(["/login"]);
    await userEvent.type(usernameInput(), "test_user-name");
    await userEvent.type(passwordInput(), "password");
    expect(usernameInput()).toHaveValue("test_user-name");
    expect(passwordInput()).toHaveValue("password");
  });

  it("ユーザー名が空の状態で送信するとエラーを表示する", async () => {
    renderApp(["/login"]);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button");

    // Clear the username input and set the password to a valid value
    await userEvent.clear(usernameInput);
    await userEvent.type(passwordInput, "password123");

    // Submit the form
    await fireEvent.click(submitButton);

    // Check that an error message is displayed for the username input
    const errorMessage = await screen.findByText("aaa");
    expect(errorMessage).toBeInTheDocument();
  });
  it("パスワードが空の状態で送信するとエラーを表示する", async () => {
    renderApp(["/login"]);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button");
    await userEvent.type(usernameInput, "test");
    await userEvent.clear(passwordInput);
    await userEvent.click(submitButton);

    const error = await screen.findByText("パスワードは入力必須項目です");
    expect(error).toBeInTheDocument();
  });

  it("ログインするとホームページにリダイレクトされる", async () => {
    renderApp(["/login"]);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/login");
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button");
    await userEvent.type(usernameInput, "username");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});

describe("Redirect", () => {
  it("未ログイン状態だとダッシュボードページにアクセスできない。ログインページにリダイレクトされる", async () => {
    sessionStorage.clear();
    renderApp(["/"]);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/login");
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  it("ログイン状態だとログインページにアクセスできない", async () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({ user: { username: "test" } })
    );
    renderApp(["/login"]);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
