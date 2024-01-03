import React, { useState } from "react";
import { useParams } from "react-router-dom";

const FinishSignUpLayout = () => {
  const param = useParams();
  const [finishsignup, setFinishSignup] = useState({
    referenceNumber: "",
    isLoading: false,
  });

  return (
    <form className="signup-confirmation">
      <div className="check-mail flex align-center gapx-4 mbs-4 mbe-8">
        <div className="email-container ">
          <img src="/codefend/check_email.png" alt="mail-image" />
        </div>
        <div className="text-container">
          <span>we have sent you an email with a code!</span>
          <p>
            please check your inbox, copy the verification code and paste it in
            the field below to confirm your email
          </p>
        </div>
      </div>
      <div className="mbs-2 flex col">
        <label className="otp-label" htmlFor="otp">
          Reference Number
        </label>
        <input
          id="otp"
          type="text"
          onChange={(e) => {
            setFinishSignup((current) => ({
              ...current,
              referenceNumber: e.target.value,
            }));
          }}
          className="full-w"
          name="otp"
          placeholder="Enter Reference Number here"
          required
        />
      </div>
      <div className="mbs-6 flex align-center gapx-4 content-end ">
        <button
          onClick={() => {}}
          disabled={finishsignup.isLoading}
          type="button"
          className="btn btn-tertiary flex align-center gapx-2 "
        >
          assistance
        </button>
        <button
          disabled={finishsignup.isLoading}
          type="submit"
          className="btn btn-primary flex align-center gapx-2"
        >
          {finishsignup.isLoading && <p>Button Loading ... </p>}
          proceed
        </button>
      </div>
    </form>
  );
};

export default FinishSignUpLayout;
