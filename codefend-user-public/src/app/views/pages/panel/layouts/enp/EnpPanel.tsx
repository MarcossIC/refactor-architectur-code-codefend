import { EmptyScreenView } from '../../../../components';
import React from 'react';

interface Props {}

export const EnpPanel: React.FC<Props> = (props) => {
	return (
		<>
			<EmptyScreenView
				buttonText="Add Enp"
				title={"There's no data to display here"}
				info={'Start by clicking on the button below'}
				event={() => {}}
			/>
		</>
	);
};

export default EnpPanel;
