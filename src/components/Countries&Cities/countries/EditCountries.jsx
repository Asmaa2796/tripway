import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  fetchCountry,
  updateCountry,
} from "../../../redux/Slices/CountriesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCountries = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    code: "",
    abbreviation: "",
  });

  const { isLoading, error, success, selectedCountry } = useSelector(
    (state) => state.countries
  );

  // Load selected country data into form
  useEffect(() => {
    if (selectedCountry) {
      setFormData({
        name_ar: selectedCountry.name_ar || "",
        name_en: selectedCountry.name_en || "",
        code: selectedCountry.code || "",
        abbreviation: selectedCountry.abbreviation || "",
      });
    }
  }, [selectedCountry]);

  // Set page title
  useEffect(() => {
    setTitle(`${t("sidenav.countries")} > ${t("labels.editCountry")}`);
    document.title = `${t("sidenav.countries")} > ${t("labels.editCountry")}`;
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [t,i18n.language]);

  // Fetch the country record on first load
  useEffect(() => {
    dispatch(fetchCountry(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateCountry({ id, data: formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/countries");
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
        <Link to="/countries" className="btn btn-dark btn-sm text-white">
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
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <label className="text-light">{t("labels.contactCode")}</label>
          <input
            type="text"
            className="input-bg"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder={t("labels.contactCode")}
            required
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <label className="text-light">{t("labels.countryCode")}</label>
          <input
            type="text"
            className="input-bg"
            name="abbreviation"
            value={formData.abbreviation}
            onChange={handleChange}
            placeholder={t("labels.countryCode")}
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

export default EditCountries;
