import React, { Fragment, useCallback, useMemo, useState } from 'react';
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
	GlobeWebIcon,
	ModalTitleWrapper,
	PageLoader,
	Show,
	TrashIcon,
} from '../../../../../components';
import { useNavigate } from 'react-router';

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

	const isValidRiskScore = useCallback((riskScore: string) => {
		return riskScore && !isNaN(parseInt(riskScore));
	}, []);

	const generateVulnerabilityArray = useCallback(
		(riskScore: string) =>
			isValidRiskScore(riskScore)
				? generateIDArray(parseInt(riskScore))
				: [],
		[isValidRiskScore],
	);

	const generateLimitedArray = useCallback(
		(riskScore: string) =>
			isValidRiskScore(riskScore)
				? [...generateIDArray(Math.max(0, 5 - parseInt(riskScore)))]
				: [...generateIDArray(5)],
		[isValidRiskScore],
	);

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
			<div className="card table">
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

				<div className="columns-name">
					<div className="date">published</div>
					<div className="username">author</div>
					<div className="vul-class">class</div>
					<div className="vul-risk">risk</div>
					<div className="vul-score">score</div>
					<div className="vul-title">issue title</div>
					<div className="vul-condition">status</div>
					<div className="id">actions</div>
				</div>

				<div className="rows">
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

										<div className="vul-risk" title={issue.riskLevel}>
											{issue.riskLevel}
										</div>
										<div className="vul-score flex no-border-bottom">
											<span className="mt-2" title={issue.riskScore}>
												{issue.riskScore}
											</span>

											<span className="mr-1"></span>
											{generateVulnerabilityArray(
												issue.riskScore,
											).map((scoreKey: string) => (
												<span
													key={scoreKey}
													className="w-2 h-2 ml-0.5 mt-2 red-border rounded-full codefend-bg-red"></span>
											))}
											{generateLimitedArray(issue.riskScore).map(
												(scoreKey: string) => (
													<span
														key={scoreKey}
														className="w-2 h-2 ml-0.5 mt-2 codefend-border-red rounded-full"></span>
												),
											)}
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
			<Show when={!props.isLoading && props.issues.length === 0}>
				<EmptyCard />
			</Show>
		</>
	);
};
