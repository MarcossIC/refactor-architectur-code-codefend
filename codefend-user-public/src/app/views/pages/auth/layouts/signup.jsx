import React, { useState } from 'react';

//import { useNavigate } from 'react-router-dom';
import { countries } from '../../../constants/countries'
import { companySizesList } from '../../../constants/index';
import { ButtonLoader } from '../../../components/standalones/ButtonLoader';
//import Logo from '../Logo/logo';


import { useDispatch, useSelector } from 'react-redux'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const  SignUpLayout = () => {
  //const navigate = useNavigate();
  //const { isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    referenceNumber: '',
    surname: '',
    companyName: '',
    companySize: '',
    companyRole: '',
    companyWeb: '',
    companyCountry: '',
    isLoading: false,
    isCompleteSignUp: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, isLoading: true }));

    const requestParams = {
      lead_fname: formData.name,
      lead_lname: formData.surname,
      lead_role: formData.companyRole,
      lead_email: formData.email,
      lead_phone: formData.phone,
      company_name: formData.companyName,
      company_web: formData.companyWeb,
      company_size: formData.companySize,
      company_area: formData.companyCountry,
      phase: '1',
    };

    try {

      dispatch(registerUser(requestParams))

      if (data.error !== 0) {
        toast.error(data.info);
        return;
      }

      toast.success(`signup successful, ${data?.info ?? ''}`);
      setFormData((prevData) => ({ ...prevData, isCompleteSignUp: true }));
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred during registration.');
    } finally {
      setFormData((prevData) => ({ ...prevData, isLoading: false }));
    }
  };

  const handleCompleteSignup = (e) => {
    e.preventDefault();
    //navigate(`/auth/signup/${formData.referenceNumber}`);
  };

  return (
    <>
      <section className="access log-component">
        <div className="container">
          <div className="brand">
          </div>
          <div className="forms">
            <div className="nav">
              <span>
                <a
                  href="#"
                  onClick={() => {
                    history.push("/auth/signin");
                  }}
                >
                  access
                </a>
              </span>
              <span className="active">
                <a
                  href="#"
                  onClick={() => {
                    history.push("/auth/signup");
                  }}
                >
                  new user
                </a>
              </span>
            </div>

            {formData.isCompleteSignUp ? (
              <form className="signup-confirmation" onSubmit={handleCompleteSignup}>
                <div className="check-mail flex items-center gap-x-4 mt-4 mb-8">
                  <div className="w-40 ">
                    <img
                      className="w-full h-full object-fill"
                      src="/codefend/check_email.png"
                      alt="mail-image"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <span className="font-bold text-lg">
                      we have sent you an email with a code!
                    </span>
                    <p>
                      please check your inbox, copy the verification code and
                      paste it in the field below to confirm your email
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex flex-col">
                  <label className="otp-label" htmlFor="otp">
                    Reference Number
                  </label>
                  <input
                    id="otp"
                    type="text"
                    onChange={(e) => {
                      setFormData((prevData) => ({ ...prevData, referenceNumber: e.target.value }));
                    }}
                    className="full-w"
                    name="otp"
                    placeholder="Enter Reference Number here"
                    required
                  />
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-4 ">
                  <button
                    onClick={() => { }}
                    disabled={formData.isLoading}
                    type="button"
                    className="btn btn-tertiary flex items-center gap-x-2 "
                  >
                    assistance
                  </button>
                  <button
                    disabled={formData.isLoading}
                    type="submit"
                    className="btn btn-primary flex items-center gap-x-2"
                  >
                    {formData.isLoading && <ButtonLoader />}
                    proceed
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => {
                      setFormData((prevData) => ({ ...prevData, name: e.target.value }));
                    }}
                    className="full-w"
                    name="first_name"
                    placeholder="First name"
                    required
                  />
                </div>

                <div class="mt-2">
                  <input
                    type="text"
                    onChange={(e) => {
                      setFormData((prevData) => ({ ...prevData, surname: e.target.value }));
                    }}
                    className="full-w"
                    name="last_name"
                    placeholder="Last name"
                    required
                  />
                </div>

                <div class="mt-2">
                  <input
                    type="email"
                    onChange={(e) => {
                      setFormData((prevData) => ({ ...prevData, email: e.target.value }));
                    }}
                    className="full-w"
                    name="email_address"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div class="mt-2">
                  <input
                    type="tel"
                    onChange={(e) => {
                      setFormData((prevData) => ({ ...prevData, phone: e.target.value }));
                    }}
                    className="full-w"
                    name="phone_number"
                    placeholder="Phone number"
                    required
                  />
                </div>

                <div class="mt-2">
                  <input
                    type="text"
                    onChange={(e) => {
                      setFormData((prevData) => ({ ...prevData, companyName: e.target.value }));
                    }}
                    className="full-w"
                    name="company_name"
                    placeholder="Company Name"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="url"
                    onChange={(e) => {
                      setCompanyWeb(e.target.value);
                    }}
                    className="full-w"
                    name="company_website"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    size="30"
                    required
                  />
                </div>
                <div className="mt-2">
                  <select
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="log-inputs text-sm rounded block w-full p-2.5"
                    name="company_size"
                    required
                  >
                    <option value="" selected>
                      Select Company Size
                    </option>
                    {companySizesList.map((company) => (
                      <option key={company.value} value={company.value}>
                        {company.label}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => {
                      setCompanyRole(e.target.value);
                    }}
                    className="full-w"
                    name="company_role"
                    placeholder="Company Role"
                    required
                  />
                </div>

                <div className="mt-2">
                  <select
                    id="countries"
                    name="country"
                    onChange={(e) => setCompanyCountry(e.target.value)}
                    className="log-inputs text-sm rounded block w-full p-2.5"
                    required
                  >
                    <option value="" selected>
                      Select your country
                    </option>
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>

                </div>

                <div class="mt-6">
                  <span href="#" class="text-sm text-alt3">
                    I have read and accept the <u>Privacy Policy</u> and{" "}
                    <u>Terms of Use.</u>
                  </span>
                </div>
                <div className="mt-6">
                  <button
                    disabled={formData.isLoading}
                    type="submit"
                    className="btn btn-primary flex items-center gap-x-2"
                  >
                    {formData.isLoading && <ButtonLoader />}
                    proceed
                  </button>

                  <div className="mt-6 text-center ">
                    <a
                      href="#"
                      onClick={() => {
                        history.push("/auth/signin");
                      }}
                      className="text-sm codefend-text-red hover:underline"
                    >
                      Already have an account? Sign in
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
