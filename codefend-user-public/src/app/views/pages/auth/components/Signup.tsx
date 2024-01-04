import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { companySizesList, countries } from "../../../../data/mocks";

import { ButtonLoader } from "../../../components";
import { registerThunk } from "../../../../data/redux/thunks/auth.thunk";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../../shared/buttons.scss";
import "../../../shared/inputs.scss";
import {
  RegisterParams,
  User,
  useAppDispatch,
  useAppSelector,
} from "../../../../data";

const SignUpLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);

  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState<User>({
    name: "",
    email: "",
    phone: 0,
    companyName: "",
    companySize: "",
    companyRole: "",
    companyWeb: "",
    companyCountry: "",
    password: "",
    role: "",
    username: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupForm((current) => ({ ...current, isLoading: true }));

    const requestParams: RegisterParams = {
      name: signupForm.name,
      username: "maco",
      companyRole: signupForm.companyRole,
      email: signupForm.email,
      phone: signupForm.phone?.toString(),
      companyName: signupForm.companyName || "",
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
      toast.error("An error occurred during registration.");
    } finally {
      setSignupForm((prevData) => ({ ...prevData, isLoading: false }));
    }
  };

  /* const handleCompleteSignup = (e) => {
    e.preventDefault();
  };
 */
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, name: e.target.value }))
          }
          name="first_name"
          placeholder="First name"
          autoComplete="given-name"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              surname: e.target.value,
            }))
          }
          name="last_name"
          autoComplete="family-name"
          placeholder="Last name"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="email"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, email: e.target.value }))
          }
          name="email_address"
          autoComplete="email"
          placeholder="Email address"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="tel"
          onChange={(e) =>
            setSignupForm((current) => ({ ...current, phone: e.target.value }))
          }
          name="phone_number"
          placeholder="Phone number"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyName: e.target.value,
            }))
          }
          name="company_name"
          placeholder="Company Name"
          required
        />
      </div>
      <div className="input-group">
        <input
          type="url"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyWeb: e.target.value,
            }))
          }
          name="company_website"
          placeholder="https://example.com"
          pattern="https://.*"
          size={30}
          required
        />
      </div>
      <div className="input-group">
        <select
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companySize: e.target.value,
            }))
          }
          className="log-inputs log-text"
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
      <div className="input-group">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyRole: e.target.value,
            }))
          }
          name="company_role"
          placeholder="Company Role"
          required
        />
      </div>

      <div className="input-group">
        <select
          id="countries"
          name="country"
          onChange={(e) =>
            setSignupForm((current) => ({
              ...current,
              companyCountry: e.target.value,
            }))
          }
          className="log-inputs log-text"
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

      <div className="extra-group">
        <span className="link link-color">
          I have read and accept the <u>Privacy Policy</u> and{" "}
          <u>Terms of Use.</u>
        </span>
      </div>
      <div className="extra-group">
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary signup-button"
        >
          {loading && <ButtonLoader />}
          proceed
        </button>

        <div className="extra-group text-center">
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
