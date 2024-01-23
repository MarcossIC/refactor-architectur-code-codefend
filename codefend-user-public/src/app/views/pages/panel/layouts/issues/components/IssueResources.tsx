import React, { Fragment, useMemo, useState } from 'react';
import {
	Issues,
	generateIDArray,
	useDeleteIssue,
	useModal,
} from '../../../../../../data';
import {
	BugIcon,
	ConfirmModal,
	EmptyCard,
	ModalTitleWrapper,
	PageLoader,
	RiskScore,
	Show,
	TableV2,
	TrashIcon,
} from '../../../../../components';
import { useNavigate } from 'react-router';
import '../../../../../components/Table/table.scss';

interface Props {
	isLoading: boolean;
	issues: Issues[];
	refresh: () => void;
}

export const IssueResources: React.FC<Props> = (props) => {
	const [selected, setSelectedId] = useState('');
	const { showModal, setShowModal } = useModal();
	const { handleDelete } = useDeleteIssue();
	const navigate = useNavigate();

	const issuesKeys = useMemo(
		() => (props.issues ? generateIDArray(props.issues.length) : []),
		[props.issues],
	);

	const dataTable = props.issues.map((issue: Issues) => ({
		published: { value: issue.createdAt, style: 'date' },
		author: { value: issue.researcherUsername, style: 'username' },
		type: { value: issue.resourceClass, style: 'vul-class' },
		risk: { value: issue.riskLevel, style: 'vul-risk' },
		score: {
			value: <RiskScore riskScore={issue.riskScore} />,
			style: 'vul-score',
		},
		issueTitle: { value: issue.name, style: 'vul-title' },
		status: { value: issue.condition, style: 'vul-title' },
		action: { value: 'actions', style: 'date' },
	}));
	const actionTable = {
		icon: <TrashIcon />,
		style: 'trash',
		action: (id: string) => {
			setSelectedId(id);
			setShowModal(!showModal);
		},
	};

	return (
		<>
			<ModalTitleWrapper
				headerTitle="Delete issue"
				isActive={showModal}
				close={() => setShowModal(!showModal)}>
				<ConfirmModal
					cancelText="Cancel"
					confirmText="Delete"
					header=""
					close={() => setShowModal(false)}
					action={() => {
						handleDelete(selected)?.then(() => {
							setShowModal(false);
							props.refresh();
						});
					}}
				/>
			</ModalTitleWrapper>
			<div className="card">
				<div className="header">
					<div className="title">
						<div className="icon">
							<BugIcon />
						</div>
						<span>Issues</span>
					</div>
					<div className="actions">
						<div
							className=""
							onClick={() => {
								navigate('/issues/create');
							}}>
							Add finding
						</div>
					</div>
				</div>

				<div className="table flex-grow max-h-[40dvh]">
					<div className="columns-name">
						<div className="date">published</div>
						<div className="username">author</div>
						<div className="vul-class">class</div>
						<div className="vul-risk">risk</div>
						<div className="vul-score">score</div>
						<div className="vul-title">issue title</div>
						<div className="vul-condition flex">status</div>
						<div className="id flex justify-center">actions</div>
					</div>

					<div className="rows max-h-[30dvh] overflow-auto">
						<Show when={!props.isLoading} fallback={<PageLoader />}>
							<>
								{props.issues.map((issue: Issues, i: number) => (
									<Fragment key={issuesKeys[i]}>
										<div
											className="item"
											onClick={(e: React.FormEvent) => {
												navigate(`/issues/update/${issue.id}`);
												e.preventDefault();
												e.stopPropagation();
											}}>
											<div className="date" title={issue.createdAt}>
												{issue.createdAt}
											</div>

											<div
												className="username"
												title={issue.researcherUsername}>
												{issue.researcherUsername}
											</div>
											<div
												className="vul-class"
												title={issue.resourceClass}>
												{issue.resourceClass}
											</div>

											<div
												className="vul-risk"
												title={issue.riskLevel}>
												{issue.riskLevel}
											</div>
											<div className="vul-score flex no-border-bottom">
												<RiskScore riskScore={issue.riskScore} />
											</div>
											<div className="vul-title" title={issue.name}>
												{issue.name}
											</div>
											<div
												className="vul-condition"
												title={issue.condition}>
												{issue.condition}
											</div>
											<div className="trash">
												<TrashIcon
													action={(e: React.FormEvent) => {
														e.preventDefault();
														e.stopPropagation();
														setSelectedId(issue.id);
														setShowModal(!showModal);
													}}
												/>
											</div>
										</div>
									</Fragment>
								))}
							</>
						</Show>
					</div>
				</div>
			</div>
			<Show when={!props.isLoading && props.issues.length === 0}>
				<EmptyCard />
			</Show>
		</>
	);
};
