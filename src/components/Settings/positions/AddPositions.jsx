import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addPosition, clearState } from "../../../redux/Slices/PositionsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPositions = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
  });

  const { isLoading, error, success } = useSelector((state) => state.positions);

  useEffect(() => {
    setTitle(`${t("sidenav.ClientPosition")} > ${t("labels.addPosition")}`);
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
    dispatch(addPosition(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/positions");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
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
          {isLoading ? t("labels.loading") : t("btns.add")}
        </button>
      </div>
    </form>
  );
};

export default AddPositions;
