import {
	LoginParams,
	RegisterParams,
	loginThunk,
	registerFinishThunk,
	registerThunk,
	useAppDispatch,
	useAppSelector,
} from '../';
import { toast } from 'react-toastify';

export const useAuthState = () => {
	const authState = useAppSelector((state) => state.authState);
	const dispatch = useAppDispatch();

	const getUserdata = () => authState.userData;
	const getAccessToken = () => authState.accessToken;
	const isAuth = () => authState.isAuth;

	const signInUser = (params: LoginParams): Promise<boolean> => {
		return dispatch(loginThunk(params))
			.then((response: any) => {
				const { meta } = response;
				if (meta.rejectedWithValue) throw new Error('');
				toast.success(`login successful`);
				return true;
			})
			.catch(() => {
				toast.error('An error occurred during registration.');
				return false;
			});
	};

	const signUpUser = (params: RegisterParams): Promise<boolean> => {
		return dispatch(registerThunk(params))
			.then((response: any) => {
				const { meta } = response;
				console.log({ response });
				if (meta.rejectedWithValue) {
					throw new Error('');
				}
				toast.success(`signup successful`);
				return true;
			})
			.catch((error: Error) => {
				console.error('Error during registration:', error);
				toast.error('An error occurred during registration.');
				return false;
			});
	};

	const signUpFinish = (params: any): Promise<boolean> => {
		return dispatch(registerFinishThunk(params))
			.then((response: any) => {
				const { meta } = response;
				console.log({ response });
				if (meta.rejectedWithValue) throw Error('');
				toast.success(`An error occurred during register step`);
				return true;
			})
			.catch((error: Error) => {
				console.error('Error during registration:', error);
				toast.error('An error occurred during registration.');
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
