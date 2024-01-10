import { EmptyScreenView } from '../../../../components';
import React from 'react';

interface Props {}

const SnsPanel: React.FC<Props> = (props) => {
	return (
		<>
			<EmptyScreenView
				buttonText="Add sns"
				title={"There's no data to display here"}
				info={'Start by clicking on the button below'}
				event={() => {}}
			/>
		</>
	);
};

export default SnsPanel;
