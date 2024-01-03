import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignInLayout = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",

    isLoading: false,
  });

  return (
    <form>
      <div>
        <input
          type="email"
          onChange={(e) =>
            setSigninForm((current) => ({ ...current, email: e.target.value }))
          }
          className="w-full"
          placeholder="Email address"
          autoComplete="email"
          required
        />
      </div>

      <div className="mt-2">
        <input
          type="password"
          onChange={(e) =>
            setSigninForm((current) => ({
              ...current,
              password: e.target.value,
            }))
          }
          className="w-full"
          placeholder="Password"
          required
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={signinForm.isLoading}
          className="btn btn-primary"
        >
          proceed
        </button>

        <div className="mt-6 text-center hover:underline">
          <Link to="/auth/signup" className="text-sm codefend-text-red">
            Don’t have an account yet? Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInLayout;
