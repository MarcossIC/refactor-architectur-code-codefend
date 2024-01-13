import { EmptyCard, PageLoader } from 'app/views/components';
import React from 'react';

interface CollaboratorDataProps {
	isLoading: boolean;
	members: any[];
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
						props.members.map((member: any) => (
							<div key={member.id} className="item">
								<div className="id">{member.id}</div>
								<div className="full-name">{`${member.fname} ${member.lname}`}</div>
								<div className="email">{member.email}</div>
								<div className="phone">
									{member.phone ? `+${member.phone}` : '-'}
								</div>
								<div className="role">{member.role}</div>
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
