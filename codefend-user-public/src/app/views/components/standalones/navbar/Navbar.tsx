import React, { lazy, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../data/redux/slices/auth.slice';
import { User, clearAuth, useAuthState } from '../../../../data';
import { ConfirmModal, LogoutIcon, ModalWrapper, Show } from '../..';
import './navbar.scss';

const Logo = lazy(() => import('../../defaults/Logo'));

const Navbar: React.FC = () => {
	const { getUserdata } = useAuthState();
	const userData = getUserdata() as User;
	const [logoutModal, setLogoutModal] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/auth/signin');
		clearAuth();
	};

	return (
		<>
			<nav className="navbar">
				<Show when={logoutModal}>
					<ModalWrapper action={() => setLogoutModal(false)}>
						<div
							className="modal-wrapper-title internal-tables disable-border"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}>
							<ConfirmModal
								header="ARE YOU SURE YOU WANT TO LOGOUT?"
								cancelText="Cancel"
								confirmText="Logout"
								close={() => setLogoutModal(false)}
								action={() => handleLogout()}
							/>
						</div>
					</ModalWrapper>
				</Show>
				<div className="navbar-logo">
					<Link to="/">
						<span className="navbar-logo-container">
							<Logo theme="aim" />
						</span>
					</Link>
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
