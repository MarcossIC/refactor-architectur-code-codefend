import React, { useState } from "react";
import { Link } from "react-router-dom";
import { countries, companySizesList } from "../../../../data/";
import "../../../shared/inputs.scss";

import { useDispatch } from "react-redux";
import { ButtonLoader } from "../../../components";
import { registerthunk } from "../../../../data/redux/thunks/auth.thunk"; 

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpLayout = () => {
  const dispatch = useDispatch();

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "",
    companyRole: "",
    companyWeb: "",
    companyCountry: "",

    isLoading: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupForm((current) => ({ ...current, isLoading: true }));

    const requestParams = {
      name: signupForm.name,
      username: "maco",
      companyRole: signupForm.companyRole,
      email: signupForm.email,
      phone: signupForm.phone,
      companyName: signupForm.companyName,
      companyWeb: signupForm.companyWeb,
      companySize: "Large",
      companyCountry: signupForm.companyCountry,
      role: "ADMIN",
      password: "secret1234"
    };

    console.log(requestParams)
    try {
      dispatch(registerthunk(requestParams))
      /* toast.success(`signup successful, ${response?.info ?? ""}`); */
      setSignupForm((prevData) => ({ ...prevData, isCompleteSignUp: true }));
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.");
    } finally {
      setSignupForm((prevData) => ({ ...prevData, isLoading: false }));
    }
  };

  const handleCompleteSignup = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-2">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, name: e.target.value }))
          }
          className="w-full"
          name="first_name"
          placeholder="First name"
          autoComplete="given-name"
          required
        />
      </div>

      <div className="mt-2">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              surname: e.target.value,
            }))
          }
          className="w-full"
          name="last_name"
          autoComplete="family-name"
          placeholder="Last name"
          required
        />
      </div>

      <div className="mt-2">
        <input
          type="email"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, email: e.target.value }))
          }
          className="w-full"
          name="email_address"
          autoComplete="email"
          placeholder="Email address"
          required
        />
      </div>

      <div className="mt-2">
        <input
          type="tel"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, phone: e.target.value }))
          }
          className="w-full"
          name="phone_number"
          placeholder="Phone number"
          required
        />
      </div>

      <div className="mt-2">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyName: e.target.value,
            }))
          }
          className="w-full"
          name="company_name"
          placeholder="Company Name"
          required
        />
      </div>
      <div className="mt-2">
        <input
          type="url"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyWeb: e.target.value,
            }))
          }
          className="w-full"
          name="company_website"
          placeholder="https://example.com"
          pattern="https://.*"
          size="30"
          required
        />
      </div>
      <div className="mt-2">
        <select
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companySize: e.target.value,
            }))
          }
          className="log-inputs text-sm rounded block w-full p-2.5"
          name="company_size"
          value={signupForm.companySize}
          required
        >
          <option value="" disabled>
            Select Company Size
          </option>
          {companySizesList.map((company) => (
            <option key={company.label} value={company.value}>
              {company.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyRole: e.target.value,
            }))
          }
          className="w-full"
          name="company_role"
          placeholder="Company Role"
          required
        />
      </div>

      <div className="mt-2">
        <select
          id="countries"
          name="country"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyCountry: e.target.value,
            }))
          }
          className="log-inputs text-sm rounded block w-full p-2.5"
          value={signupForm.companyCountry}
          required
        >
          <option value="" disabled>
            Select your country
          </option>
          {countries.map((country) => (
            <option key={country.label} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <span
          href="#"
          className="text-sm cursor-pointer text-[var(--text-color-alt3)]"
        >
          I have read and accept the <u>Privacy Policy</u> and{" "}
          <u>Terms of Use.</u>
        </span>
      </div>
      <div className="mt-6">
        <button
          disabled={signupForm.isLoading}
          type="submit"
          className="btn btn-primary flex items-center gap-x-2"
        >
          {signupForm.isLoading && <ButtonLoader />}
          proceed
        </button>

        <div className="mt-6 text-center ">
          <Link
            to="/auth/signin"
            className="text-sm codefend-text-red hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpLayout;
