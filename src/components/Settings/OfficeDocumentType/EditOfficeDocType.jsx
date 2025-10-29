import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  officeDocTypesRecord,
  updateOfficeDoc,
  clearState,
} from "../../../redux/Slices/OfficeDocumentTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditOfficeDocType = () => {
  const { t, i18n } = useTranslation("global");
  const { id } = useParams();
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    type: "",
  });

  const { record, isLoading, error, success } = useSelector(
    (state) => state.office_document_types
  );

  useEffect(() => {
    setTitle(`${t("sidenav.officeDocumentType")} > ${t("labels.edit")}`);
    document.title = `${t("sidenav.officeDocumentType")} > ${t("labels.edit")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  // Fetch the single record
  useEffect(() => {
    dispatch(officeDocTypesRecord(id));
  }, [dispatch, id, t, i18n.language]);

  useEffect(() => {
    if (record) {
      setFormData({
        name_ar: record?.name_ar,
        name_en: record?.name_en,
        type: record?.type || "",
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
    dispatch(clearState());

    dispatch(updateOfficeDoc({ id, formData }));

    setFormData({
      name_ar: "",
      name_en: "",
      type: "",
    });
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => navigate("/office_document_type"),
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
        <Link
          to="/office_document_type"
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
              required
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
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                {" "}
                {t("labels.selectItem")}{" "}
              </option>
              <option value="contracts"> {t("labels.contracts")} </option>
              <option value="establishment">
                {" "}
                {t("labels.establishmentDocuments")}{" "}
              </option>
              <option value="employee">
                {" "}
                {t("labels.employeeDocuments")}{" "}
              </option>
              <option value="driver"> {t("labels.driversDocuments")} </option>
              <option value="vehicle"> {t("labels.vehicleDocuments")} </option>
              <option value="branch"> {t("labels.businessDocs")} </option>
              <option value="owner"> {t("labels.partnersDocuments")} </option>
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

export default EditOfficeDocType;
