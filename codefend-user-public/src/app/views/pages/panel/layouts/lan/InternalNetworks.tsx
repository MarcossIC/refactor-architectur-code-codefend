import { useEffect, useState } from 'react';
import { ApiHandlers } from '../../../../../data/services/api.service';
import useCompany from '../../../../../data/hooks/useCompany';
import { useModal } from '../../../../../data';

export const InternalNetworks: React.FC = () => {
	const [state, setState] = useState({
		companies: [],
		showModal: false,
		companyName: '',
		companyURL: '',
		companyCountry: '',
		companyAddress: '',
		companyCity: '',
		companySize: '',
		scanLoading: false,
	});

	const { companies } = state;
	const { companyStore, setCompanyStore } = useCompany();
	const { setShowModal, showModal } = useModal();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await ApiHandlers.getPanelCompanies();
				setState((prevState: any) => ({
					...prevState,
					companies: res,
				}));
			} catch (error) {
				console.error('Error fetching companies:', error);
			}
		};

		fetchData();
	}, []);

	const handleInputChange = (e: any) => {
		setState({
			...state,
			companyName: e.target.value,
		});
	};

	const handleCreateCompany = (e: any) => {
		e.preventDefault();

		const requestBody = {
			companyName: state.companyName,
			companyWeb: state.companyURL,
			companyAddress: state.companyAddress,
			companySize: state.companySize,
			companyCountry: state.companyCountry,
			companyCity: state.companyCity,
		};

		return ApiHandlers.createCompanyHandler(requestBody);
	};

	return (
		<>
			{state.showModal && (
				<div
					onClick={() => {
						setShowModal(!showModal);
					}}
					className="fixed left-0 top-0 flex h-full w-full z-20 items-center justify-center bg-black bg-opacity-20 py-10">
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
										Add a new company
									</p>
								</div>
								<div className="container flex items-center justify-center  mx-auto p-3 text-format">
									<form className="p-6">
										<div className="relative flex items-center mt-4">
											<span className="absolute"></span>

											<input
												type="text"
												onChange={handleInputChange}
												className="block w-full py-3 bg-white border px-11 log-inputs dark:text-gray-300"
												placeholder="Company name"></input>
										</div>

										<div className="relative flex items-center mt-4">
											<span className="absolute"></span>

											<input
												type="text"
												onChange={handleInputChange}
												className="block w-full py-3 bg-white border px-11 log-inputs dark:text-gray-300"
												placeholder="Company URL"></input>
										</div>
										<div className="relative flex items-center mt-4">
											<span className="absolute"></span>

											<input
												type="text"
												onChange={handleInputChange}
												className="block w-full py-3 bg-white border px-11 log-inputs dark:text-gray-300"
												placeholder="Company size"></input>
										</div>
										<div className="relative flex items-center mt-4">
											<span className="absolute"></span>

											<input
												type="text"
												onChange={handleInputChange}
												className="block w-full py-3 bg-white border px-11 log-inputs dark:text-gray-300"
												placeholder="Company Country"></input>
										</div>
										<div className="relative flex items-center mt-4">
											<span className="absolute"></span>

											<input
												type="text"
												onChange={handleInputChange}
												className="block w-full py-3 bg-white border px-11 log-inputs dark:text-gray-300"
												placeholder="Company City"></input>
										</div>
										<div className="relative flex items-center mt-4">
											<span className="absolute"></span>

											<input
												type="text"
												onChange={handleInputChange}
												className="block w-full py-3 bg-white border px-11 log-inputs dark:text-gray-300"
												placeholder="Company Adress"></input>
										</div>
										<div className="mt-6 internal-tables flex">
											<button
												onClick={() => {
													setShowModal(!showModal);
												}}
												className="log-inputs w-2/6 px-4 mr-2 py-3 text-sm tracking-wide text-white transition-colors duration-300">
												cancel
											</button>
											<button
												onClick={(e) => {
													handleCreateCompany(e);
												}}
												className="log-inputs bg-codefend px-6 w-4/6 py-3 text-sm tracking-wide text-white transition-colors duration-300">
												create
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="w-full internal-tables">
				<div className="p-3 pl-8 internal-tables-active flex">
					<p className="text-small text-left font-bold title-format border-r pr-2">
						Current companies
					</p>
					<p
						onClick={() => {
							setShowModal(!showModal);
						}}
						className="text-small text-left font-bold title-format border-r px-2 underline cursor-pointer codefend-text-red">
						Create new company
					</p>
				</div>

				<div className="flex p-3 pl-8 text-format">
					<p className="text-base w-1/12">id</p>
					<p className="text-base w-4/12">company name</p>
					<p className="text-base w-3/12">country</p>
					<p className="text-base w-4/12">web</p>
				</div>
			</div>
			<div className="w-full internal-tables internal-tables-scroll">
				<div>
					{companies.map((company: any) => (
						<div
							key={company.id} // Asegúrate de proporcionar una clave única para cada elemento
							onClick={() => {
								setCompanyStore(company);
							}}
							className="flex pl-8 text-format cursor-pointer">
							<p className="text-base w-1/12 pt-3 pb-3">
								{company.id}
							</p>
							<p className="w-4/12 text-base pt-3 pb-3">
								{company.name}
							</p>
							<p className="text-base w-3/12 pt-3 pb-3">
								{company.country}
							</p>
							<p className="text-base w-4/12 pt-3 pb-3">
								{company.web}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default InternalNetworks;
