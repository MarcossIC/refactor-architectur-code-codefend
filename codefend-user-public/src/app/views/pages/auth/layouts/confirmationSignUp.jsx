import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ConfirmationSignUp = () => {
  const param = useParams();
  const [finishsignup, setFinishSignup] = useState({
    referenceNumber: "",
    isLoading: false,
  });

  return (
    <form className="signup-confirmation">
      <div className="check-mail flex items-center gap-x-4 mt-4 mb-8">
        <div className="w-40">
          <img
            className="w-[5dvw] aspect-square"
            src="/codefend/check_email.png"
            alt="mail-image"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-bold text-lg">
            we have sent you an email with a code!
          </span>
          <p>
            please check your inbox, copy the verification code and paste it in
            the field below to confirm your email
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
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
          className="w-full"
          name="otp"
          placeholder="Enter Reference Number here"
          required
        />
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-4 ">
        <button
          onClick={() => {}}
          disabled={finishsignup.isLoading}
          type="button"
          className="btn btn-tertiary flex items-center gap-x-2 "
        >
          assistance
        </button>
        <button
          disabled={finishsignup.isLoading}
          type="submit"
          className="btn btn-primary flex items-center gap-x-2"
        >
          {finishsignup.isLoading && <p>Button Loading ... </p>}
          proceed
        </button>
      </div>
    </form>
  );
};

export default ConfirmationSignUp;
