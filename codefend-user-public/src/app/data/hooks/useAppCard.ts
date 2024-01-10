import { useCallback, useEffect, useMemo } from 'react';
import { MobileService, useModal } from '..';
import { toast } from 'react-toastify';

interface HookProps {
	type?: string;
	name: string;
	isMainNetwork?: string | boolean;
	showDetails?: boolean;
	appMedia?: string;
}

export const useAppCard = (props: HookProps) => {
	const isMainGoogleNetwork = useMemo(
		() => Boolean(props.isMainNetwork),
		[props.isMainNetwork],
	);

	const isDetails = useMemo(
		() => Boolean(props.showDetails),
		[props.showDetails],
	);
	const isMobileType = useMemo(() => props.type === 'mobile', [props.type]);
	const isImage = useMemo(
		() => props.appMedia && props.appMedia !== undefined,
		[props.appMedia],
	);
	const deleteText = useMemo(
		() => (isMobileType ? 'delete mobile' : 'delete cloud'),
		[isMobileType],
	);
	useEffect(() => {
		setShowModalStr(deleteText);
	}, [deleteText]);

	const { showModal, setShowModal, showModalStr, setShowModalStr } =
		useModal();

	const handleDelete = useCallback(() => {
		const action = isMobileType ? MobileService : MobileService;

		action
			.deleteApp()
			.then(() => {
				toast.success(
					`successfully deleted ${
						isMobileType ? 'mobile app' : 'cloud'
					} `,
				);
			})
			.catch(() => {
				toast.error('An unexpected error has occurred on the server');
			})
			.finally(() => {
				viewModal(false);
			});
	}, []);

	const viewModal = useCallback((state: boolean) => {
		setShowModal(state);
	}, []);

	return {
		showModal,
		showModalStr,
		viewModal,
		isMobileType,
		isImage,
		isDetails,
	};
};
