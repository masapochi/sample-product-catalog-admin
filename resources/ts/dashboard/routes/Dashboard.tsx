import { Navigate, redirect } from "react-router-dom";

export default function Dashboard(): JSX.Element {
  const { user } = JSON.parse(
    sessionStorage.getItem("user") || JSON.stringify({ user: null })
  );
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1>dashboard</h1>
    </>
  );
}
