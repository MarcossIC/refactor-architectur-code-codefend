import { ApiHandlers } from 'app/data';
import { Show } from 'app/views/components';
import React, { useEffect, useState } from 'react';

const AdminCompanyDetails: React.FC = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [usersToShow, setUsersToShow] = useState([]);
	const [filterUsers, setFilterUsers] = useState([]);
	const [companyUsers, setCompanyUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [companyStore, setCompanyStore] = useState(null);

	useEffect(() => {
		if (companyStore) {
			ApiHandlers.getPanelUsers().then((res: any) => {
				const usersMapped = res.data.map((user: any) => {
					return {
						id: user.id,
						name: user.name + ' ' + user.surname,
						canRead: user.read_array.includes(companyStore.id),
						canWrite: user.write_array.includes(companyStore.id),
						write_array: user.write_array,
						read_array: user.read_array,
					};
				});

				setUsersToShow(usersMapped);
			});
		}
	}, [companyStore]);

	const handleInputChange = (value: any) => {
		const maxResults = 3;
		let count = 0;

		const filteredArray = usersToShow.filter((item: any) => {
			if (count >= maxResults) {
				return false;
			}
			if (
				item.name.includes(value) &&
				!item.read_array.includes(companyStore.id) &&
				!item.write_array.includes(companyStore.id)
			) {
				count++;
				return true;
			}
			return false;
		});

		setFilterUsers(filteredArray);
	};
	const handleAddUser = (e: any) => {
		e.preventDefault();

		const requestBody = {
			userId: selectedUser.id,
			companyId: companyStore.id,
			canWrite: selectedUser.canWrite,
			canRead: selectedUser.canRead,
		};

		return ApiHandlers.addUserCompany(requestBody);
	};

	return (
		<>
			<Show when={showModal}>
				<div
					onClick={() => {
						setShowModal(!showModal);
					}}
					className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20 py-10">
					<div
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
						className="max-h-full max-w-xl overflow-y-auto bg-white">
						<div className="w-full">
							<div className="w-full internal-tables">
								<div className="p-3 internal-tables-active flex">
									<p className="text-small text-left font-bold title-format">
										Add a user to the company
									</p>
								</div>
								<div className="container flex items-center justify-center  mx-auto p-3 text-format">
									<form className="p-6">
										<div className="relative flex items-center">
											<span className="absolute"></span>

											<Show
												when={!selectedUser}
												fallback={
													<span
														onClick={() => {
															setSelectedUser(null);
														}}
														className="block w-full py-3 px-11 log-inputs cursor-pointer dark:text-gray-300 text-xs">
														{selectedUser.name}
													</span>
												}>
												<input
													type="text"
													onKeyUp={(e) => {
														handleInputChange(e.target.value);
													}}
													className="block w-full py-3 bg-white px-11 log-inputs dark:text-gray-300"
													placeholder="User name"></input>
											</Show>
										</div>
										<For each={filterUsers}>
											{(user: any) => (
												<div className="relative flex items-center">
													<span
														onClick={() => {
															setSelectedUser(user),
																setFilterUsers([]);
														}}
														className="block w-full py-3 px-11 log-inputs cursor-pointer dark:text-gray-300 text-xs">
														{user.name}
													</span>
												</div>
											)}
										</For>
										<Show when={selectedUser}>
											<div className="flex items-center">
												<input
													id="link-checkbox"
													type="checkbox"
													checked={selectedUser.canRead}
													onClick={() => {
														setSelectedUser({
															id: selectedUser.id,
															name: selectedUser.name,
															canRead: !selectedUser.canRead,
															canWrite: selectedUser.canWrite,
														});
														setSelectedUser(...selectedUser, {
															canRead: !selectedUser.canRead,
														});
													}}
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
												<label
													for="link-checkbox"
													className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
													Read permission
												</label>
											</div>
											<div className="flex items-center">
												<input
													id="link-checkbox"
													type="checkbox"
													checked={selectedUser.canWrite}
													onClick={() => {
														setSelectedUser({
															id: selectedUser.id,
															name: selectedUser.name,
															canRead: selectedUser.canRead,
															canWrite: !selectedUser.canWrite,
														});
														setSelectedUser(...selectedUser, {
															canWrite: !selectedUser.canWrite,
														});
													}}
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
												<label
													for="link-checkbox"
													className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
													Write permission
												</label>
											</div>
										</Show>
										<div className="mt-6 internal-tables flex">
											<button
												onClick={() => {
													setShowModal(!showModal());
												}}
												className="log-inputs w-2/6 px-4 mr-2 py-3 text-sm tracking-wide text-white transition-colors duration-300">
												cancel
											</button>
											<button
												onClick={(e) => {
													handleAddUser(e);
												}}
												className="log-inputs bg-codefend px-6 w-4/6 py-3 text-sm tracking-wide text-white transition-colors duration-300">
												add
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Show>
			<Show
				when={companyStore}
				fallback={
					<div className="w-full internal-tables mt-4">
						<div className="p-3 pl-8 internal-tables-active">
							<p className="text-small text-left font-bold title-format">
								Company details
							</p>
						</div>
						<div className="flex pl-8 text-format cursor-pointer">
							<p className="text-base pt-3 pb-3">No company selected</p>
						</div>
					</div>
				}>
				<div className="w-full internal-tables mt-4">
					<div className="p-3 pl-8 internal-tables-active">
						<p className="text-small text-left font-bold title-format">
							Company details
						</p>
					</div>
					<div className="flex pl-8 text-format cursor-pointer">
						<p className="text-base pt-3 pb-3">{`name: ${companyStore.name}`}</p>
					</div>
					<div className="flex pl-8 text-format cursor-pointer">
						<p className="text-base pt-3 pb-3">{`website: ${companyStore.web}`}</p>
					</div>
					<div className="flex pl-8 text-format cursor-pointer">
						<p className="text-base pt-3 pb-3">{`country: ${companyStore.country}`}</p>
					</div>
					<div className="flex pl-8 text-format cursor-pointer">
						<p className="text-base pt-3 pb-3">{`city: ${companyStore.city}`}</p>
					</div>
					<div className="flex pl-8 text-format cursor-pointer">
						<p className="text-base pt-3 pb-3">{`address: ${companyStore.address}`}</p>
					</div>
					<div className="flex pl-8 text-format cursor-pointer">
						<p className="text-base pt-3 pb-3">{`size: ${companyStore.size}`}</p>
					</div>
				</div>
				<div className="w-full internal-tables mt-4 max-h-80 overflow-y-scroll">
					<div className="p-3 pl-8 internal-tables-active flex">
						<p className="text-small text-left font-bold title-format border-r pr-2">
							Company members
						</p>
						<p
							onClick={() => {
								setShowModal(!showModal);
							}}
							className="text-small text-left font-bold title-format border-r px-2 underline cursor-pointer codefend-text-red">
							Add member
						</p>
					</div>
					<div className="flex p-3 pl-8 text-format">
						<p className="text-base w-1/12">id</p>
						<p className="text-base w-6/12">full name</p>
						<p className="text-base w-2/12">role</p>
						<p className="text-base w-2/12">permissions</p>
					</div>
					<Show when={usersToShow}>
						{usersToShow()
							.filter((user: any) =>
								user.read_array.includes(companyStore.id),
							)
							.map((user: any) => {
								return (
									<div
										onClick={() => {
											setSelectedUser(user);
											setShowModal(!showModal);
										}}
										className="flex pl-8 text-format cursor-pointer">
										<p className="text-base w-1/12 pt-3 pb-3">
											{user.id}
										</p>
										<p className="w-6/12 text-base pt-3 pb-3">
											{user.name}
										</p>
										<p className="text-base w-2/12 pt-3 pb-3"> - </p>
										<p className="text-base w-2/12 pt-3 pb-3">{`Can write: ${user.write_array.includes(
											companyStore.id,
										)}`}</p>
									</div>
								);
							})}
					</Show>
				</div>
			</Show>
		</>
	);
};

export default AdminCompanyDetails;
