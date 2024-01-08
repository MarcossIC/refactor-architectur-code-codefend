import { useState } from 'react';

export const useModal = () => {
	const [showModal, setShowModal] = useState<boolean | null>(null);
	const [showModalStr, setShowModalStr] = useState<string | null>(null);

	return { showModal, setShowModal, showModalStr, setShowModalStr };
};
