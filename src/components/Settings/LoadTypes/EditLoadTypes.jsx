import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateLoadTypes,loadTypesRecord, clearState } from "../../../redux/Slices/LoadTypesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditLoadTypes = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: ""
  });
  const { isLoading, error, success,record } = useSelector((state) => state.loadTypes);
  useEffect(() => {
    setTitle(`${t("sidenav.loadTypes")} > ${t("labels.edit")}`);
    document.title = `${t("sidenav.loadTypes")} > ${t("labels.edit")}`;
    dispatch(loadTypesRecord(id));
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language,id]);
  useEffect(() => {
   if(record) {
    setFormData({
        name_ar:record.name_ar,
        name_en:record.name_en
    })
   }
  }, [record]);
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
    dispatch(updateLoadTypes({id,formData}));
 
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "loadTypes/clearState" }); // Clear after toast
          navigate("/load_types");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "loadTypes/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/load_types" className="btn btn-dark btn-sm text-white mb-2">
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
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="row align-items-center">
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

export default EditLoadTypes;
