import {
	EmptyCard,
	ModalTitleWrapper,
	ModalWrapper,
	PageLoader,
	PeopleGroup,
	Show,
} from '../../../../../../views/components';

import {
	Member,
	MemberV2,
	SuperMember,
	roleMap,
	useModal,
} from '../../../../../../data';
import AddSocialModal from '../../../../../components/modals/AddSocialModal';
import { useMemo } from 'react';

interface SocialProps {
	refetch: () => void;
	isLoading: boolean;
	socials: MemberV2[];
}

const SocialEngineering: React.FC<SocialProps> = (props) => {
	const { showModal, setShowModal, setShowModalStr, showModalStr } =
		useModal();

	type DepartmentMappingKey = keyof typeof roleMap;

	const mapRole = (role: DepartmentMappingKey) =>
		roleMap[role] || 'Unknown Role';

	const safelyPreviousSearches = () =>
		Array.isArray(props.socials) ? props.socials.slice().reverse() : [];

	return (
		<>
			<ModalTitleWrapper
				isActive={showModal && showModalStr === 'add_member'}
				close={() => setShowModal(false)}
				headerTitle="Add a new member">
				<AddSocialModal
					onDone={() => {
						props.refetch();
						setShowModal(false);
					}}
					close={() => setShowModal(false)}
				/>
			</ModalTitleWrapper>

			<div className="card table flex-grow">
				<div className="header">
					<div className="title">
						<div className="icon">
							<PeopleGroup />
						</div>
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
				<Show when={!props.isLoading} fallback={<PageLoader />}>
					<div className="rows">
						{safelyPreviousSearches().map((social: MemberV2) => (
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
				</Show>
			</div>
			<Show when={!props.isLoading && props.socials.length === 0}>
				<EmptyCard />
			</Show>
		</>
	);
};

export default SocialEngineering;
