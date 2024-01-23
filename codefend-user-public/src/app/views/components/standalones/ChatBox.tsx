import React, { useEffect, useRef } from 'react';
import { MessageIcon, PrimaryButton, SendIcon } from '..';
import { useChatbox, ChatBoxType } from '../../../data';

interface Props {
	type: ChatBoxType;
	onDone: () => void;
	selectedID: string;
}

export const ChatBox: React.FC<Props> = (props) => {
	const {
		message,
		setMessage,
		isAdding,
		handleIssueSubmit,
		handleSupportSubmit,
	} = useChatbox();

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (props.type === ChatBoxType.ISSUE) {
			handleIssueSubmit(props.selectedID, props.onDone);
		} else {
			handleSupportSubmit(props.selectedID, props.onDone);
		}
	};

	useEffect(() => {
		if (!textAreaRef.current) return;

		const handleEnter = (e: any) => {
			if (!Boolean(e.target.value.trim())) return;

			if (e.key === 'Enter') {
				handleSubmit(e);
			}
		};
		textAreaRef.current.addEventListener('keypress', handleEnter);
		return () => {
			textAreaRef.current?.removeEventListener('keypress', handleEnter);
		};
	}, []);

	return (
		<div className="sender">
			<div className="header">
				<div className="title">
					<div className="icon">
						<MessageIcon />
					</div>
					<span>Add new entry</span>
				</div>
				<PrimaryButton
					text={<SendIcon />}
					isDisabled={isAdding && !message}
					click={handleSubmit}
					className="no-border-height w-14 h-full items-center justify-center"
				/>
			</div>

			<div className="flex h-36 py-8 gap-x-9 px-6">
				<div className="flex text-format  h-10 w-10  no-border-bottom">
					<img src="/codefend/user-icon-gray.svg" alt="user-picture" />
				</div>
				<div className="no-border-bottom flex-grow">
					<textarea
						ref={textAreaRef}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="add a new comment here..."
						name="textArea"
						className="w-full h-full outline-none bg-transparent resize-none"
						required></textarea>
				</div>
			</div>
		</div>
	);
};
