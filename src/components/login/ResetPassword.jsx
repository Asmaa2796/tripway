import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, resetPasswordFunc } from "../../redux/Slices/authSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resetInputs, setResetInputs] = useState({
    email: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const { isLoading, error, success } = useSelector((state) => state.auth);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Password length validation
    if (resetInputs.new_password.length < 8) {
      toast.error(t("password_must_be_at_least_8_chars"));
      return;
    }

    // Passwords match validation
    if (resetInputs.new_password !== resetInputs.new_password_confirmation) {
      toast.error(t("passwords_do_not_match"));
      return;
    }
    dispatch(resetPasswordFunc(resetInputs));
  };

  useEffect(() => {
    if (error) {
      toast.error(t("failed_to_reset_password"));
      dispatch(clearState());
    }

    if (success) {
      toast.success(t("password_changed_successfully"), {
        onClose: () => {
          localStorage.removeItem("verified");
          window.location.href = "/login";
        },
      });
      dispatch(clearState());
    }
  }, [error, success, dispatch, t, navigate]);

  return (
    <form onSubmit={handleSubmit} className="form-style form-div my-3">
      <h5 className="text-center text-md fw-bold main-color">
        <i className="bi bi-shield-lock text-lg"></i>
        <span className="d-block my-3">{t("reset_password")}</span>
      </h5>
      <label className="text-dark fw-bold">{t("sign.email")}</label>
      <input
        autoComplete="off"
        type="email"
        name="email"
        placeholder={t("sign.email")}
        value={resetInputs.email}
        onChange={handleChange}
        required
      />

      <label className="text-dark fw-bold">{t("new_password")}</label>
      <input
        autoComplete="off"
        type="password"
        name="new_password"
        placeholder={t("new_password")}
        value={resetInputs.new_password}
        onChange={handleChange}
        required
      />

      <label className="text-dark fw-bold">{t("confirm_new_password")}</label>
      <input
        autoComplete="off"
        type="password"
        name="new_password_confirmation"
        placeholder={t("confirm_new_password")}
        value={resetInputs.new_password_confirmation}
        onChange={handleChange}
        required
      />

      <div className="text-center mt-3">
        <button
          type="submit"
          className="btn btn-sm show_all text-white text-sm"
          style={{ backgroundColor: "var(--green-color)" }}
          disabled={isLoading}
        >
          {isLoading ? t("sign.loading") : t("btns.send")}
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
