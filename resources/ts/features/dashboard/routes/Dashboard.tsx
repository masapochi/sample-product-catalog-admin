import { UserType } from "@/features/auth/types/auth";
import { Navigate } from "react-router-dom";

export default function Dashboard(): JSX.Element {
  const user: UserType = JSON.parse(sessionStorage.getItem("user") || "null");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1>dashboard</h1>
      <p>Hello, {user.name}</p>
    </>
  );
}
