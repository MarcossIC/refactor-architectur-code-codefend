import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouterLayout } from './RouterLayout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = lazy(() => import('./views/pages/auth/AuthPage'));
const SignInLayout = lazy(() => import('./views/pages/auth/components/Signin'));
const SignUpLayout = lazy(() => import('./views/pages/auth/components/Signup'));
const ConfirmationSignUp = lazy(
	() => import('./views/pages/auth/components/ConfirmationSignUp'),
);
const Dashboard = lazy(() => import('./views/pages/panel/dashboard/Dashboard'));
const WebApplication = lazy(
	() => import('./views/pages/panel/web/WebApplication'),
);
const MobileApplication = lazy(
	() => import('./views/pages/panel/mobile/MobileApplicationPanel'),
);

export const AppRouter: React.FC = () => {
	return (
		<>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<Routes>
				{/* Rutas privadas */}
				<Route path="/" element={<RouterLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/web" element={<WebApplication />} />
					<Route path="/mobile" element={<MobileApplication />} />
				</Route>

				{/* Rutas públicas para login y registro */}
				<Route path="/auth/*" element={<AuthPage />}>
					<Route index element={<Navigate to="signin" replace />} />
					<Route path="signin" element={<SignInLayout />} />
					<Route path="signup" element={<SignUpLayout />} />
					<Route
						path="signup/:ref"
						element={<ConfirmationSignUp />}
					/>
				</Route>
			</Routes>
		</>
	);
};
