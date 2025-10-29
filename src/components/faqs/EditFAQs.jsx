import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  updateFaq,
  faqRecord,
} from "../../redux/Slices/FAQsSlice";

import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditFAQs = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ q_ar: "", q_en : "", a_ar: "", a_en : ""});

  const { isLoading, error, success, record } = useSelector(
    (state) => state.faqs
  );

  // Set form data when record is loaded
  useEffect(() => {
    if (record) {
      setFormData({
         question: record.question || "" ,
         answer: record.answer || "" ,
        }
        );
    }
  }, [record]);

  // Set page title (updates on language change)
  useEffect(() => {
    setTitle(`${t("sidenav.faqs")} > ${t("labels.edit")}`);
    document.title = `${t("sidenav.faqs")} > ${t("labels.edit")}`;
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [t.setTitle,i18n.language]);

  // Fetch management record on first load only
  useEffect(() => {
    dispatch(faqRecord(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateFaq({ id,formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/faqs");
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
        <Link to="/faqs" className="btn btn-dark btn-sm text-white">
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
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.question_ar")}</label>
            <input
              type="text"
              className="input-bg"
              name="q_ar"
              value={formData.question_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.question_en")}</label>
            <input
              type="text"
              className="input-bg"
              name="q_en"
              value={formData.question_en}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.answer_ar")}</label>
            <input
              type="text"
              className="input-bg"
              name="a_ar"
              value={formData.answer_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.answer_en")}</label>
            <input
              type="text"
              className="input-bg"
              name="a_en"
              value={formData.answer_en}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button className="btn show_all" disabled={isLoading}>
            {isLoading ? t("labels.loading") : t("btns.save")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditFAQs;
