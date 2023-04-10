import { useAuth } from "../../auth/providers/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Dashboard(): JSX.Element {
  const { user } = useAuth();

  return (
    <>
      <h1>dashboard</h1>
      <p>Hello, {user?.name}</p>
    </>
  );
}
