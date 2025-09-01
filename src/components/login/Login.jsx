import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  sendVerifyCodeFunc,
  clearState,
} from "../../redux/Slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, loading, user, error, success } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email_to_verify, setEmail_to_verify] = useState("");

  useEffect(() => {
    setTitle(t("sign.login"));

    if (user) {
      window.location.href = "/";
    }
  }, [setTitle, t, i18n.language, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("sign.fillFields"));
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((res) => {
        toast.success(t("sign.loginSuccess"));
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      })
      .catch((err) => {
        toast.error(t("sign.invalid_credentials") || err?.message);
      });
  };

  const sendVerifyCode = (e) => {
    e.preventDefault();
    dispatch(sendVerifyCodeFunc(email_to_verify));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("email_verified_successfully"));
      setTimeout(() => {
        document.body.classList.remove("modal-open");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
        const modalEl = document.getElementById("forgotPassword");
        if (modalEl) modalEl.classList.remove("show");

        window.location.href = "/verify_code";
        dispatch(clearState());
      }, 1000);
    }

    if (error) {
      toast.error(t("failed_to_verify_email"));
      dispatch(clearState());
    }
  }, [success, error, navigate, dispatch]);
  return (
    <>
      <div className="container">
        <form
          className="table_form form-style my-3 py-3"
          onSubmit={handleSubmit}
        >
          <div className="form-div">
            <div className="text-center my-3">
              <Link to="/">
                <img
                  src="/img/fav.png"
                  alt="tripway"
                  style={{ width: "auto", maxHeight: "60px" }}
                />
              </Link>
            </div>
            <h5>{t("sign.login")}</h5>
            <label>{t("sign.email")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("sign.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>{t("sign.password")}</label>
            <input
              type="password"
              name="password"
              placeholder={t("sign.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-center">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#forgotPassword"
                className="btn text-secondary px-0 py-3 m-0"
              >
                {t("sign.forgotPassword")}
              </button>
            </div>
            <button
              type="submit"
              className="d-block w-100"
              disabled={isLoading}
            >
              {isLoading ? t("sign.loading") : t("sign.login")}
            </button>
          </div>
        </form>
      </div>
      <div
        className="modal fade"
        id="forgotPassword"
        tabIndex="-1"
        aria-labelledby="forgotPasswordLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close btn-sm text-xs"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body form-style">
              <h5 className="text-center text-md fw-bold main-color">
                <i className="bi bi-envelope text-lg"></i>
                <span className="d-block my-3">
                  {t("send_email_to_verify")}
                </span>
              </h5>
              <form onSubmit={sendVerifyCode}>
                <label className="text-sm fw-bold">{t("sign.email")}</label>
                <input
                  placeholder="example@gmail.com"
                  required
                  value={email_to_verify}
                  onChange={(e) => setEmail_to_verify(e.target.value)}
                  type="email"
                  className="input-bg"
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn mt-2 show_all btn-sm text-sm text-white"
                    style={{ backgroundColor: "var(--green-color)" }}
                    disabled={isLoading}
                  >
                    {loading ? t("labels.loading") : t("btns.send")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
