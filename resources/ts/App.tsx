import {
    BrowserRouter,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
    useLocation,
} from "react-router-dom";
import { Login } from "./features/auth/routes/Login";
import Dashboard from "./dashboard/routes/Dashboard";
import RootLayout from "./RootLayout";

export function App() {
    const location = useLocation();
    return (
        <>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
            <div data-testid="location-display">{location.pathname}</div>
        </>
    );
}
