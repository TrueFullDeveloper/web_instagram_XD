import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/loader";
import SendEmailForm from "../../components/sendEmailForm";
import VerificationCodeForm from "../../components/verificationCodeForm";
import { selectResetLoading } from "../../store/api/passwordResetSlice";

const PasswordReset = () => {
  const loading = useSelector(selectResetLoading);
  const [resetStep, setResetStep] = useState(1);

  if (loading) {
    return <Loader />;
  }
  if (resetStep === 1) {
    return <SendEmailForm setResetStep={setResetStep} />;
  }
  if (resetStep === 2) {
    return <VerificationCodeForm />;
  }
};

export default PasswordReset;
