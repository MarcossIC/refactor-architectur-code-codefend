import React, { useCallback } from 'react';
import { ChatBoxType } from '../../../../../../data';
import {
	MessageIcon,
	PageLoader,
	MessageCard,
	ChatBox,
} from '../../../../../components';

interface Props {
	isLoading: boolean;
	selectedIssue: any;
	refetch: () => void;
}
export const IssueChatDisplay: React.FC<Props> = (props) => {
	const getIssue = useCallback(() => {
		return props.selectedIssue.cs ?? [];
	}, [props.selectedIssue]);
	return (
		<>
			<div className="card messages opacity-70 z-10 pointer-events-none animate-pulse">
				<div className="header">
					<div className="title">
						<div className="icon">
							<MessageIcon />
						</div>
						<span>customer support</span>
					</div>
				</div>

				<div className="content">
					{!props.isLoading ? (
						<>
							<div
								className={`messages-wrapper ${
									getIssue().length > 3 && 'item'
								}`}>
								{getIssue().map((message: any) => (
									<>
										<MessageCard
											body={message.issue_cs_body}
											{...message}
										/>
									</>
								))}
							</div>
						</>
					) : (
						<>
							<PageLoader />
						</>
					)}
				</div>
				<ChatBox
					type={ChatBoxType.ISSUE}
					selectedID={props.selectedIssue.id}
					onDone={props.refetch}
				/>
			</div>
		</>
	);
};
