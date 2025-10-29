import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from 'react-i18next';
import { addFileArchiveTypes, clearState } from "../../../redux/Slices/FileArchiveTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddFileArchiveTypes = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
        name_ar: "",
        name_en: ""
  });
  useEffect(() => {
    setTitle(t('labels.addFileArchiveTypes'));
    document.title = t('labels.addFileArchiveTypes');
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
    const { isLoading, error,success } = useSelector(
      (state) => state.file_archive_types
    );
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
    dispatch(addFileArchiveTypes(formData));
    setFormData({
      name_ar: "",
      name_en: ""
    });
  };
    useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          navigate("/file_archive_types");
        },
      });
    }
  
    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "file_archive_types/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link
          to="/file_archive_types"
          className="btn btn-dark btn-sm text-white"
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
              value={formData.name_en}
              name="name_en"
              onChange={handleChange}
              required
            />
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
