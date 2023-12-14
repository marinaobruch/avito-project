import { Route, Routes } from "react-router"
import { Login, MainPage, Register } from "./pages"
import { LayoutNoAuth } from "./layouts"

export const AppRouter = () => (
    <Routes>
        <Route element= { <Login/> } path="/login"></Route>
        <Route element= { <Register/> } path="/register"></Route>
        
        <Route element= { <LayoutNoAuth /> }>
            <Route index element={ <MainPage/> } path='/main'></Route>
        </Route>
    </Routes>
)