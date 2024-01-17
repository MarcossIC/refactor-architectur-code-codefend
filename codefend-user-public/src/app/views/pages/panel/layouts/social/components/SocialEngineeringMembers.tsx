import React, { Dispatch, SetStateAction } from 'react';
import { ChartIcon, Show, SimpleSection } from '../../../../../components';
import { MemberV2, roleMap } from '../../../../../../data';

type MemberKey = keyof typeof roleMap;

interface SocialEngineeringMembersProps {
	isLoading: boolean;
	members: MemberV2[];
	setSocialFilters: Dispatch<
		SetStateAction<{ department: string[]; attackVectors: string[] }>
	>;
}

const SocialEngineeringMembers: React.FC<SocialEngineeringMembersProps> = (
	props,
) => {
	
	const renderMembers = () => {
		const members = props.members.reduce((acc, member: MemberV2) => {
			acc[member.member_role as MemberKey] = member;
			return acc;
		}, {} as Record<MemberKey, MemberV2>);
		
		console.log({ members });
		return members;
	};
	

	/* const handleDepartmentFilter = (e: any, member: any) => {
		const memberValue = props.members[member];
		console.log({ memberValue });
		if (memberValue == 0) return;

		props.setSocialFilters((prevState) => ({
			...prevState,
			department: [...prevState.department, member],
		}));
	};
 */

	return (
		<>
			<div className="card filtered">
				<SimpleSection header="Members by departments" icon={<ChartIcon />}>
					<div className="content filters">
						{Object.entries(renderMembers()).map(([member, value]) => (
							<div className="filter" key={member}>
								<div className="check">
									<input
										id={member}
										type="checkbox"
										onChange={(e) => {}}
										className=""
									/>
									<label htmlFor={member}>
										{roleMap[member as MemberKey] ?? 'Unknown roles'}
									</label>
								</div>
								<div className="value">
									<Show
										when={props.members.length === 0}
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
									{/* <span>{value.members.length} members</span> */}
								</div>
							</div>
						))}
					</div>
				</SimpleSection>
			</div>
		</>
	);
};

export default SocialEngineeringMembers;
