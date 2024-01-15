import { EmptyCard, PageLoader, Show } from '../../../../../components';
import { Company, CompanyInfo, Member } from '../../../../../../data';
import React from 'react';

interface CollaboratorDataProps {
	isLoading: boolean;
	members: Company[];
}

const SettingCollaboratorAndTeam: React.FC<CollaboratorDataProps> = (props) => {
	return (
		<>
			<div className="card table">
				<div className="header">
					<div className="title">
						<div className="icon">{/* <HiSolidUserGroup /> */}</div>
						<span>COLLABORATORS AND TEAM MEMBERS</span>
					</div>
					<div className="actions">
						<div>ADD NEW MEMBER</div>
					</div>
				</div>

				<div className="columns-name">
					<div className="id">id</div>
					<div className="full-name">full name</div>
					<div className="email">email</div>
					<div className="phone">phone</div>
					<div className="role">role</div>
				</div>

				<div className="rows">
					<Show when={!props.isLoading} fallback={<PageLoader />}>
						<>
							{props.members.map((member: Company) => (
								<div key={member.id} className="item">
									<div className="id">{member.id}</div>
									<div className="full-name">{`${member.ownerName} ${member.ownerLastname}`}</div>
									<div className="email">{member.ownerName}</div>
									<div className="phone">
										<Show
											when={Boolean(member.ownerPhone)}
											fallback={<>-</>}>
											<>+${member.ownerPhone}</>
										</Show>
									</div>
									<div className="role">{member.ownerRole}</div>
								</div>
							))}
						</>
					</Show>
				</div>
			</div>
			<Show when={!props.isLoading && props.members.length === 0}>
				<EmptyCard />
			</Show>
		</>
	);
};

export default SettingCollaboratorAndTeam;
