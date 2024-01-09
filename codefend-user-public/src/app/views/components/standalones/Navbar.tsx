import React, { ReactNode, lazy, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../data/redux/slices/auth.slice';
import '../../styles/navbar.scss';
import { clearAuth, useAppSelector } from '../../../data';
import { LogoutIcon } from '..';

const Logo = lazy(() => import('./Logo'));

const NavbarLogoutConfirm: React.FC<{
	closed: (updatedState: boolean) => void;
}> = ({ closed }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(logout());
		navigate('/auth/signin');
		clearAuth();
	};
	return (
		<div className="logout-confirm-container">
			<div className="logout-confirm-content disable-border">
				<div className="title-content">
					<p className="text-small title-format">
						Are you sure you want to Logout?
					</p>
				</div>

				<div className="buttons">
					<button
						onClick={() => closed(false)}
						className="btn btn-secondary">
						Cancel
					</button>
					<button
						className="btn btn-primary"
						aria-label="Log out"
						onClick={handleLogout}>
						Logout
					</button>
				</div>

				<div className="helper-box text-format"></div>
			</div>
		</div>
	);
};

const Navbar: React.FC = () => {
	const { userData } = useAppSelector((state) => state.authState);
	const [logoutModal, setLogoutModal] = useState<boolean>(false);

	const updateModal = useCallback(
		(updatedState: boolean) => setLogoutModal(updatedState),
		[logoutModal],
	);

	return (
		<>
			<nav>
				{logoutModal ? (
					<div
						onClick={() => {
							console.log('Close Modal');
						}}
						className="wrapper">
						<div
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}
							className="wrapper-content">
							<NavbarLogoutConfirm closed={updateModal} />
						</div>
					</div>
				) : (
					<></>
				)}
				<div className="container">
					<Link to="/">
						<span className="brand-container">
							<Logo theme="aim" />
						</span>
					</Link>
				</div>

				<div>
					<span>{userData?.email}</span>
				</div>

				<div title="Logout" className="power-off">
					<span
						onClick={(e: React.FormEvent) => setLogoutModal(true)}>
						<LogoutIcon />
					</span>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
