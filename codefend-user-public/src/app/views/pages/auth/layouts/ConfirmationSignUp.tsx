import React, { useState } from "react";
import { useNavigate } from "react-router";

const ConfirmationSignUp: React.FC = () => {
  const navigate = useNavigate()
  const [finishsignup, setFinishSignup] = useState({
    referenceNumber: "",
    isLoading: false,
  });

  const handleCompleteSignup = async (e: any) => {
    e.preventDefault();
    navigate(`/auth/signup/${finishsignup.referenceNumber}`);
  };

  return (
    <form onSubmit={handleCompleteSignup} className="signup-confirm">
      <div className="check-mail">
        <div className="check-mail_img">
          <img src="/codefend/check_email.png" alt="mail-image" />
        </div>
        <div className="check-mail_text">
          <span>we have sent you an email with a code!</span>
          <p>
            please check your inbox, copy the verification code and paste it in
            the field below to confirm your email
          </p>
        </div>
      </div>
      <div className="confirm-input">
        <label htmlFor="otp">Reference Number</label>
        <input
          id="otp"
          type="text"
          onChange={(e) => {
            setFinishSignup((current) => ({
              ...current,
              referenceNumber: e.target.value,
            }));
          }}
          name="otp"
          placeholder="Enter Reference Number here"
          required
        />
      </div>
      <div className="confirm-button">
        <button
          onClick={() => {}}
          disabled={finishsignup.isLoading}
          type="button"
          className="btn btn-tertiary"
        >
          Assistance
        </button>
        <button
          disabled={finishsignup.isLoading}
          type="submit"
          className="btn btn-primary"
        >
          {finishsignup.isLoading && <p>Button Loading ... </p>}
          Proceed
        </button>
      </div>
    </form>
  );
};

export default ConfirmationSignUp;
