import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import {Toaster} from "react-hot-toast";
import useAuthStore from "./store";

function App() {
    const isAuth = useAuthStore((state) => state.token );

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<LoginPage/>}
                    />
                    <Route
                        path="/home"
                        element={isAuth ? <HomePage/> : <Navigate to={"/"}/>}
                    />
                </Routes>
            </BrowserRouter>
            <Toaster/>
        </>
    )
}

export default App
