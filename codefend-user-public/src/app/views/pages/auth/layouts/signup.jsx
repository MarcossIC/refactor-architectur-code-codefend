import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { countries, companySizesList } from "../../../../data/";

import { useDispatch } from "react-redux";
import { ButtonLoader } from "../../../components";
import { registerThunk } from "../../../../data/redux/thunks/auth.thunk";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "",
    companyRole: "",
    companyWeb: "",
    companyCountry: "",
    isCompleteSignUp: false,
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
      password: "secret1234",
    };

    console.log(requestParams);
    try {
      dispatch(registerThunk(requestParams));
      toast.success(`signup successful`);
      navigate("/auth/signin");
      setSignupForm((prevData) => ({ ...prevData, isCompleteSignUp: true }));
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.", error);
    } finally {
      setSignupForm((prevData) => ({ ...prevData, isLoading: false }));
    }
  };

  const handleCompleteSignup = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mbs-2">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, name: e.target.value }))
          }
          className="full-w"
          name="first_name"
          placeholder="First name"
          autoComplete="given-name"
          required
        />
      </div>

      <div className="mbs-2">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              surname: e.target.value,
            }))
          }
          className="full-w"
          name="last_name"
          autoComplete="family-name"
          placeholder="Last name"
          required
        />
      </div>

      <div className="mbs-2">
        <input
          type="email"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, email: e.target.value }))
          }
          className="full-w"
          name="email_address"
          autoComplete="email"
          placeholder="Email address"
          required
        />
      </div>

      <div className="mbs-2">
        <input
          type="tel"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, phone: e.target.value }))
          }
          className="full-w"
          name="phone_number"
          placeholder="Phone number"
          required
        />
      </div>

      <div className="mbs-2">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyName: e.target.value,
            }))
          }
          className="full-w"
          name="company_name"
          placeholder="Company Name"
          required
        />
      </div>
      <div className="mbs-2">
        <input
          type="url"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyWeb: e.target.value,
            }))
          }
          className="full-w"
          name="company_website"
          placeholder="https://example.com"
          pattern="https://.*"
          size="30"
          required
        />
      </div>
      <div className="mbs-2">
        <select
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companySize: e.target.value,
            }))
          }
          className="log-inputs full-w log-text"
          name="company_size"
          value={signupForm.companySize}
          required
        >
          <option value="" disabled>
            Select Company Size
          </option>
          {companySizesList.map((company) => (
            <option key={company.value} value={company.value}>
              {company.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mbs-2">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyRole: e.target.value,
            }))
          }
          className="full-w"
          name="company_role"
          placeholder="Company Role"
          required
        />
      </div>

      <div className="mbs-2">
        <select
          id="countries"
          name="country"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyCountry: e.target.value,
            }))
          }
          className="log-inputs full-w log-text"
          value={signupForm.companyCountry}
          required
        >
          <option value="" disabled>
            Select your country
          </option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mbs-6">
        <span href="#" className="link link-color">
          I have read and accept the <u>Privacy Policy</u> and{" "}
          <u>Terms of Use.</u>
        </span>
      </div>
      <div className="mbs-6">
        <button
          disabled={signupForm.isLoading}
          type="submit"
          className="btn btn-primary flex align-center gapx-2"
        >
          {signupForm.isLoading && <ButtonLoader />}
          proceed
        </button>

        <div className="mbs-6 alignT-center ">
          <Link
            to="/auth/signin"
            className="link codefend-text-red link-underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpLayout;
