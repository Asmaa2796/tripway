import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateFurnitureQuestions, clearState ,furnitureQuestionsRecord} from "../../../redux/Slices/FurnitureQuestionsSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const EditFurnitureQuestions = () => {
  const { t, i18n } = useTranslation("global");
  const { id } = useParams();
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  title_ar: "",
  title_en: "",
  answer_ar: "",
  answer_en: "",
  property_type: ""
});

  const { isLoading, error, success,record } = useSelector((state) => state.furniture_questions);
  useEffect(() => {
    if(record) {
        setFormData({
            title_ar: record?.title_ar,
            title_en: record?.title_en,
            answer_ar: record?.answers[0]?.answer_ar,
            answer_en: record?.answers[0]?.answer_en,
            property_type: record?.answers[0]?.property_type
        });
    }
}, [record]);
  useEffect(() => {
    setTitle(`${t("sidenav.furniture_questions")} > ${t("labels.edit")}`);
    dispatch(furnitureQuestionsRecord(id));
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

  const payload = {
    title_ar: formData.title_ar,
    title_en: formData.title_en,
    answers: [
      {
        property_type: formData.property_type,
        answer_ar: formData.answer_ar,
        answer_en: formData.answer_en
      }
    ]
  };

  dispatch(updateFurnitureQuestions({id,payload}));
};

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "furniture_questions/clearState" }); // Clear after toast
          navigate("/furniture_questions");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "furniture_questions/clearState" }),
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
            <h5 className="fw-bold text-md main-color">
              <i className="bi bi-question-circle"></i> {t("labels.question")}
            </h5>
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.title_ar")}</label>
            <input
              type="text"
              className="input-bg"
              name="title_ar"
              value={formData.title_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.title_en")}</label>
            <input
              type="text"
              className="input-bg"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <br/>
            <h5 className="fw-bold text-md main-color">
              <i className="bi bi-chat-dots"></i> {t("labels.answer")}
            </h5>
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.answer_ar")}</label>
            <input 
            type="text"
              className="input-bg"
              name="answer_ar"
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
              name="answer_en"
              value={formData.answer_en}
              onChange={handleChange}
              required
              />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.type")}</label>
            <select 
              className="input-bg w-100"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
              >
                <option value="" disabled>{t("labels.selectItem")}</option>
                <option value="apartment">{t("labels.apartment")}</option>
                <option value="villa">{t("labels.villa")}</option>
                <option value="house">{t("labels.house")}</option>
                <option value="shop">{t("labels.shop")}</option>
                <option value="office">{t("labels.office")}</option>
              </select>
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

export default EditFurnitureQuestions;
