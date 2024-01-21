import React, { Suspense } from 'react';
import { AuthServices, useUserAdmin } from '../../../../../data';
import { EmptyScreenView, Loader } from '../../../../components';
import { Navigate, Outlet } from 'react-router';

const AdminPage: React.FC = () => {
	const { isAuth, isAdmin, getAccessToken } = useUserAdmin();
	const isNotAuthenticated = AuthServices.verifyAuth();
	if (isNotAuthenticated) {
		AuthServices.logout2();
	}

	const userHaveAccess =
		isAdmin() && getAccessToken() !== null && !isNotAuthenticated;
	return (
		<>
			{userHaveAccess ? (
				<>
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</>
			) : (
				<>
					<Navigate to={'/'} />
				</>
			)}
		</>
	);
};

export default AdminPage;
