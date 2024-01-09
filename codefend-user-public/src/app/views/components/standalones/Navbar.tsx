import React, { lazy, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../data/redux/slices/auth.slice';
import { User, clearAuth, useAppSelector, useAuthState } from '../../../data';
import { LogoutIcon } from '..';
import '../../styles/navbar.scss';

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
		<div className="logout-modal">
			<div className="logout-modal-wrapper disable-border">
				<div className="logout-modal-head">
					<p className="logout-modal-head-text text-small title-format">
						Are you sure you want to Logout?
					</p>
				</div>

				<div className="logout-modal-buttons">
					<button
						onClick={() => closed(false)}
						className="btn btn-secondary logout-modal-buttons-btn">
						Cancel
					</button>
					<button
						className="btn btn-primary logout-modal-buttons-btn"
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
	const { getUserdata } = useAuthState();
	const userData = getUserdata() as User;
	const [logoutModal, setLogoutModal] = useState<boolean>(false);

	const updateModal = useCallback(
		(updatedState: boolean) => setLogoutModal(updatedState),
		[logoutModal],
	);

	return (
		<>
			<nav className="navbar">
				{logoutModal ? (
					<div
						onClick={() => {
							setLogoutModal(false);
						}}
						className="navbar-modal">
						<div
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}
							className="navbar-modal-container">
							<NavbarLogoutConfirm closed={updateModal} />
						</div>
					</div>
				) : (
					<></>
				)}
				<div className="navbar-logo">
					<Link to="/">
						<span className="navbar-logo-container">
							<Logo theme="aim" />
						</span>
					</Link>
				</div>

				<div className="navbar-user">
					<span>{userData?.email}</span>
				</div>

				<div title="Logout" className="navbar-logount">
					<span
						className="navbar-logout-icon"
						onClick={(e: React.FormEvent) => setLogoutModal(true)}>
						<LogoutIcon />
					</span>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
