import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthState } from 'src/app/data/hooks/useAuthState'
import { RegisterFinishParams } from 'src/app/data/services/auth.service'
import { useAppSelector } from 'src/app/data'
import { ButtonLoader } from 'src/app/views/components'

const FinishSignUpLayout = () => {
  const loading = useAppSelector((state) => state.authState.loading)
  const { signUpFinish } = useAuthState()
  const [userState, setUserState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false
  })

  const navigate = useNavigate();
  const { ref } = useParams()

  console.log(ref)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prevUserState) => ({
      ...prevUserState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (userState.password !== userState.confirmPassword) {
      return toast.error(
        'Password does not match, Kindly check and try again !!!'
      )
    }
    if (!userState.email || userState.email.length < 0 || userState.email.length > 50) {
      return toast.error('Invalid username')
    }

    if (!userState.password || userState.password.length < 0 || userState.password.length > 50) {
      console.log({ pass: userState.password })
      return toast.error('Invalid password')
    }

    const requestParams: RegisterFinishParams = {
      username: userState.email,
      password: userState.password,
      lead_reference_number: ref
    }

    setUserState(prevState => ({ ...prevState, isLoading: true }));

    signUpFinish(requestParams)
      .then((response: any) => {
        if (response?.data?.error && response.data.error != 0) {
          return toast.error(response.data.info)
        }

        if (response.status != 200) {
          return toast.error('An error has occurred...')
        }

        if (!response.data.session) {
          return toast.error('Invalid token response...')
        }

        if (!response.data.user) {
          return toast.error('Invalid user response...')
        }

        toast.success('Successfully Added User...')

        /* const decodedToken = jwt_decode(response.data.session)
        const userData = { ...response.data.user, exp: decodedToken.exp ?? 0 }
        setAuth(response.data.session, userData)
        setUser(userData)
 */
        return navigate('/dashboard')
      })
      .finally(() => {
        setUserState(prevState => ({ ...prevState, isLoading: false }));
      })
  }

  return (
    <>
      <section className="access log-component">
        <div className="container">
          <div className="forms">
            <div className="nav">
              <span className="active">
                <a href="#">finish registration</a>
              </span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-2">
                <input
                  type="email"
                  onChange={handleChange}
                  className="full-w"
                  placeholder="Select Username"
                  required
                />
              </div>

              <div className="mt-2">
                <input
                  type="password"
                  onChange={handleChange}
                  className="full-w"
                  placeholder="Select Password"
                  required
                />
              </div>

              <div className="mt-2">
                <input
                  type="password"
                  onChange={handleSubmit}
                  className="full-w"
                  placeholder="Select Confirm Password"
                  required
                />
              </div>

              <div className="mt-6">
                <span  className="text-sm text-alt3">
                  I have read and accept the <u>Privacy Policy</u> and{' '}
                  <u>Terms of Use.</u>
                </span>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary flex items-center gap-x-2"
                >
                  {loading && <ButtonLoader />}
                  proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default FinishSignUpLayout
