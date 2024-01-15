import React, { Dispatch, SetStateAction } from 'react';
import { ChartIcon, Show, SimpleSection } from '../../../../../components';
import { roleMap } from '../../../../../../data';

type MemberKey = keyof typeof roleMap;

interface SocialEngineeringMembersProps {
	isLoading: boolean;
	members: {
		[key: string]: number;
	};
	setSocialFilters: Dispatch<
		SetStateAction<{ department: string[]; attackVectors: string[] }>
	>;
}

const SocialEngineeringMembers: React.FC<SocialEngineeringMembersProps> = (
	props,
) => {
	const renderMembers = () => {
		const { total, ...members } = props.members;
		console.log({ members });
		return { members };
	};

	const handleDepartmentFilter = (e: any, member: any) => {
		const memberValue = props.members[member];
		console.log({ memberValue });
		if (memberValue == 0) return;

		props.setSocialFilters((prevState) => ({
			...prevState,
			department: [...prevState.department, member],
		}));
	};

	return (
		<>
			<div className="card filtered">
				<SimpleSection header="Members by departments" icon={<ChartIcon />}>
					<div className="content filters">
						{Object.keys(renderMembers().members).map(
							(member: string) => (
								<div className="filter" key={member}>
									<div className="check">
										<input
											id={member}
											type="checkbox"
											disabled={props.members[member] == 0}
											onChange={(e) =>
												handleDepartmentFilter(e, member)
											}
											className=""
										/>
										<label htmlFor={member}>
											{roleMap[member as MemberKey] ??
												'Unknown roles'}
										</label>
									</div>

									<div className="value">
										<Show
											when={props.members[member] == 0}
											fallback={
												<img
													src="/codefend/people-active-icon.svg"
													alt="bug-icon"
												/>
											}>
											<img
												src="/codefend/people-inactive-icon.svg"
												alt="bug-icon"
											/>
										</Show>
										<span>{props.members[member]} members</span>
									</div>
								</div>
							),
						)}
					</div>
				</SimpleSection>
			</div>
		</>
	);
};

export default SocialEngineeringMembers;
