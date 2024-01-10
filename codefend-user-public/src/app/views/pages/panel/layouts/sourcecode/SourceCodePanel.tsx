import { EmptyScreenView } from '../../../../components';
import React from 'react';

interface Props {}

const SourceCodePanel: React.FC<Props> = (props) => {
	return (
		<>
			<EmptyScreenView
				buttonText="Add Source code"
				title={"There's no data to display here"}
				info={'Start by clicking on the button below'}
				event={() => {}}
			/>
		</>
	);
};

export default SourceCodePanel;
