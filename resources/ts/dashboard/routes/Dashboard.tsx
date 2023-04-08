import { Navigate } from "react-router-dom";

export default function Dashboard(): JSX.Element {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1>dashboard</h1>
    </>
  );
}
