import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginThunk } from "../../../../data/redux/thunks/auth.thunk";

const SignInLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",

    isLoading: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigninForm((current) => ({ ...current, isLoading: true }));

    const requestParams = {
      email: signinForm.email,
      password: signinForm.password,
    };

    try {
      dispatch(loginThunk(requestParams));
      toast.success(`login successful`);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.");
    } finally {
      setSigninForm((current) => ({ ...current, isLoading: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          onChange={(e) =>
            setSigninForm((current) => ({ ...current, email: e.target.value }))
          }
          className="full-w"
          placeholder="Email address"
          autoComplete="email"
          required
        />
      </div>

      <div className="mbs-2">
        <input
          type="password"
          onChange={(e) =>
            setSigninForm((current) => ({
              ...current,
              password: e.target.value,
            }))
          }
          className="full-w"
          placeholder="Password"
          required
        />
      </div>

      <div className="mbs-6">
        <button
          type="submit"
          disabled={signinForm.isLoading}
          className="btn btn-primary"
        >
          proceed
        </button>

        <div className="mbs-6 link-center link-underline">
          <Link to="/auth/signup" className="link codefend-text-red">
            Don’t have an account yet? Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInLayout;
