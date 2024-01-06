import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  RegisterParams, UserRegister, useAppDispatch, useAppSelector } from '../../../../data'
import { companySizesList, countries } from '../../../../data/mocks'
import { registerThunk } from '../../../../data/redux/thunks/auth.thunk'
import { ButtonLoader } from '../../../components'
import '../../../shared/buttons.scss'
import '../../../shared/forms.scss'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const SignUpLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);

  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState<RegisterParams>({
    name: '',
    username: '',
    companyRole: '',
    email: '',
    phone: '',
    companyName: '',
    companySize: '',
    companyWeb: '',
    companyCountry: ''
  })

  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupForm((current: any) => ({ ...current, isLoading: true }))

    const requestParams: RegisterParams = {
      lead_fname: signupForm.name,
      phone: signupForm.phone,
      companyRole: signupForm.companyRole,
      email: signupForm.email,
      companyName: signupForm.companyName,
      companyWeb: signupForm.companyWeb, 
      companySize: signupForm.companySize,
      companyCountry: signupForm.companyCountry,
      password: "",
      role: "", 
      phase: '1'
    }

    try {
      dispatch(registerThunk(requestParams))
      toast.success(`signup successful`)
      setSignupForm((prevData: any) => ({ ...prevData, isCompleteSignUp: true }))

      navigate('/auth/confirmation')
    } catch (error) {
      console.error('Error during registration:', error)
      toast.error('An error occurred during registration.')
    } finally {
      setSignupForm((prevData: any) => ({ ...prevData, isLoading: false }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          onChange={(e) =>
            setSignupForm((current: any) => ({ ...current, name: e.target.value }))
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
            setSignupForm((current: any) => ({
              ...current,
              lastName: e.target.value
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
            setSignupForm((current: any) => ({ ...current, email: e.target.value }))
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
            setSignupForm((current: any) => ({ ...current, phone: e.target.value }))
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
            setSignupForm((current: any) => ({
              ...current,
              companyName: e.target.value
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
            setSignupForm((current: any) => ({
              ...current,
              companyWeb: e.target.value
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
            setSignupForm((current: any) => ({
              ...current,
              companySize: e.target.value
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
            setSignupForm((current: any) => ({
              ...current,
              companyRole: e.target.value
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
            setSignupForm((current: any) => ({
              ...current,
              companyCountry: e.target.value
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
          I have read and accept the <u>Privacy Policy</u> and{' '}
          <u>Terms of Use.</u>
        </span>
      </div>
      <div className="extra-group">
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary signup-button"
        >
          {isLoading && <ButtonLoader />}
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
  )
}

export default SignUpLayout
