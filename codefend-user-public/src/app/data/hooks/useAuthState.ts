import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch, LoginParams, RegisterParams } from '..';
import { loginThunk, registerThunk, registerFinishThunk } from '../redux/thunks/auth.thunk';

export const useAuthState = () => {
	const authState = useAppSelector((state: any) => state.authState);
	const dispatch = useAppDispatch();

	const getUserdata = () => authState.userData;
	const getAccessToken = () => authState.accessToken;
	const isAuth = () => authState.isAuth;

	const signInUser = (params: LoginParams): Promise<boolean> => {
		return dispatch(loginThunk(params))
			.then((response: any) => {
				const { meta } = response;
				if (meta.rejectedWithValue) throw Error(response.payload);
				toast.success(`Login successful`);
				return true;
			})
			.catch((error: any) => {
				toast.error(
					error.message && error.message !== undefined
						? error.message
						: 'An unexpected error has occurred on the server',
				);
				return false;
			});
	};

	const signUpUser = (params: RegisterParams): Promise<boolean> => {
		return dispatch(registerThunk(params))
			.then((response: any) => {
				const { meta } = response;
				if (meta.rejectedWithValue) throw Error(response.payload);
				toast.success(`Signup successful`);
				return true;
			})
			.catch((error: Error) => {
				console.error('Error during registration:', error);
				toast.error(
					error.message && error.message !== undefined
						? error.message
						: 'An unexpected error has occurred on the server',
				);
				return false;
			});
	};

	const signUpFinish = (params: any): Promise<boolean> => {
		return dispatch(registerFinishThunk(params))
			.then((response: any) => {
				const { meta } = response;
				if (meta.rejectedWithValue) throw Error(response.payload);
				toast.success(`An error occurred during register step`);
				return true;
			})
			.catch((error: Error) => {
				console.error('Error during registration:', error);
				toast.error(
					error.message && error.message !== undefined
						? error.message
						: 'An unexpected error has occurred on the server',
				);
				return false;
			});
	};

	return {
		getUserdata,
		getAccessToken,
		isAuth,
		signInUser,
		signUpUser,
		signUpFinish,
	};
};
