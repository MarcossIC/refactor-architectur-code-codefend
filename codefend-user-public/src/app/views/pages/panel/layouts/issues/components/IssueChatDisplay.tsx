import React, { useCallback } from 'react';
import { ChatBoxType, CompleteIssue } from '../../../../../../data';
import {
	MessageIcon,
	PageLoader,
	MessageCard,
	ChatBox,
	Show,
	SimpleSection,
} from '../../../../../components';

interface Props {
	isLoading: boolean;
	selectedIssue: CompleteIssue | null;
	refetch: () => void;
}
export const IssueChatDisplay: React.FC<Props> = ({
	isLoading,
	selectedIssue,
	refetch,
}) => {
	const getIssue = useCallback(() => {
		return selectedIssue?.cs ?? [];
	}, [selectedIssue]);
	return (
		<div className="card messages">
			<SimpleSection header="Customer support" icon={<MessageIcon />}>
				<>
					<div className="content">
						<Show when={!isLoading} fallback={<PageLoader />}>
							<>
								<div
									className={`messages-wrapper ${
										getIssue().length > 3 && 'item'
									}`}>
									{getIssue().map((message: any) => (
										<>
											<MessageCard
												body={message.body}
												{...message}
											/>
										</>
									))}
								</div>
							</>
						</Show>
					</div>
					<ChatBox
						type={ChatBoxType.ISSUE}
						selectedID={selectedIssue?.id ?? ''}
						onDone={refetch}
					/>
				</>
			</SimpleSection>
		</div>
	);
};
