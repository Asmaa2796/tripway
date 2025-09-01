import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateServiceCategories,
  serviceCategoriesRecord,
  clearState,
} from "../../../redux/Slices/ServiceCategoriesSlice";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTitle } from "../../../context/TitleContext";
const AddServiceCategories = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTitle(`${t("labels.serviceCategories")} > ${t("labels.edit")}`);
    dispatch(serviceCategoriesRecord(id));
  }, [setTitle, t, i18n.language]);
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
  });
  const { isLoading, success, record, error } = useSelector(
    (state) => state.servicesCategories
  );
  useEffect(() => {
    if (record) {
      setFormData({
        name_ar: record?.name_ar,
        name_en: record?.name_en,
      });
    }
  }, [record]);
  const handleUpdateCategory = (e) => {
    e.preventDefault();
    dispatch(updateServiceCategories({ id, formData }));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
      onClose: () => {
        dispatch(clearState());
        navigate("/service_categories");
      },
    });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "servicesCategories/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <div className="add-service-category form-style">
      <form onSubmit={handleUpdateCategory} className="bg-white p-4 rounded">
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
            {isLoading ? t("labels.loading") : t("btns.save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceCategories;