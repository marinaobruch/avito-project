import { Route, Routes } from "react-router"
import { Login, MainPage, Profile, ProfileSeller, Register } from "./pages"
import { LayoutAuth, LayoutNoAuth } from "./layouts"
import { ProductCard } from "pages/product-card"
import { RequireAuth } from "./hocs"
import { NotFoundPage } from "pages/not-found"

export const AppRouter = () => (
    <Routes>
            <Route element= { <LayoutNoAuth /> }>
                <Route index element={ <MainPage/> } path='/' />
            </Route>

            <Route element= { <LayoutAuth /> }>
                <Route element={ <RequireAuth /> } path="/">
                    <Route element= { <Profile /> } path="/profile" />
                </Route>
                <Route element= { <ProfileSeller /> } path="/profile-seller/:id" />
                <Route element= { <ProductCard /> } path="/product/:id" />
            </Route>

            <Route element={ <NotFoundPage /> } path="*" />

        <Route element= { <Login/> } path="/login" />
        <Route element= { <Register/> } path="/register" />
    </Routes>
)