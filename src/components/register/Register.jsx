import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles, registerUser, clearState, fetchManagements } from "../../redux/Slices/authSlice";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const { roles, isLoading, error, success } = useSelector((state) => state.auth);
const {managements}  = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    job: "",
    role_id: "",
    company_management_id: "",
    profile_picture: null,
  });

  useEffect(() => {
    setTitle(t("sign.register"));
    dispatch(fetchRoles());
    dispatch(fetchManagements());
  }, [setTitle, t, dispatch, i18n.language]);

  useEffect(() => {
    if (success || error) {
      setTimeout(() => dispatch(clearState()), 3000);
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  for (const key in formData) {
    formDataToSend.append(key, formData[key]);
  }

  dispatch(registerUser(formDataToSend))
    .unwrap()
    .then((res) => {
      toast.success(t('sign.registrationSuccessful'));
      setTimeout(() => {
        navigate("/login"); 
      }, 1500);
    })
    .catch((err) => {
      toast.error(t('sign.registrationFailed') || err?.message);
    });
};

  return (
    <div className="container">
      <form className="table_form form-style my-3 py-3" onSubmit={handleSubmit}>
        <div className="form-div">
          <div className="text-center my-3">
            <Link to="/">
              <img src="/img/fav.png" alt="tripway" style={{ width: "auto", maxHeight: "60px" }} />
            </Link>
          </div>
          <h5>{t("sign.createAccount")}</h5>
          {/* Fields */}
          <label>{t("sign.name")}</label>
          <input type="text" name="name" required placeholder={t("sign.name")} onChange={handleChange} />
          <label>{t("sign.email")}</label>
          <input type="email" name="email" required placeholder={t("sign.email")} onChange={handleChange} />
          <label>{t("sign.phone")}</label>
          <input type="text" name="phone" required placeholder={t("sign.phone")} onChange={handleChange} />
          <label>{t("sign.password")}</label>
          <input type="password" name="password" required placeholder={t("sign.password")} onChange={handleChange} />
          <label>{t("sign.confirmPassword")}</label>
          <input type="password" name="password_confirmation" required placeholder={t("sign.confirmPassword")} onChange={handleChange} />
          <label>{t("sign.job")}</label>
          <input type="text" name="job" placeholder={t("sign.job")} required onChange={handleChange} />
          <label>{t("sign.role")}</label>
          <select name="role_id" required onChange={handleChange}>
            <option value="">{t("sign.selectRole")}</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <label>{t("sign.management")}</label>
          <select name="company_management_id" required onChange={handleChange}>
            <option value="">{t("sign.selectManagement")}</option>
            {managements.map((management) => (
              <option key={management.id} value={management.id}>
                {management.name}
              </option>
            ))}
          </select>
          <label>{t("sign.profilePicture")}</label>
          <input type="file"style={{border : 0}} name="profile_picture" onChange={handleFileChange} />
          <button type="submit" className="d-block w-100" disabled={isLoading}>
            {isLoading ? t("sign.loading") : t("sign.register")}
          </button>
          <div className="text-center">
            <b className="text-sm">
              {t("sign.haveAccount")} <Link to="/login" className="text-color mx-1"> {t("sign.login")}</Link>
            </b>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
