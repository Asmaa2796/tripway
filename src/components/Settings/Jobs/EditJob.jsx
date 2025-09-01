import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  clearState,
  jobRecord,
  updateJob,
} from "../../../redux/Slices/JobsSlice";
import { fetchCompanyManagements } from "../../../redux/Slices/CompanyManagementsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EditJob = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    company_management_id: "",
  });
  useEffect(() => {
    setTitle(`${t("sidenav.jobs")} > ${t("labels.editJob")}`);
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { record, isLoading, error, success } = useSelector(
    (state) => state.job_company_managements
  );
  const { companyManagements } = useSelector(
    (state) => state.company_managements
  );
  useEffect(() => {
    dispatch(fetchCompanyManagements());
  }, [dispatch, t, i18n.language, success]);
  // get single record
  useEffect(() => {
    dispatch(jobRecord(id));
  }, [dispatch, id, t, i18n.language]);
  useEffect(() => {
  if (record && companyManagements.length > 0) {
    const matchedCompany = companyManagements.find(
      (cm) => cm.name === record.company_management
    );

    setFormData({
      name_ar: record.name_ar || "",
      name_en: record.name_en || "",
      company_management_id: matchedCompany ? matchedCompany.id : "",
    });
  }
}, [record, companyManagements]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      name_ar: formData.name_ar,
      name_en: formData.name_en,
      company_management_id: formData.company_management_id,
    });
    dispatch(clearState());
    dispatch(updateJob({ id, formData }));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          navigate("/job_company_managements");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "job_company_managements/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
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
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light"> {t("labels.nameEnglish")} </label>
            <input
              type="text"
              className="input-bg"
              value={formData.name_en}
              name="name_en"
              required
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

export default EditJob;
