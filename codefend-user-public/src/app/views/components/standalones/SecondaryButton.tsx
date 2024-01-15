import React from 'react';

interface SecondaryButtonProps {
	click: (e: React.FormEvent<HTMLButtonElement>) => void;
	isDisabled?: boolean;
	text: string;
}

// million-ignore
export const SecondaryButton = (props: SecondaryButtonProps) => {
	return (
		<button
			type="button"
			onClick={props.click}
			disabled={props.isDisabled}
			className="log-inputs btn btn-secondary  btn-cancel codefend_secondary_ac">
			{props.text}
		</button>
	);
};
