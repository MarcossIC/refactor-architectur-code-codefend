import { useModal, useSourceCode } from '../../../../../data';
import { EmptyScreenView } from '../../../../components';
import React, { useEffect, useState } from 'react';

interface Props {}

export const EnpPanel: React.FC<Props> = (props) => {
	const { getSource, isLoading } = useSourceCode();
	const { showModal, showModalStr, setShowModal, setShowModalStr } =
		useModal();
	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowScreen(true);
		}, 50);
	});

	return (
		<>
			<main className={`source-code ${showScreen ? 'actived' : ''}`}>
				<section className="left"></section>
				<section className="right">
					<button
						onClick={(e) => {
							alert('Procesing your order');
						}}
						className="btn btn-primary">
						REQUEST SCAN
					</button>
					<br />
				</section>
			</main>
		</>
	);
};

export default EnpPanel;
