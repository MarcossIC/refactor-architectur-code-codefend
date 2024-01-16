	import { PageLoader, SearchIcon, Show } from '../../../../../../views/components';
	import { ApiHandlers, User, useAuthState } from '../../../../../../data';
	import React, { useState, useEffect } from 'react';

	interface SubIntel {
		[key: string]: unknown;
	}

	interface IntelDataItem {
		name: string;
		value: SubIntel[];
	}

	interface PersonInfo {
		name: string;
		email?: string;
		phone?: string;
		address?: string;
		city?: string;
		state?: string;
		zip?: string;
		gender?: string;
		lastip?: string;
		username?: string;
		country?: string;
		created?: string;
		followers?: string;
		hash?: string;
		id?: string;
		birthdate?: string;
		regdate?: string;
		uid?: string;
	}

	interface ApiResponse {
		took: number;
		size: number;
		results: Record<string, PersonInfo[]>;
	}

	interface SearchQuery {
		keyword: string;
	}

	interface SearchResponse {
		response: ApiResponse;
		keyword: string;
	}

	interface sClas {
		email: string;
		username: string;
		password: string;
		fullname: string;
	}

	const SnsSearchAndData: React.FC = () => {
		const [searchData, setSearchData] = useState('');
		const [searchClass, setSearchClass] = useState<string >('');
		const [intelData, setIntelData] = useState<any[]>([]);
		const [loading, setLoading] = useState(false);

		const { getUserdata } = useAuthState();
		const companyID = getUserdata()?.companyID as string;


		const user = getUserdata as unknown as User;

		useEffect(() => {
			if (!getUserdata()) return;
	
			if (searchData) {
				setSearchData(searchData);
				procSearch();
			}
		}, []);

		useEffect(() => {
			if (!user) return;
			const urlParams = new URLSearchParams(window.location.search);
			if (urlParams.get('search')) {
				setSearchData(urlParams.get('search') || '');
			}
			if (urlParams.get('class')) {
				setSearchClass(urlParams.get('class') || '');
			}

			if (searchClass && searchData) {
				procSearch(undefined!);
			}
		}, []);

		const procSearch = (e?: React.FormEvent): any => {
			if (e) {
				e.preventDefault();
			}
			setLoading(true);
			setIntelData([]);
			ApiHandlers.initializeSnsData(
				{
					keyword: searchData,
					class: searchClass,
				},
				companyID,
			)
				.then((res: any) => {
					const arrayOfObjects = Object.entries(
						res.data.response.results,
					).map(([key, value]) => {
						const name = key.split('_').slice(1, -2).join('_');
						return { name, value: value as SubIntel[] };
					});
					setIntelData(arrayOfObjects);
				})
				.catch((err: any) => {
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		return (
			<>
				<div className="search-bar">
					<div className="search-item">
						<form onSubmit={procSearch}>
							<input
								type="text"
								value={searchData}
								onChange={(e) => setSearchData(e.target.value)}
								placeholder="Search"
								className="text"
								required
							/>
							<div className="drop">
								<select
									className="select"
									value={searchClass}
									onChange={(e) => setSearchClass(e.target.value)}>
									<option value="email" selected>
										email
									</option>
									<option value="username">username</option>
									<option value="password">password</option>
									<option value="name">full name</option>
								</select>

								<button type="submit" className="btn btn-primary">
									<SearchIcon/>
								</button>
							</div>
						</form>
					</div>
				</div>
				<Show when={!loading} fallback={<PageLoader />}>
					<div>
						{intelData.map((intel, index) => (
							<div key={index} className="search-result">
								<div className="header">
									<div className="title">{intel?.name}</div>
								</div>
								<div className="info">
									{intel?.value.map(
										(subIntel: SubIntel, subIndex: number) => (
											<div
												key={subIndex}
												className="text"
												style={{
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
													maxWidth: '260px',
													overflow: 'hidden',
												}}>
												{Object.keys(subIntel).map(
													(subIntelVal, subIntelValIndex) => (
														<div key={subIntelValIndex}>
															{`${subIntelVal}: ${subIntel[subIntelVal]}`}
														</div>
													),
												)}
											</div>
										),
									)}
								</div>
							</div>
						))}
					</div>
				</Show>
			</>
		);
	};

	export default SnsSearchAndData;
