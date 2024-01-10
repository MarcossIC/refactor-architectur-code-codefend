import React, { Fragment, useCallback, useMemo } from 'react';
import { BugIcon, EmptyCard, PageLoader } from '../../../components';
import { useNavigate } from 'react-router';
import { formatDate, generateIDArray } from '../../../../data';
import '../../../styles/table.scss';

interface Props {
	isLoading: boolean;
	issues: any;
}

export const IssuesPanelMobileAndCloud: React.FC<Props> = (props) => {
	const navigate = useNavigate();
	const formatIssues = useMemo(() => {
		if (props.issues.constructor !== Array) return [props.issues];
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
			isValidRiskScore(riskScore) ? [...Array(parseInt(riskScore))] : [],
		[isValidRiskScore],
	);

	const generateLimitedArray = useCallback(
		(riskScore: any) =>
			isValidRiskScore(riskScore)
				? [...generateIDArray(Math.max(0, 5 - riskScore))]
				: [...generateIDArray(5)],
		[isValidRiskScore],
	);

	const issuesKeys = useMemo(
		() =>
			formatIssues && formatIssues.length !== 0
				? generateIDArray(formatIssues.length)
				: [],
		[formatIssues],
	);

	return (
		<>
			<div className="header">
				<div className="title">
					<div className="icon">
						<BugIcon />
					</div>
					<span>resource related vulnerabilities & records</span>
				</div>
				<div className="actions"></div>
			</div>

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

			{!props.isLoading ? (
				<div className="rows">
					{formatIssues.map((vulnerability: any, index: number) => (
						<Fragment key={issuesKeys[index]}>
							<div
								className="item"
								onClick={(e: React.FormEvent) => {
									navigate(
										`/issues/${vulnerability.id}_${vulnerability.name}_${vulnerability.risk_level}`,
									);
									e.preventDefault();
									e.stopPropagation();
								}}>
								<div className="date">
									{formatDate(vulnerability.creacion)}
								</div>
								<div className="username">
									{vulnerability.researcher_username}
								</div>
								<div className="vul-class">
									{vulnerability.resource_class}
								</div>
								<div className="vul-risk">
									{vulnerability.risk_level}
								</div>
								<div className="vul-score flex no-border-bottom">
									<span className="risk-score">
										{vulnerability.risk_score}
									</span>
									<span className="space"></span>
									{generateVulnerabilityArray(
										vulnerability.risk_score,
									).map((value) => (
										<Fragment key={value}>
											<span className="red-border codefend-bg-red risk-score-helper"></span>
										</Fragment>
									))}
									{generateLimitedArray(
										vulnerability.risk_score,
									).map((value) => (
										<Fragment key={value}>
											<span className="codefend-border-red risk-score-helper"></span>
										</Fragment>
									))}
								</div>
								<div className="vul-title">
									{vulnerability.name}
								</div>
							</div>
						</Fragment>
					))}
				</div>
			) : (
				<>
					<PageLoader />
				</>
			)}

			{(!props.isLoading && formatIssues.length === 0) ?? (
				<>
					<EmptyCard />
				</>
			)}
		</>
	);
};
