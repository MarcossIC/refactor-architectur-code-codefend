import { SocialAplicationService } from 'app/data/services/social.service';
import { useCallback, useEffect, useState } from 'react';
import SocialEngineering from './components/SocialEngineering';
import SocialEngineeringMembers from './components/SocialEngineeringMembers';
import SocialAttackVectors from './components/SocialAttackVectors';
import { useAuthState } from 'app/data';
import { computedRoles } from 'app/data/utils/compute';

const fetchSocial = async (companyID: string) => {
	try {
		const data = await SocialAplicationService.getAll(companyID);
		return data;
	} catch (error) {
		console.log({ error });
	}
};

export interface Social {
	id: string;
	member_fname: string;
	member_lname: string;
	member_email: string;
	member_phone: string;
	member_role: string;
  total: number
}

const SocialEngineeringView = () => {
	const { getUserdata } = useAuthState();

	const [social, setSocial] = useState({
		loading: true,
		data: null,
	});

	const [socialFilters, setSocialFilters] = useState({
		department: [],
		attackVectors: [],
	});

	const fetch = useCallback(() => {
		const companyID = getUserdata()?.companyID;
		fetchSocial(companyID);
	}, []);

	const [showScreen, setShowScreen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowScreen(true);
		}, 50);
	});

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

		const socialDataList: Social[] | undefined =
			socialInfoData() ?? [];

		if (!socialDataList) {
			return { filteredData: [], isFiltered: false };
		}

		const filteredData = socialDataList.filter((datum) =>
			selectedFilters.includes(datum.member_role.toLowerCase()),
		);

		return { filteredData, isFiltered: selectedFilters.length !== 0 };
	};

	return (
		<>
			<main className={`social ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<SocialEngineering
						refetch={fetch}
						isLoading={social.loading}
						socials={
							handleFilter().isFiltered
								? handleFilter().filteredData
								: socialInfoData() ?? []
						}
					/>
				</section>
				<section className="right">
					<SocialEngineeringMembers
						isLoading={social.loading}
						members={computedRoles(socialInfoData() as Social[]) ?? []}
						setSocialFilters={setSocialFilters}
					/>
					<SocialAttackVectors />
				</section>
			</main>
		</>
	);
};

export default SocialEngineeringView;
