import { useAppSelector, useModal } from "app/data";
import { SocialAplicationService } from "app/data/services/social.service";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonLoader, GlobeWebIcon } from "..";

interface SocialData {
  fName: string;
  lName: string;
  mail: string;
  phone: string;
  role: string;
  isAddingMember: boolean;
}

interface Props {
	onDone: () => void;
	close?: () => void;
}

export const MobileAppModal: React.FC<Props> = (props) => {
  const { showModal, setShowModal } = useModal();
	const companyID = useAppSelector((state) => state.authState.userData?.companyID)

	const [socialData, setSocialData] = useState<SocialData>({
    fName: "",
    lName: "",
    mail: "",
    phone: "",
    role: "",
    isAddingMember: false,
  });

	const {fName, isAddingMember, lName, mail, phone, role} = socialData

  const handleSubmit = (e: any) => {
    e.preventDefault();

		setSocialData((prevData) => ({ ...prevData, isAddingMember: true }));


    if (
      !fName ||
      fName.length == 0 ||
      fName.length > 40
    ) {
      toast.error("Invalid name");
      return setSocialData((prevData) => ({ ...prevData, isAddingMember: false }));

    }

    if (
      !lName||
      lName.length == 0 ||
      lName.length > 40
    ) {
      toast.error("Invalid name");
      return setSocialData((prevData) => ({ ...prevData, isAddingMember: false }));

    }

    let regexMail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,10}$/;
    if (
      !mail ||
      mail.length === 0 ||
      !regexMail.test(mail)
    ) {
      toast.error("Invalid email");
      return setSocialData((prevData) => ({ ...prevData, isAddingMember: false }));
    }

    if (
      !phone ||
      phone.length == 0 ||
      phone.length > 20
    ) {
      toast.error("Invalid phone");
      return setSocialData((prevData) => ({ ...prevData, isAddingMember: false }));
    }

    if (!role) {
      toast.error("Invalid role");
      return setSocialData((prevData) => ({ ...prevData, isAddingMember: false }));
    }

    const requestParams = {
      member_fname: fName,
      member_lname: lName,
      member_email: mail,
      member_phone: phone,
      member_role: role,
    };

    SocialAplicationService.add(requestParams, companyID!)
      .then(() => {
        props.onDone();
        setShowModal(!showModal);
        toast.success("Successfully Added Member...");
      })
      .finally(() => {
        setSocialData((prevData) => ({ ...prevData, isAddingMember: false }));
      });
  };

  return (
    <>
      <div className="container flex items-center justify-center  mx-auto p-3 text-format">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative flex items-center w-96">
            <span className="absolute">
              <GlobeWebIcon />
            </span>

            <input
              type="text"
              onChange={(e) => {
								setSocialData((prevData) => ({ ...prevData, fName: e.target.value }));
              }}
              className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300"
              placeholder="first name"
              required
            />
          </div>

          <div className="relative flex items-center mt-4 w-96">
            <span className="absolute">
              <GlobeWebIcon />
            </span>

            <input
              type="text"
              onChange={(e) => {
                setSocialData((prevData) => ({ ...prevData, lName: e.target.value }));
              }}
              className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300"
              placeholder="last name"
              required
            />
          </div>

          <div className="relative flex items-center mt-4 w-96">
            <span className="absolute">
              <GlobeWebIcon/>
            </span>

            <input
              type="text"
              onChange={(e) => {
                setSocialData((prevData) => ({ ...prevData, mail: e.target.value }));

              }}
              className="block w-full py-3 bg-white border px-11 log-inputs  focus:outline-none dark:text-gray-300"
              placeholder="email address"
              required
            />
          </div>
          <div className="relative flex items-center mt-4 w-96">
            <span className="absolute">
              <GlobeWebIcon />
            </span>

            <input
              type="text"
              onChange={(e) => {
                setSocialData((prevData) => ({ ...prevData, phone: e.target.value }));

              }}
              className="block w-full py-3 bg-white border px-11 log-inputs  focus:outline-none dark:text-gray-300"
              placeholder="phone number"
              required
            />
          </div>
          <div className="relative flex items-center w-96 mt-4">
            <span className="absolute">
              <GlobeWebIcon />
            </span>

            <select
              onChange={(e) => {
								setSocialData((prevData) => ({ ...prevData, role: e.target.value }));

              }}
              className="block w-full py-3 bg-white border px-11 log-inputs focus:outline-none dark:text-gray-300 modal_info"
              required
            >
              <option value="" disabled selected>
                role
              </option>
              <option value="admin">administrative</option>
              <option value="human">human resources</option>
              <option value="info">information tech</option>
              <option value="ads">marketing</option>
              <option value="sales">sales</option>
              <option value="finance">finance</option>
              <option value="cs">customer service</option>
              <option value="prod">production & ops</option>
              <option value="plan">strategy & planning</option>
            </select>
          </div>
          <div className="mt-6 flex">
            <button
              type="button"
              disabled={isAddingMember}
              onClick={() => {
                setShowModal(!showModal);
              }}
              className="log-inputs text-gray focus:outline-none w-2/6 px-4 mr-2 py-3 text-sm tracking-wide text-white transition-colors duration-300 codefend_secondary_ac"
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={isAddingMember}
              className="log-inputs flex flex-row items-center gap-x-2 text-white focus:outline-none bg-codefend px-6 w-4/6 py-3 text-sm tracking-wide text-white transition-colors duration-300 codefend_main_ac"
            >
              {isAddingMember && <ButtonLoader />}
              add repository
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MobileAppModal;
