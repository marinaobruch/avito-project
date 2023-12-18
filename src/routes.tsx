import { Route, Routes } from "react-router"
import { Login, MainPage, Profile, ProfileSeller, Register } from "./pages"
import { LayoutAuth, LayoutNoAuth } from "./layouts"
import { ProductCard } from "pages/product-card"

export const AppRouter = () => (
    <Routes>
        <Route element= { <Login/> } path="/login"></Route>
        <Route element= { <Register/> } path="/register"></Route>

        <Route element= { <LayoutNoAuth /> }>
            <Route index element={ <MainPage/> } path='/main'></Route>
        </Route>

        <Route element= { <LayoutAuth /> }>
            <Route element= { <Profile /> } path="/profile"></Route>
            <Route element= { <ProfileSeller /> } path="/profile-seller"></Route>
            <Route element= { <ProductCard /> } path="/product/:id"></Route>
        </Route>
    </Routes>
)