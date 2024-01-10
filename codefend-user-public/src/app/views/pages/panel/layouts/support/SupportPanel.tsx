import { EmptyScreenView } from '../../../../components';
import React from 'react';

interface Props {}

const SupportPanel: React.FC<Props> = (props) => {
	return (
		<>
			<EmptyScreenView
				buttonText="Add Customer Support"
				title={"There's no data to display here"}
				info={'Start by clicking on the button below'}
				event={() => {}}
			/>
		</>
	);
};

export default SupportPanel;
