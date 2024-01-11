import React, { useEffect, useState } from 'react';
import { useAuthState, useModal, useSourceCode } from '../../../../../data';
import { SourceCodeResources } from './components/SourceCodeResources';
import { SourceCodeChart } from './components/SourceCodeChart';
import { SourceCodeCollab } from './components/SourceCodeCollab';
interface Props {}

const SourceCodePanel: React.FC<Props> = (props) => {
	const { getSource, isLoading, addSourceCode, deletedResource } =
		useSourceCode();
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
				<section className="left">
					<SourceCodeResources
						isLoading={isLoading}
						sourceCode={getSource() ?? []}
						update={(params: any) => {
							addSourceCode(params).finally(() => {
								setShowScreen(false);
								setTimeout(() => {
									setShowScreen(true);
								}, 50);
							});
						}}
						onDelete={deletedResource}
					/>
				</section>
				<section className="right">
					<SourceCodeChart
						isLoading={isLoading}
						sourceCode={getSource() ?? []}
					/>
					<button
						onClick={(e) => {
							alert('Procesing your order');
						}}
						className="btn btn-primary mt-4 w-full">
						REQUEST SCAN
					</button>
					<br />
					<SourceCodeCollab />
				</section>
			</main>
		</>
	);
};

export default SourceCodePanel;
