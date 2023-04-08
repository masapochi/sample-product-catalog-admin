import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { App } from "@/App";
import { server } from "@/mocks/servers";

function usernameInput() {
  return screen.getByLabelText(/username/i);
}
function passwordInput() {
  return screen.getByLabelText(/password/i);
}
function loginButton() {
  return screen.getByRole("button", { name: /login/i });
}

const invalidUsernameMessage = /ユーザー名は入力必須項目です/i;
const invalidPasswordMessage = /パスワードは入力必須項目です/i;
const loginFailureMessage = /ユーザー名かパスワードが間違っています/i;

function renderApp(initialEntries: string[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("ログイン", () => {
  it("ログイン画面が表示される", async () => {
    // ログイン画面をレンダリングする
    renderApp(["/login"]);
    // UsernameとPasswordのinput要素とLoginボタンが表示されていることを検証する
    expect(usernameInput()).toBeInTheDocument();
    expect(passwordInput()).toBeInTheDocument();
    expect(loginButton()).toBeInTheDocument();

    // ヘッダーに"Login"というテキストが含まれていることを検証する
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  it("ユーザー名とパスワードを入力できる", async () => {
    // ログイン画面をレンダリングする
    renderApp(["/login"]);

    // UsernameとPasswordのinput要素に値を入力する
    await userEvent.type(usernameInput(), "test_user-name");
    await userEvent.type(passwordInput(), "password");

    // UsernameとPasswordのinput要素のvalueが期待通りであることを検証する
    expect(usernameInput()).toHaveValue("test_user-name");
    expect(passwordInput()).toHaveValue("password");
  });

  it("ユーザー名が空の状態で送信するとエラーを表示する", async () => {
    // ログイン画面をレンダリングする
    renderApp(["/login"]);

    // ユーザー名の入力欄をクリアして、パスワードを入力する
    await userEvent.clear(usernameInput());
    await userEvent.type(passwordInput(), "password");

    // ログインボタンをクリックする
    await fireEvent.click(loginButton());

    // エラーメッセージが表示されることを確認する
    const errorMessage = await screen.findByText(invalidUsernameMessage);
    expect(errorMessage).toBeInTheDocument();
  });

  it("パスワードが空の状態で送信するとエラーを表示する", async () => {
    // ログイン画面をレンダリングする
    renderApp(["/login"]);

    // ユーザー名を入力し、パスワードの入力欄をクリアする
    await userEvent.type(usernameInput(), "test");
    await userEvent.clear(passwordInput());

    // ログインボタンをクリックする
    await userEvent.click(loginButton());

    // エラーメッセージが表示されることを確認する
    const error = await screen.findByText(invalidPasswordMessage);
    expect(error).toBeInTheDocument();
  });

  it("ログインに失敗するとエラーメッセージを表示する ", async () => {
    // ログイン画面を表示
    renderApp(["/login"]);

    // サーバーにリクエストが送信された場合（失敗）のレスポンスを定義する
    server.use(
      rest.post("/api/login", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    // 不正なユーザー名、パスワードを入力し、ログインボタンをクリックする
    await userEvent.type(usernameInput(), "invalid-username");
    await userEvent.type(passwordInput(), "invalid-password");
    await userEvent.click(loginButton());

    // 「ユーザー名かパスワードが間違っています」というエラーメッセージを取得する
    const loginError = await screen.findByText(loginFailureMessage);

    // エラーメッセージが表示されることを検証する
    expect(loginError).toBeInTheDocument();
  });
});

describe("リダイレクト", () => {
  it("ログインするとホームページにリダイレクトされる", async () => {
    // ログイン画面を表示
    renderApp(["/login"]);

    // ログイン画面であることを検証する
    expect(screen.getByTestId("location-display")).toHaveTextContent("/login");

    // ユーザー名、パスワードを入力し、ログインボタンをクリックする
    await userEvent.type(usernameInput(), "test");
    await userEvent.type(passwordInput(), "password");
    await userEvent.click(loginButton());

    // ダッシュボードページにリダイレクトされたことを検証する
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
  it("未ログイン状態だとダッシュボードページにアクセスできない。ログインページにリダイレクトされる", async () => {
    sessionStorage.clear();
    renderApp(["/"]);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/login");
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  it("ログイン状態だとログインページにアクセスできない", async () => {
    sessionStorage.setItem("user", JSON.stringify({ user: "test" }));
    renderApp(["/login"]);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
