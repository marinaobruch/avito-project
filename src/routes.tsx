import { NotFoundPage } from 'pages/not-found'
import { ProductCard } from 'pages/product-card'
import { Route, Routes } from 'react-router'
import { RequireAuth } from './hocs'
import { LayoutAuth, LayoutNoAuth } from './layouts'
import { Login, MainPage, Profile, ProfileSeller, Register } from './pages'

export const AppRouter = () => (
	<Routes>
		<Route element={<LayoutNoAuth />}>
			<Route index element={<MainPage />} path='/' />
		</Route>

		<Route element={<LayoutAuth />}>
			<Route element={<RequireAuth />} path='/'>
				<Route element={<Profile />} path='/profile' />
			</Route>
			<Route element={<ProfileSeller />} path='/profile-seller/:id' />
			<Route element={<ProductCard />} path='/product/:id' />
		</Route>

		<Route element={<NotFoundPage />} path='*' />

		<Route element={<Login />} path='/login' />
		<Route element={<Register />} path='/register' />
	</Routes>
)
