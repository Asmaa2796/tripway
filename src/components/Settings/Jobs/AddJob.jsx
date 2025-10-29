import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { addJob, clearState } from "../../../redux/Slices/JobsSlice";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCompanyManagements } from "../../../redux/Slices/CompanyManagementsSlice";
const AddFileArchiveTypes = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    company_management_id: "",
  });
  useEffect(() => {
    setTitle(`${t("sidenav.jobs")} > ${t("labels.addJob")}`);
    document.title = `${t("sidenav.jobs")} > ${t("labels.addJob")}`;
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector(
    (state) => state.job_company_managements
  );
  const { companyManagements } = useSelector(
    (state) => state.company_managements
  );

  useEffect(() => {
    dispatch(fetchCompanyManagements());
  }, [dispatch, t, i18n.language, success]);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const jobData = {
    name_ar: formData.name_ar,
    name_en: formData.name_en,
    company_management_id: formData.company_management_id,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addJob(jobData));
    setFormData({
      name_ar: "",
      name_en: "",
      company_management_id: "",
    });
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          navigate("/job_company_managements");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "job_company_managements/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
    <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link
          to="/job_company_managements"
          className="btn btn-dark btn-sm text-white mb-2"
        >
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="table_form form-style my-3 py-3 div-bg"
      >
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.nameArabic")}</label>
            <input
              type="text"
              className="input-bg"
              value={formData.name_ar}
              name="name_ar"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light"> {t("labels.nameEnglish")} </label>
            <input
              type="text"
              className="input-bg"
              required
              value={formData.name_en}
              name="name_en"
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light"> {t("sign.management")} </label>
            <select
              className="w-100 input-bg"
              onChange={handleChange}
              required
              value={formData.company_management_id}
              name="company_management_id"
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {companyManagements && companyManagements.length > 0 ? (
                companyManagements.map((option, index) => (
                  <option key={option.id || index} value={option.id}>
                    {option.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button type="submit" className="btn px-4 save">
              {t("btns.add")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddFileArchiveTypes;
