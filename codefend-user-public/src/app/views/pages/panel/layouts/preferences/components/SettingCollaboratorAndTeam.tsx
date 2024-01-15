import { EmptyCard, PageLoader } from '../../../../../components';
import { CompanyInfo, Member } from '../../../../../../data';
import React from 'react';

interface CollaboratorDataProps {
	isLoading: boolean;
	members: CompanyInfo[]; 
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
						<div
						// onClick={() => {
						//   setShowModal(!showModal());
						//   setShowModalStr("add_member");
						// }}
						>
							ADD NEW MEMBER
						</div>
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
					{!props.isLoading ? (
						props.members.map((member: CompanyInfo) => (
							<div key={member.id} className="item">
								<div className="id">{member.id}</div>
								<div className="full-name">{`${member.owner_fname} ${member.owner_lname}`}</div>
								<div className="email">{member.owner_email}</div>
								<div className="phone">
									{member.owner_phone ? `+${member.owner_phone}` : '-'}
								</div>
								<div className="role">{member.owner_role}</div>
							</div>
						))
					) : (
						<PageLoader />
					)}
				</div>
			</div>
			{!props.isLoading && props.members.length === 0 && <EmptyCard />}
		</>
	);
};

export default SettingCollaboratorAndTeam;
