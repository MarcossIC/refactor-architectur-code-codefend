import { useEffect, useMemo, useState } from 'react';
import {
	Member,
	MemberV2,
	MetricsService,
	useSocial,
} from '../../../../../data';
import SocialAttackVectors from './components/SocialAttackVectors';
import SocialEngineering from './components/SocialEngineering';
import SocialEngineeringMembers, {
	Filter,
} from './components/SocialEngineeringMembers';

const SocialEngineeringView = () => {
	const { members, refetch, loading } = useSocial();
	const [showScreen, setShowScreen] = useState(false);

	const [socialFilters, setSocialFilters] = useState({
		department: [] as string[],
		attackVectors: [] as string[],
	});

	useEffect(() => {
		refetch();
		setShowScreen(false);
		setTimeout(() => {
			setShowScreen(true);
		}, 50);
	}, []);

	const socialInfoData = () => {
		const socialData = loading ? [] : members;
		return socialData ?? [];
	};

	const handleFilter = () => {
		const selectedFilters = socialFilters.department.map((id) => id.toLowerCase());
	
		const socialDataList: MemberV2[] | undefined = socialInfoData();
	
		if (!socialDataList) {
			return { filteredData: [] as MemberV2[], isFiltered: false };
		}
	
		const filteredData = socialDataList.filter((datum: MemberV2) =>
			selectedFilters.includes(datum.member_role.toLowerCase()),
		);
	
		return { filteredData, isFiltered: selectedFilters.length !== 0 };
	};
	

	return (
		<>
			<main className={`social ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<SocialEngineering
						refetch={refetch}
						isLoading={loading}
						socials={
							handleFilter().isFiltered
								? handleFilter().filteredData
								: socialInfoData() ?? []
						}
					/>
				</section>
				<section className="right">
					<SocialEngineeringMembers
						isLoading={loading}
						members={members ?? []}
						setSocialFilters={setSocialFilters}
					/>
					<SocialAttackVectors />
				</section>
			</main>
		</>
	);
};

export default SocialEngineeringView;
