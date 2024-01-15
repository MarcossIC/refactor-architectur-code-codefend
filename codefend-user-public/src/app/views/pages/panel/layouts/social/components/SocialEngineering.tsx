import {
	EmptyCard,
	ModalWrapper,
	PageLoader,
} from '../../../../../../views/components';

import { Member, roleMap, useModal } from '../../../../../../data';
import AddSocialModal from '../../../../../components/modals/AddSocialModal';

interface SocialProps{
  refetch: () => void,
  isLoading: boolean,
  socials: Member[];
}

const SocialEngineering: React.FC<SocialProps> = (props) => {
	const { showModal, setShowModal, setShowModalStr, showModalStr } =
		useModal();

	type DepartmentMappingKey = keyof typeof roleMap;

	const mapRole = (role: DepartmentMappingKey) =>
		roleMap[role] || 'Unknown Role';

	return (
		<>
			{showModal && showModalStr === 'add_member' && (
				<ModalWrapper>
					<div className="w-full w-96 internal-tables disable-border">
						<div className="modal-header">
							{/* <HiOutlineBars3BottomLeft className="text-lg mr-2 text-fend-red" /> */}
							<span className="text-sm">Add a new member</span>
						</div>
						<AddSocialModal
							onDone={() => {
								props.refetch();
							}}
						/>
						<div className="container flex items-center justify-center  mx-auto p-3 text-format"></div>
					</div>
				</ModalWrapper>
			)}

			<div className="card table flex-grow">
				<div className="header">
					<div className="title">
						<div className="icon">{/* <FaSolidPeopleGroup /> */}</div>
						<span>Social Engineering</span>
					</div>
					<div className="actions">
						<div
							onClick={() => {
								setShowModal(!showModal);
								setShowModalStr('add_member');
							}}>
							Add profile
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

				{!props.isLoading ? (
					<div className="rows">
						{props.socials
							.slice()
							.reverse()
							.map((social: Member) => (
								<div key={social.id} className="item">
									<div className="id">{social.id}</div>
									<div className="full-name">
										{social.member_fname} {social.member_lname}
									</div>
									<div className="email">{social.member_email}</div>
									<div className="phone">{social.member_phone}</div>
							{/* 		<div className="role">
										{mapRole(social.member_role)}
									</div> */}
								</div>
							))}
					</div>
				) : (
					<PageLoader />
				)}
			</div>

			{!props.isLoading && props.socials.length === 0 ? (
				<EmptyCard />
			) : null}
		</>
	);
};

export default SocialEngineering;
