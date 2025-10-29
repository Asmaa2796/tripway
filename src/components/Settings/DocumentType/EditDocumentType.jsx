import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  clearState,
  documentTypeRecord,
  updateDocumentType,
} from "../../../redux/Slices//DocumentTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EditDocumentType = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    type:""
  });
  useEffect(() => {
    setTitle(`${t("sidenav.documentType")} > ${t('labels.edit')}`);
    document.title = `${t("sidenav.documentType")} > ${t('labels.edit')}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { record, isLoading, error, success } = useSelector(
    (state) => state.document_type
  );
  // get single record
  useEffect(() => {
    dispatch(documentTypeRecord(id));
  }, [dispatch, id, t, i18n.language]);
  useEffect(() => {
    if (record) {
      setFormData({
        name: record.name,
        type:record.type
      });
    }
  }, [record]);

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
      type: formData.type,
    });
    dispatch(clearState());
    dispatch(updateDocumentType({ id, formData }));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          navigate("/document_type");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "document_type/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link
          to="/document_type"
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
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light"> {t("labels.nameEnglish")} </label>
            <input
              type="text"
              className="input-bg"
              value={formData.name_en}
              name="name_en"
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light"> {t("labels.type")} </label>
            <select
              className="input-bg w-100"
              value={formData.type}
              name="type"
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="trips">{t("labels.trips")}</option>
              <option value="rentals">{t("labels.rentals")}</option>
            </select>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button className="btn show_all" disabled={isLoading}>
              {isLoading ? t("labels.loading") : t("btns.save")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditDocumentType;
