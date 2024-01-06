import { useState } from 'react'
import { useParams } from 'react-router'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAppSelector } from 'src/app/data'

const FinishSignUpLayout = () => {
  const [userState, setUserState] = useState({
    user: createUser.user,
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false
  })
  const { ref } = useParams()

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

    if (!password() || password().length < 0 || password().length > 50) {
      console.log({ pass: password() })
      return toast.error('Invalid password')
    }

    const requestParams = {
      username: email(),
      password: password(),
      lead_reference_number: ref
    }

    setIsLoading(true)

    return AuthService.registerFinishHandler(requestParams)
      .then((response) => {
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

        const decodedToken = jwt_decode(response.data.session)
        const userData = { ...response.data.user, exp: decodedToken.exp ?? 0 }
        setAuth(response.data.session, userData)
        setUser(userData)

        return history.push('/')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <section className="access log-component">
        <div className="container">
          <div className="brand">
            <Logo theme={'shadow'} />
          </div>
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
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  className="full-w"
                  placeholder="Select Username"
                  required
                />
              </div>

              <div className="mt-2">
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className="full-w"
                  placeholder="Select Password"
                  required
                />
              </div>

              <div className="mt-2">
                <input
                  type="password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                  }}
                  className="full-w"
                  placeholder="Select Confirm Password"
                  required
                />
              </div>

              <div className="mt-6">
                <span href="#" className="text-sm text-alt3">
                  I have read and accept the <u>Privacy Policy</u> and{' '}
                  <u>Terms of Use.</u>
                </span>
              </div>
              <div className="mt-6">
                <button
                  onClick={(e) => {
                    handleSubmit(e)
                  }}
                  disabled={isLoading()}
                  type="submit"
                  className="btn btn-primary flex items-center gap-x-2"
                >
                  {isLoading() && <ButtonLoader />}
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
