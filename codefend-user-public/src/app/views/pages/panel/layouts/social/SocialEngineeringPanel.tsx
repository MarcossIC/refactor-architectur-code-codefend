import { useEffect, useState } from 'react';
import {
	Member,
	MemberV2,
	MetricsService,
	useSocial,
} from '../../../../../data';
import SocialAttackVectors from './components/SocialAttackVectors';
import SocialEngineering from './components/SocialEngineering';
import SocialEngineeringMembers from './components/SocialEngineeringMembers';

const SocialEngineeringView = () => {
	const { members, refetch, loading } = useSocial();
	const [showScreen, setShowScreen] = useState(false);

	const [social, setSocial] = useState({
		loading: true,
		data: null,
	});

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
		const socialData = social.loading ? [] : social.data;
		return socialData ?? [];
	};

	const handleFilter = () => {
		const filterArray = Object.entries(socialFilters.department);
		if (filterArray.length === 0)
			return { filteredData: [], isFiltered: false };
		const selectedFilters = filterArray.reduce(
			(acc: string[], [key, value]) => {
				if (value) acc.push(key.toLowerCase());
				return acc;
			},
			[],
		);

		const socialDataList: Member[] | undefined = socialInfoData() ?? [];

		if (!socialDataList) {
			return { filteredData: [], isFiltered: false };
		}

		const filteredData = socialDataList.filter((datum: any) =>
			selectedFilters.includes(datum.member_role.toLowerCase()),
		);

		return { filteredData, isFiltered: selectedFilters.length !== 0 };
	};

	const selectedFilters = handleFilter().filteredData.reduce(
		(acc: string[], [key, value]: any) => {
			if (value) acc.push(key.toLowerCase());
			return acc;
		},
		[],
	);
	const { computedRoles } = MetricsService;

	return (
		<>
			<main className={`social ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<SocialEngineering
						refetch={refetch}
						isLoading={loading}
						socials={members!}
					/>
				</section>
				<section className="right">
					<SocialEngineeringMembers
						isLoading={social.loading}
						members={computedRoles(socialInfoData() as MemberV2[]) ?? []}
						setSocialFilters={setSocialFilters}
					/>
					<SocialAttackVectors />
				</section>
			</main>
		</>
	);
};

export default SocialEngineeringView;
