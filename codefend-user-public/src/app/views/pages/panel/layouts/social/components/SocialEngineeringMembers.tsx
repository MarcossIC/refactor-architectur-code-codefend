import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
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
	{members, setSocialFilters},
) => {

	const renderMembersByRole = () => {
    const membersByRole = members.reduce((acc: Record<string, number>, member) => {
      const role = member.member_role as MemberKey;
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {} as Record<MemberKey, number>);

    return membersByRole;
  };
	
	const handleDepartmentFilter = (e: any, memberId: string) => {
		const member = members.find((m) => m.id === memberId);
		console.log({ member });
		if (!member) return;
	
		setSocialFilters((prevState: any) => ({
			...prevState,
			department: [...prevState.department, member],
		}));
	}; 

	return (
		<>
			<div className="card filtered">
				<SimpleSection header="Members by departments" icon={<ChartIcon />}>
					<div className="content filters">
						{Object.entries(renderMembersByRole()).map(([member, value]) => (
							<div className="filter" key={member}>
								<div className="check">
									<input
										id={member}
										type="checkbox"
										onChange={(e) => handleDepartmentFilter(e, member)}
										className=""
									/>
									<label htmlFor={member}>
										{roleMap[member as MemberKey] ?? 'Unknown roles'}
									</label>
								</div>
								<div className="value">
									<Show
										when={members.length === 0}
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
									<span>{members.length} members</span> 
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