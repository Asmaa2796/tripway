import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getOfficeRecord,
  updateOffice,
} from "../../../redux/Slices/OfficesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditOffices = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    status: "0",
  });

  const { isLoading, error, success, selectedOffice } = useSelector(
    (state) => state.offices
  );

  useEffect(() => {
    if (selectedOffice) {
      setFormData({
        name_ar: selectedOffice.name_ar || "",
        name_en: selectedOffice.name_en || "",
        status: selectedOffice.status === true ? "1" : "0" || "0",
      });
    }
  }, [selectedOffice]);
  useEffect(() => {
    setTitle(`${t("sidenav.Offices")} > ${t("sidenav.editOffice")}`);
    document.title = `${t("sidenav.Offices")} > ${t("sidenav.editOffice")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(getOfficeRecord(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    dispatch(updateOffice({ id, data: formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/offices");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <>
    <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/Offices" className="btn btn-dark btn-sm text-white mb-2">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
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
      <div className="text-center mb-4">
        <button className="btn show_all" disabled={isLoading}>
          {isLoading ? t("labels.loading") : t("btns.save")}
        </button>
      </div>
    </form>
    </>
  );
};

export default EditOffices;
