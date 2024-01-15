import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PanelPage } from './views/pages/panel/PanelPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FinishSignUpLayout from './views/pages/auth/layouts/FinishsignUp';
import IssuesPanel from './views/pages/panel/layouts/issues/layouts/IssuesPanel';
import IssuesCreation from './views/pages/panel/layouts/issues/layouts/IssuesCreation';
import { Loader } from './views/components';
import IssueUpdate from './views/pages/panel/layouts/issues/layouts/IssuesUpdate';

const AuthPage = lazy(() => import('./views/pages/auth/AuthPage'));
const SignInLayout = lazy(() => import('./views/pages/auth/layouts/Signin'));
const SignUpLayout = lazy(() => import('./views/pages/auth/layouts/Signup'));
const ConfirmationSignUp = lazy(
	() => import('./views/pages/auth/layouts/ConfirmationSignUp'),
);

const Dashboard = lazy(
	() => import('./views/pages/panel/layouts/dashboard/Dashboard'),
);
const WebApplication = lazy(
	() => import('./views/pages/panel/layouts/web/WebApplication'),
);
const MobileApplication = lazy(
	() => import('./views/pages/panel/layouts/mobile/MobileApplicationPanel'),
);
const CloudApplicationPanel = lazy(
	() => import('./views/pages/panel/layouts/cloud/Cloud'),
);
const LanApplicationPanel = lazy(
	() => import('./views/pages/panel/layouts/lan/Lan'),
);

const EnpPanel = lazy(() => import('./views/pages/panel/layouts/enp/EnpPanel'));

const SourceCodePanel = lazy(
	() => import('./views/pages/panel/layouts/sourcecode/SourceCodePanel'),
);

const SocialEngineeringPanel = lazy(
	() => import('./views/pages/panel/layouts/social/SocialEngineeringPanel'),
);

const SupportPanel = lazy(
	() => import('./views/pages/panel/layouts/support/SupportPanel'),
);

const PreferencePanel = lazy(
	() => import('./views/pages/panel/layouts/preferences/PreferencePanel'),
);

const InxPanel = lazy(() => import('./views/pages/panel/layouts/inx/InxPanel'));

const SnsPanel = lazy(() => import('./views/pages/panel/layouts/sns/SnsPanel'));

const VdbPanel = lazy(() => import('./views/pages/panel/layouts/vdb/VdbPanel'));
const AdminUser = lazy(
	() => import('./views/pages/panel/layouts/admin/layouts/AdminUser'),
);
const AdminPage = lazy(
	() => import('./views/pages/panel/layouts/admin/AdminPage'),
);

const AdminCompany = lazy(
	() => import('./views/pages/panel/layouts/admin/layouts/AdminCompany'),
);

const IssuePage = lazy(
	() => import('./views/pages/panel/layouts/issues/IssuePage'),
);

// million-ignore
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

			<Suspense fallback={<Loader />}>
				<Routes>
					{/* Private Routes */}
					<Route path="/*" element={<PanelPage />}>
						<Route index element={<Dashboard />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="web" element={<WebApplication />} />
						<Route path="mobile" element={<MobileApplication />} />
						<Route path="cloud" element={<CloudApplicationPanel />} />
						<Route path="lan" element={<LanApplicationPanel />} />
						<Route path="source" element={<SourceCodePanel />} />

						<Route path="issues/:ref" element={<IssuesPanel />} />
						<Route path="create/issues" element={<IssuesCreation />} />
						<Route path="social" element={<SocialEngineeringPanel />} />
						<Route path="enp" element={<EnpPanel />} />
						<Route path="support" element={<SupportPanel />} />
						<Route path="preferences" element={<PreferencePanel />} />
						<Route path="inx" element={<InxPanel />} />
						<Route path="sns" element={<SnsPanel />} />
						<Route path="vdb" element={<VdbPanel />} />

						<Route path="issues/*" element={<IssuePage />}>
							<Route index element={<IssuesPanel />} />
							<Route path="create" element={<IssuesCreation />} />
							<Route path="update/:id" element={<IssueUpdate />} />
						</Route>

						{/* ?? No aparece en la sidebar, si en sus rutas */}
						<Route path="companies" element={<></>} />
					</Route>
					{/* Private Routes + only admin access */}
					<Route path="admin/*" element={<AdminPage />}>
						<Route index element={<Navigate to="user" replace />} />
						<Route path="user" element={<AdminUser />} />
						<Route path="company" element={<AdminCompany />} />
					</Route>
					{/* Public Routes */}
					<Route path="/auth/*" element={<AuthPage />}>
						<Route index element={<Navigate to="signin" replace />} />
						<Route path="signin" element={<SignInLayout />} />
						<Route path="signup" element={<SignUpLayout />} />
						<Route path="confirmation" element={<ConfirmationSignUp />} />

						<Route path="signup/:ref" element={<FinishSignUpLayout />} />
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};
