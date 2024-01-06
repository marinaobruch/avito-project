import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks'

export const RequireAuth = () => {
	const user = useAppSelector((state) => state.user.email)

	if (!user) {
		return <Navigate to='/login' />
	}

	return <Outlet />
}
