import { Route, Routes } from "react-router"
import { Login, MainPage, Register } from "./pages"

export const AppRouter = () => (
    <Routes>
        <Route element={ <Login/> } path="/login"></Route>
        <Route element={ <Register/> } path="/register"></Route>
        <Route index element={ <MainPage/> } path='/main'></Route>
    </Routes>
)