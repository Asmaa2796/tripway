import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, verifyCodeFunc } from "../../redux/Slices/authSlice";
import { toast } from "react-toastify";

const VerifyCode = () => {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const { isLoading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length !== 5) {
      toast.error(t("verification_code_must_be_5_digits"));
      return;
    }
    dispatch(verifyCodeFunc(code));
  };

  useEffect(() => {
    if (error) {
      toast.error(t("failed_to_send_verification_code"));
      dispatch(clearState());
    }

    if (success) {
      toast.success(t("verification_code_sent_successfully"), {
        onClose: () => {
          localStorage.setItem("verified", "true");
          navigate("/reset_password", { replace: true });
        },
      });
      dispatch(clearState());
    }
  }, [error, success, dispatch, t, navigate]);
  useEffect(() => {
    const verified = localStorage.getItem("verified");
    if (verified) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  return (
    <form onSubmit={handleSubmit} className="form-style form-div my-3">
      <h5 className="text-center text-md fw-bold main-color">
        <i className="bi bi-shield-lock text-lg"></i>
        <span className="d-block my-3">{t("verification_code")}</span>
      </h5>
      <input
        autoComplete="off"
        type="text"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <div className="text-center">
        <button
          type="submit"
          className="btn show_all text-sm btn-sm"
          disabled={isLoading}
        >
          {isLoading ? t("sign.loading") : t("btns.confirm")}
        </button>
      </div>
    </form>
  );
};

export default VerifyCode;