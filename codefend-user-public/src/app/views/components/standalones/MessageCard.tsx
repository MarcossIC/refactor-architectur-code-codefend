import { formatDate, useAuthState } from '../../../data';
import { isUserChat } from '../../../data/utils/compute';
import React from 'react';

interface Props {
	selectedID: string;
	body: any;
	username: string;
	createdAt: string;
}

export const MessageCard: React.FC<Props> = (props) => {
	const { getUserdata } = useAuthState();
	const isAuthUserChat = isUserChat(props.selectedID, getUserdata());

	const title = `${isAuthUserChat ? 'You' : 'The operator'} ${
		props.username ? `@${props.username}` : ''
	} wrote on ${formatDate(props.createdAt)}`;
	const message = props.body ?? '';

	return (
		<>
			<div className="flex flex-col">
				<span className="pt-4 pb-3 px-4 border-b">{title}</span>
				<div className="flex flex-row items-center gap-x-8 p-6 tt">
					<div className="rounded-full">
						<img
							src={`/codefend/user-icon${
								isAuthUserChat ? '-gray' : ''
							}.svg`}
							className="w-10 h-10"
							alt="user-picture"
						/>
					</div>
					<p>{message}</p>
				</div>
			</div>
		</>
	);
};
