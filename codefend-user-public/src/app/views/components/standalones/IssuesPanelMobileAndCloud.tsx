import React, { Fragment, useCallback, useMemo } from 'react';
import { BugIcon, EmptyCard, PageLoader, Show, SimpleSection } from '..';
import { useNavigate } from 'react-router';
import { Issues, generateIDArray } from '../../../data';
import '../../styles/table.scss';

interface Props {
	isLoading: boolean;
	issues: Issues[] | Issues;
	refetch?: () => void;
}

export const IssuesPanelMobileAndCloud: React.FC<Props> = (props) => {
	const navigate = useNavigate();
	const formatIssues = useMemo((): Issues[] => {
		if (!Array.isArray(props.issues))
			return !Boolean(Object.keys(props.issues).length)
				? []
				: [props.issues];

		return props.issues;
	}, [props.issues]);

	const isValidRiskScore = useCallback(
		(riskScore: any) => {
			return riskScore && !isNaN(parseInt(riskScore));
		},
		[props.issues],
	);

	const generateVulnerabilityArray = useCallback(
		(riskScore: any) =>
			isValidRiskScore(riskScore)
				? generateIDArray(parseInt(riskScore))
				: [],
		[isValidRiskScore],
	);

	const generateLimitedArray = useCallback(
		(riskScore: any) =>
			isValidRiskScore(riskScore)
				? [...generateIDArray(Math.max(0, 5 - riskScore))]
				: [...generateIDArray(5)],
		[isValidRiskScore],
	);

	const issuesKeys = useCallback(
		() =>
			formatIssues.length !== 0 ? generateIDArray(formatIssues.length) : [],
		[formatIssues],
	);

	console.log({ formatIssues });

	return (
		<SimpleSection
			header="Resource related vulnerabilities & records"
			icon={<BugIcon />}>
			<>
				<div className="columns-name">
					<div
						className="date codefend-text-red "
						style={{ textDecoration: 'underline' }}>
						published
					</div>
					<div className="username">author</div>
					<div className="vul-class">class</div>
					<div className="vul-risk">risk</div>
					<div className="vul-score">score</div>
					<div className="vul-title">issue title</div>
				</div>

				<Show when={!props.isLoading} fallback={<PageLoader />}>
					<div className="rows">
						{formatIssues.map((vulnerability: Issues, i: number) => (
							<Fragment key={issuesKeys()[i]}>
								<div
									className="item"
									onClick={(e: React.FormEvent) => {
										e.preventDefault();
										e.stopPropagation();
										navigate(`/issues/update/${vulnerability.id}`);
									}}>
									<div className="date">{vulnerability.createdAt}</div>
									<div className="username">
										{vulnerability.researcherUsername}
									</div>
									<div className="vul-class">
										{vulnerability.resourceClass}
									</div>
									<div className="vul-risk">
										{vulnerability.riskLevel}
									</div>
									<div className="vul-score flex no-border-bottom">
										<span className="risk-score">
											{vulnerability.riskScore}
										</span>
										<span className="space"></span>
										{generateVulnerabilityArray(
											vulnerability.riskScore,
										).map((value) => (
											<Fragment key={value}>
												<span className="red-border codefend-bg-red risk-score-helper"></span>
											</Fragment>
										))}
										{generateLimitedArray(
											vulnerability.riskScore,
										).map((value) => (
											<Fragment key={value}>
												<span className="codefend-border-red risk-score-helper"></span>
											</Fragment>
										))}
									</div>
									<div className="vul-title">{vulnerability.name}</div>
								</div>
							</Fragment>
						))}
					</div>
				</Show>
				<Show when={!props.isLoading && !Boolean(formatIssues.length)}>
					<EmptyCard />
				</Show>
			</>
		</SimpleSection>
	);
};
