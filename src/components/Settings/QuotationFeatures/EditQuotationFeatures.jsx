import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateQuotationFeatures,quotationFeaturesRecord, clearState } from "../../../redux/Slices/QuotationFeaturesSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import './Q.css';
const EditQuotationFeatures = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    account_name_ar: "",
    account_name_en: "",
  });

  const { isLoading, error, success,record } = useSelector(
    (state) => state.quotationFeatures
  );

  useEffect(() => {
    setTitle(`${t("sidenav.quotation_features")} > ${t("labels.edit")}`);
    dispatch(quotationFeaturesRecord(id));
  }, [setTitle, t, i18n.language,id]);

  useEffect(() => {
    if(record) {
        setFormData({
            name_ar:record.name_ar,
            name_en:record.name_en,
            account_name_ar:record.account_name_ar,
            account_name_en:record.account_name_en
        });
    }
  }, [record]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuillChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateQuotationFeatures({id,formData}));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "quotationFeatures/clearState" });
          navigate("/quotation_features");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "quotationFeatures/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="row align-items-center">
          {/* Name Arabic */}
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.nameArabic")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
          </div>

          {/* Name English */}
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.nameEnglish")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
            <label className="text-light">{t("labels.account_name_ar")}</label>
            <ReactQuill
              theme="snow"
              value={formData.account_name_ar}
              onChange={(value) => handleQuillChange("account_name_ar", value)}
              style={{ direction: "rtl", textAlign: "right" }}
              className="quill_ar"
              required
            />
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
            <label className="text-light">{t("labels.account_name_en")}</label>
            <ReactQuill
              theme="snow"
              value={formData.account_name_en}
              onChange={(value) => handleQuillChange("account_name_en", value)}
              className="quill_en"
              style={{ direction: "ltr", textAlign: "left" }}
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button className="btn show_all" disabled={isLoading}>
           {isLoading ? t("labels.loading") : t("labels.save")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditQuotationFeatures;
