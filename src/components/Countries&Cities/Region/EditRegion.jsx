import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  fetchRegion,
  updateRegion,
} from "../../../redux/Slices/RegionSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditRegion = () => {
  const { id } = useParams();
  const { t } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
  });

  const { isLoading, error, success, selectedRegion } = useSelector(
    (state) => state.regions
  );

  // Load selected region data into form
  useEffect(() => {
    if (selectedRegion) {
      setFormData({
        name_ar: selectedRegion.name_ar || "",
        name_en: selectedRegion.name_en || "",
      });
    }
  }, [selectedRegion]);

  // Set page title
  useEffect(() => {
    setTitle(`${t("sidenav.regions")} > ${t("labels.editRegion")}`);
  }, [t]);

  // Fetch the region record on first load
  useEffect(() => {
    dispatch(fetchRegion(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateRegion({ id, data: formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/region");
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
            placeholder={t("labels.nameArabic")}
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
            placeholder={t("labels.nameEnglish")}
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
  );
};

export default EditRegion;
