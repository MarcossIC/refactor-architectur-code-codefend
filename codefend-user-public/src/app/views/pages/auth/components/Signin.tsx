import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginThunk, useAppDispatch } from "../../../../data";

const SignInLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",

    isLoading: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
      <div className="input-group">
        <input
          type="email"
          onChange={(e) =>
            setSigninForm((current) => ({ ...current, email: e.target.value }))
          }
          placeholder="Email address"
          autoComplete="email"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          onChange={(e) =>
            setSigninForm((current) => ({
              ...current,
              password: e.target.value,
            }))
          }
          placeholder="Password"
          required
        />
      </div>

      <div className="extra-group ">
        <button
          type="submit"
          disabled={signinForm.isLoading}
          className="btn btn-primary"
        >
          proceed
        </button>

        <div className="extra-group link-center link-underline">
          <Link to="/auth/signup" className="link codefend-text-red">
            Don’t have an account yet? Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInLayout;
