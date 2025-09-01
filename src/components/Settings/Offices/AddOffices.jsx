import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../../redux/Slices/PositionsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addOffice } from "../../../redux/Slices/OfficesSlice";

const AddOffices = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    status: "0", 
  });

  const { isLoading, error, success } = useSelector((state) => state.positions);

  useEffect(() => {
    setTitle(`${t("sidenav.Offices")} > ${t("labels.addOffice")}`);
  }, [setTitle, t, i18n.language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === "1" ? "0" : "1",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addOffice(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/offices");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="table_form form-style my-3 p-3 rounded bg-white"
    >
      <div className="row align-items-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
          <label className="fw-bold">{t("labels.nameArabic")}</label>
          <input
            type="text"
            className="input-bg"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
          <label className="fw-bold">{t("labels.nameEnglish")}</label>
          <input
            type="text"
            className="input-bg"
            name="name_en"
            value={formData.name_en}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 ">
          <label>{t("labels.status")}</label>
          <label className="toggle">
            <input
              className="toggle-checkbox"
              type="checkbox"
              checked={formData.status === "1"}
              onChange={handleToggle}
            />
            <div className="toggle-switch"></div>
            <span className="toggle-label"></span>
          </label>
        </div>
      </div>
      <div className="text-center mb-3">
        <button className="btn show_all" disabled={isLoading}>
          {isLoading ? t("labels.loading") : t("btns.add")}
        </button>
      </div>
    </form>
  );
};

export default AddOffices;
