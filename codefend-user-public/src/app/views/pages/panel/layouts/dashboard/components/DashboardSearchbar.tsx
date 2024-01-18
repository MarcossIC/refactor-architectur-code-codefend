import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar, SearchIcon } from '../../../../../components';

const DashboardSearchbar = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const [searchClass, setSearchClass] = useState('');
	const getSearchClass = () => searchClass;

	const selectBarOptions = {
		options: { email: 'email', password: 'password', name: 'full name' },
		placeHolder: 'chose a class',
		value: getSearchClass(),
		change: (e: ChangeEvent<HTMLSelectElement>) =>
			setSearchClass(e.target.value),
	};

	return (
		<SearchBar
			placeHolder="Sns"
			isActiveSelect
			selectOptions={selectBarOptions}
			handleSubmit={() =>
				navigate('/sns?search=' + searchValue + '&class=' + searchClass)
			}
			handleChange={(e: any) => setSearchValue(e.target.value)}
			inputValue={searchValue}
			searchIcon={<SearchIcon isButton />}
		/>
	);
};

export default DashboardSearchbar;
