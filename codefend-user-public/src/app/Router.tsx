import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouterLayout } from './RouterLayout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FinishSignUpLayout from './views/pages/auth/components/FinishsignUp';

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
const CloudApplicationPanel = lazy(
	() => import('./views/pages/panel/cloud/Cloud'),
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
				theme="light"
			/>

			<Routes>
				{/* Rutas privadas */}
				<Route path="/" element={<RouterLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/web" element={<WebApplication />} />
					<Route path="/mobile" element={<MobileApplication />} />
					<Route path="/cloud" element={<CloudApplicationPanel />} />
				</Route>

				{/* Rutas públicas para login y registro */}
				<Route path="/auth/*" element={<AuthPage />}>
					<Route index element={<Navigate to="signin" replace />} />
					<Route path="signin" element={<SignInLayout />} />
					<Route path="signup" element={<SignUpLayout />} />
					<Route path="confirmation" element={<ConfirmationSignUp />} />

					{/* <Route path="/auth/signup/:ref" component={RegisterFinishView} /> */}
					<Route
						path="signup/:ref"
						element={<FinishSignUpLayout />}
					/>
				</Route>
			</Routes>
		</>
	);
};
