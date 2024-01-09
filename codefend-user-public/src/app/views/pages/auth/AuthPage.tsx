import React, { Suspense, lazy } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { AuthServices } from '../../../data';

import '../../styles/buttons.scss';
import '../../styles/forms.scss';
import './auth.scss';

const Logo = lazy(() => import('../../components/standalones/Logo'));

const AuthPage: React.FC = () => {
	const location = useLocation();
	const isNotAuthenticated = AuthServices.verifyAuth();
	if (isNotAuthenticated) AuthServices.logout2();

	return isNotAuthenticated ? (
		<>
			<div className="codefend-img-bg">
				<Logo theme={'shadow'} />
			</div>
			<section className="access">
				<div className="container">
					<div className="brand"></div>
					<div className="forms">
						<div className="nav">
							<span
								className={
									location.pathname === '/auth/signin'
										? 'active'
										: ''
								}>
								<Link to="/auth/signin">access</Link>
							</span>
							<span
								className={
									location.pathname.startsWith('/auth/signup')
										? 'active'
										: ''
								}>
								<Link to="/auth/signup">new user</Link>
							</span>
						</div>
						<Suspense fallback={<div>Loading...</div>}>
							<Outlet />
						</Suspense>
					</div>
				</div>
			</section>
		</>
	) : (
		<Navigate to="/" />
	);
};

export default AuthPage;
