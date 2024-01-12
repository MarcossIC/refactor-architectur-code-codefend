import React, { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '../../components';
import { AuthServices } from '../../../data/services';

const Navbar = lazy(() => import('../../components/standalones/Navbar'));
const Sidebar = lazy(() => import('../../components/standalones/Sidebar'));

export const PanelPage: React.FC = () => {
	const isNotAuthenticated = AuthServices.verifyAuth();
	if (isNotAuthenticated) AuthServices.logout2();

	return !isNotAuthenticated ? (
		<>
			<Navbar />
			<Sidebar />
			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>
		</>
	) : (
		<Navigate to="/auth/signin" />
	);
};
