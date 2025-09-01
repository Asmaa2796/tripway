import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceCategories,
  clearState,
} from "../../../redux/Slices/ServiceCategoriesSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTitle } from "../../../context/TitleContext";
const AddServiceCategories = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  useEffect(() => {
      setTitle(`${t("labels.serviceCategories")} > ${t("btns.add")}`);
    }, [setTitle, t, i18n.language]);
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, success, error } = useSelector(
    (state) => state.servicesCategories
  );

  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(addServiceCategories(formData));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "servicesCategories/clearState" });
          navigate("/service_categories");
          dispatch(clearState());
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "servicesCategories/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <div className="add-service-category form-style">
      <form onSubmit={handleAddCategory} className="bg-white p-4 rounded">
        <div className="form-group">
          <label>{t("labels.nameArabic")}</label>
          <input
            type="text"
            className="input-bg"
            value={formData.name_ar}
            required
            onChange={(e) =>
              setFormData({ ...formData, name_ar: e.target.value })
            }
            placeholder={t("labels.nameArabic")}
          />
        </div>
        <div className="form-group">
          <label>{t("labels.nameEnglish")}</label>
          <input
            type="text"
            required
            className="input-bg"
            value={formData.name_en}
            onChange={(e) =>
              setFormData({ ...formData, name_en: e.target.value })
            }
            placeholder={t("labels.nameEnglish")}
          />
        </div>

        <div className="text-center my-3">
          <button
            className="btn btn-sm show_all text-white"
            style={{ backgroundColor: "var(--green-color)" }}
            disabled={isLoading}
          >
            {isLoading ? t("labels.loading") : t("btns.add")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceCategories;
