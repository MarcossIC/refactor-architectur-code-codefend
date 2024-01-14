import React, { useMemo } from 'react';

interface ShowProps {
	when: boolean;
	fallBack: React.ReactNode;
	children: React.ReactNode;
}

export const Show: React.FC<ShowProps> = ({ when, fallBack, children }) => {
	const content = useMemo(() => (when ? children : fallBack), [when]);
	return <>{content}</>;
};
