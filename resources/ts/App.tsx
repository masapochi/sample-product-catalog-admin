import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./features/auth/routes/Login";
import Dashboard from "./features/dashboard/routes/Dashboard";
import RootLayout from "./compoents/layouts/RootLayout";
import AuthLayout from "./features/auth/components/AuthLayout";
import UnAuthLayout from "./features/auth/components/UnAuthLayout";

export default function About(): JSX.Element {
    return (
        <>
            <h1>About</h1>
        </>
    );
}
export function App() {
    const location = useLocation();
    return (
        <>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route element={<UnAuthLayout />}>
                        <Route path="login" element={<Login />} />
                    </Route>
                    <Route element={<AuthLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="about" element={<About />} />
                    </Route>
                </Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
            <div data-testid="location-display">{location.pathname}</div>
        </>
    );
}
