import React, { Fragment, useMemo } from 'react';

import { ModalWrapper, ChartIcon, EmptyCard } from '../../../components';
import { CloudQuickAction } from './CloudQuickAction';

import '../../../styles/card.scss';
import { TestingCredentialCard } from './TestingCredentialCard';
import { generateIDArray } from '../../../../data';

interface ProvidedTestingCredentialsProps {
	refetch?: () => void;
	isLoading: boolean;
	credentials: any;
}

export const ProvidedTestingCredentials: React.FC<
	ProvidedTestingCredentialsProps
> = (props) => {
	const credentialKey = useMemo(
		() => generateIDArray(props.credentials.length),
		[props.credentials.length],
	);

	return (
		<>{/* 
			{props.isLoading ?? (
				<>
					<ModalWrapper action={props}>
						<div className="quick-action internal-tables disable-border">
							<div className="modal-header">
								|<span>{' Add cloud actions '}</span>|
							</div>

							<CloudQuickAction
								onDone={() => props.refetch?.()}
							/>

							<div className="helper-box"></div>
						</div>
					</ModalWrapper>
				</>
			)} */}

			<div className="card user-list">
				<div className="header">
					<div className="title">
						<div className="icon">
							<ChartIcon />
						</div>
						<span>provided testing credentials</span>
					</div>
				</div>

				<div className="list">
					{props.credentials.map((cred: any, index: number) => (
						<Fragment key={credentialKey[index]}>
							<TestingCredentialCard
								{...cred}
								hideBorderBottom={
									props.credentials.legth - 1 === index
								}
							/>
						</Fragment>
					))}
				</div>
			</div>
			{(!props.isLoading && props.credentials.legth === 0) ?? (
				<EmptyCard />
			)}
		</>
	
)};
