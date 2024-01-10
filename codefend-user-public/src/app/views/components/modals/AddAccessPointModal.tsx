import { useAppSelector, useModal } from "app/data/index.js";
import { LanApplicationService } from "app/data/services/lan.service";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonLoader, GlobeWebIcon } from "..";

interface NetworkData {
  domainName: string;
  vendorName: string;
  username: string;
  password: string;
  internalAddress: string;
  externalAddress: string;
  isAddingInternalNetwork: boolean;
}

export const AcessPointModal: React.FC<{ onDone: () => void}> = (props) => {
	const companyID = useAppSelector((state) => state.authState.userData?.companyID)

	const [networkData, setNetworkData] = useState<NetworkData>({
		domainName: "",
		vendorName: "",
		username: "",
		password: "",
		internalAddress: "",
		externalAddress: "",
		isAddingInternalNetwork: false,
	});
	
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setNetworkData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

  const { showModal, setShowModal } = useModal();

	const {
		domainName,
		vendorName,
		username,
		password,
		internalAddress,
		externalAddress,
		isAddingInternalNetwork
	} = networkData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

		setNetworkData((prevData) => ({
      ...prevData,
      isAddingInternalNetwork: true,
    }));

	

    if (!domainName || domainName.length == 0) {
      toast.error("Invalid host name");
      return setNetworkData((prevData) => ({
        ...prevData,
        isAddingInternalNetwork: false,
      }));
    }

    if (!vendorName) {
      toast.error("Invalid vendor name");
			return setNetworkData((prevData) => ({
        ...prevData,
        isAddingInternalNetwork: false,
      }));
    }

    if (!username || username.length == 0) {
      toast.error("Invalid username");
			return setNetworkData((prevData) => ({
        ...prevData,
        isAddingInternalNetwork: false,
      }));    }

    if (!password || password.length == 0) {
      toast.error("Invalid password");
      return setNetworkData((prevData) => ({
        ...prevData,
        isAddingInternalNetwork: false,
      }));
    }

    const requestParams = {
      device_name: networkData.domainName,
      device_version: networkData.vendorName,
      access_username: networkData.username,
      access_password: networkData.password,
      device_in_address: networkData.internalAddress,
      device_ex_address: networkData.externalAddress,
    };

    LanApplicationService.add(requestParams, companyID)
      .then(() => {
        props.onDone();
        setShowModal(!showModal);
        toast.success("successfully added Access Point...");
      })
      .finally(() => {
				setNetworkData((prevData) => ({
          ...prevData,
          isAddingInternalNetwork: false,
        }));
      });
  };

  return (
    <>
      <div className="container flex items-center justify-center  mx-auto p-3 text-format">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative flex items-center w-96">
            <span className="absolute">
              {/* <FaSolidGlobe className="w-3 h-3 mx-4 codefend-text-red" /> */}
							<GlobeWebIcon/>
            </span>

            <select
              onChange={handleChange}
              className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300"
              required
            >
              <option value="" disabled selected>
                os / vendor
              </option>
              <option value="windows">windows</option>
              <option value="linux">linux</option>
              <option value="unknown">unknown</option>
              <option value="android">android</option>
              <option value="ios">ios</option>
            </select>
          </div>
          <div className="relative flex items-center w-96 mt-4">
            <span className="absolute">
              <GlobeWebIcon  />
            </span>

            <input
              type="text"
              onChange={handleChange}
              className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300"
              placeholder="hostname"
              required
            />
          </div>
          <div className="relative flex items-center w-96 mt-4">
            <span className="absolute">
              <GlobeWebIcon />
            </span>

            <input
              type="text"
              onChange={handleChange}
              className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300"
              placeholder="Internal IP Address"
              required
            />
          </div>
          <div className="relative flex items-center w-96 mt-4">
            <span className="absolute">
              <GlobeWebIcon />
            </span>

            <input
              type="text"
              onChange={handleChange}
              className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300"
              placeholder="External IP Address"
              required
            />
          </div>

          <div className="relative flex items-center mt-4 w-96">
            <span className="absolute">
              <GlobeWebIcon />
            </span>

            <input
              type="text"
              onChange={handleChange}
              className="block w-full py-3 bg-white border px-11 log-inputs  focus:outline-none dark:text-gray-300"
              placeholder="username"
              required
            />
          </div>
          <div className="relative flex items-center mt-4 w-96">
            <span className="absolute">
              <GlobeWebIcon />
            </span>

            <input
              type="password"
              onChange={handleChange}
              className="block w-full py-3 bg-white border px-11 log-inputs  focus:outline-none dark:text-gray-300"
              placeholder="password"
              required
            />
          </div>
          <div className="mt-6 flex">
            <button
              type="button"
              onClick={handleChange}
              className="log-inputs text-gray focus:outline-none w-2/6 px-4 mr-2 py-3 text-sm tracking-wide text-white transition-colors duration-300 codefend_secondary_ac"
            >
              cancel
            </button>
            <button
              type="submit"
              className="log-inputs flex flex-row items-center gap-x-2 text-white focus:outline-none bg-codefend px-6 w-4/6 py-3 text-sm tracking-wide text-white transition-colors duration-300 codefend_main_ac"
            >
              {isAddingInternalNetwork && <ButtonLoader />}
              add access point
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AcessPointModal;
