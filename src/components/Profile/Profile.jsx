import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  changePassword,
  clearState,
} from "../../redux/Slices/ProfileSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import ProfileLoader from '../../pages/ProfileLoader'
const Profile = () => {
  const { t, i18n } = useTranslation("global");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: profileData,
    status,
    error,
    success,
    successChanged
  } = useSelector((state) => state.profile);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    email: "",
    phone: "",
    image: "",
  });
  const [passwordData, setPasswordData] = useState({
    new_password: "",
  });
 const user = JSON.parse(localStorage.getItem("userElwnsh"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    if (!profileData) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profileData, i18n.language]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        image: profileData.image || "",
        role_name: profileData.role_name || "",
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (success === "PROFILE_UPDATED") {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          dispatch(fetchProfile());
          setEditMode(false);
        },
      });
    }

    if (success === "PASSWORD_CHANGED") {
      toast.success(t("labels.passwordChanged"), {
        onClose: () => dispatch(clearState()),
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [status, success, error, t, dispatch]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());

    const payload = new FormData();
    payload.append("name_ar", formData.name_ar);
    payload.append("name_en", formData.name_en);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);

    if (formData.image instanceof File) {
      payload.append("image", formData.image);
    }

    dispatch(updateProfile(payload));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwordData.new_password.length < 8) {
    toast.error(t("labels.passwordTooShort")); 
    return;
  }
    dispatch(clearState());
    dispatch(changePassword(passwordData));
    setPasswordData({
      new_password: "",
    });
  };

  return (
    <div className="profile-container" style={{textAlign:i18n.language === "en"?"left":"right"}}>
      <div className="profile-header">
        <h5 style={{ fontWeight: "bold" }}>{t("labels.profileTitle")}</h5>
        <div>
          <button
            className={`btn mb-2 ${
              editMode ? "btn-danger" : "btn-primary"
            } p-2 text-white btn-sm d-flex align-items-center gap-2`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? (
              <>
                <i className="bi bi-x-circle"></i>
                <span>{t("labels.cancel")}</span>
              </>
            ) : (
              <>
                <i className="bi bi-pen"></i>
                <span>{t("labels.editProfile")}</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="profile-content">
        {status === "loading" && !profileData ? (
          <ProfileLoader/>
        ) : editMode ? (
          <form className="profile-form" onSubmit={handleFormSubmit}>
            <div className="form-row">
              <label className="my-2 text-sm">{t("labels.nameArabic")}</label>
              <input
                type="text"
                name="name_ar"
                value={formData.name_ar}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label className="my-2 text-sm">{t("labels.nameEnglish")}</label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label className="my-2 text-sm">{t("labels.email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label className="my-2 text-sm">{t("labels.phone")}</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <label className="my-2 text-sm">{t("labels.profileImage")}</label>
              <input
                type="file"
                name="image"
                accept=".jpeg,.jpg,.png,.gif,.svg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const allowedExtensions = [
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                      "image/gif",
                      "image/svg+xml",
                    ];
                    if (!allowedExtensions.includes(file.type)) {
                      toast.error(
                        `${t("only_allowed")} jpeg, png, jpg, gif, or svg.`
                      );
                      e.target.value = "";
                      return;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      image: file,
                    }));
                  }
                }}
              />

              <img
                src={
                  formData.image instanceof File
                    ? URL.createObjectURL(formData.image)
                    : profileData.image
                }
                alt={t("labels.profileImage")}
                className="profile-image"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-sm save save-btn text-white py-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>{t("labels.loading")}</>
                ) : (
                  t("btns.saveChanges")
                )}
              </button>
            </div>
          </form>
        ) : (
          profileData && (
            <div className="profile-card">
              <img
                src={profileData.image}
                alt={t("labels.profileImage")}
                className="profile-image"
              />
              <div className="profile-info">
                <p className="text-sm">
                  <strong>{t("sign.name")}:</strong> {profileData.name}
                </p>
                <p className="text-sm" style={{ wordBreak: "break-all" }}>
                  <strong>{t("labels.email")}:</strong> {profileData.email}
                </p>
                <p className="text-sm">
                  <strong>{t("labels.phone")}:</strong> {profileData.phone}
                </p>
                <p className="text-sm">
                  <strong>{t("labels.role")}:</strong>{" "}
                  <span className="custom-span1">{profileData.role_name}</span>
                </p>
              </div>
            </div>
          )
        )}

        <hr />
        <div className="password-change-form" style={{ margin: "30px 0" }}>
          <h5
            style={{ fontWeight: "bold", color: "var(--green-color)" }}
            className="my-4"
          >
            {t("sign.changePassword")}
          </h5>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-row">
              <label
                className="text-sm fw-bold"
                style={{ fontWeight: "normal" }}
              >
                {t("labels.newPassword")}
              </label>
              <input
                type="password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-sm save save-btn text-white py-2"
                disabled={status === "loading"}
              >
                {status === "successChanged" ? (
                  <>
                    {t("labels.loading")}
                  </>
                ) : (
                  t("sign.changePassword")
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
