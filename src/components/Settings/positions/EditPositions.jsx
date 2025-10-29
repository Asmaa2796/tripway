import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getPositionRecord, updatePosition } from "../../../redux/Slices/PositionsSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPositions = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
  });

  const { isLoading, error, success, selectedPosition } = useSelector(
    (state) => state.positions
  );

  useEffect(() => {
    if (selectedPosition) {
      setFormData({
        name_ar: selectedPosition.name_ar || "",
        name_en: selectedPosition.name_en || "",
      });
    }
  }, [selectedPosition]);

  useEffect(() => {
    setTitle(`${t("sidenav.ClientPosition")} > ${t("sidenav.editPosition")}`);
    document.title = `${t("sidenav.ClientPosition")} > ${t("sidenav.editPosition")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(getPositionRecord(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updatePosition({ id, data: formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/Positions");
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
        <Link to="/Positions" className="btn btn-dark btn-sm text-white mb-2">
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
          <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
            <label>{t("labels.nameArabic")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
            <label>{t("labels.nameEnglish")}</label>
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
            {isLoading ? t("labels.loading") : t("btns.saveChanges")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPositions;
