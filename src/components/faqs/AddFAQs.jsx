import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addfaqs, clearState } from "../../redux/Slices/FAQsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddFAQs = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    q_ar: "",
    q_en: "",
    a_ar: "",
    a_en: "",
  });
  const { isLoading, error, success } = useSelector((state) => state.faqs);
  useEffect(() => {
    setTitle(`${t("sidenav.faqs")} > ${t("btns.add")}`);
  }, [setTitle, t, i18n.language]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addfaqs(formData));
    // setFormData({
    //   q_ar: "",
    //   q_en: "",
    //   a_ar: "",
    //   a_en: "",
    // });
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "faqs/clearState" }); // Clear after toast
          navigate("/faqs");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "faqs/clearState" }),
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
            {isLoading ? t("labels.loading") : t("btns.add")}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddFAQs;
