import { useCallback, useState } from 'react';
import { IssueService, useAuthState } from '..';
import { CustomerService } from '../services/support.service';

export const useChatbox = () => {
	const [message, setMessage] = useState('');
	const [isAdding, setIsAdding] = useState(false);
	const { getUserdata } = useAuthState();

	const handleIssueSubmit = (selectedID: string, onDone: () => void) => {
		setIsAdding(true);

		const requestParams = {
			issue_cs_body: message,
			issue_id: selectedID,
		};
		const companyID = getUserdata()?.companyID;
		IssueService.addCSMessage(requestParams, companyID)
			.then((response: any) => {
				setMessage('');
				onDone();
			})
			.finally(() => {
				setIsAdding(false);
			});
	};

	const handleSupportSubmit = (selectedID: string, onDone: () => void) => {
		const params = {
			cs_body: message,
			dad_id: selectedID,
		};
		const companyID = getUserdata()?.companyID;
		const userID = getUserdata()?.userID;
		CustomerService.add(params, companyID, userID)
			.then((response: any) => {
				setMessage('');
				onDone();
			})
			.finally(() => {
				setIsAdding(false);
			});
	};

	return {
		message,
		setMessage,
		isAdding,
		handleIssueSubmit,
		handleSupportSubmit,
	};
};
