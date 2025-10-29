import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { clearState, fetchAllRegions } from "../../../redux/Slices/RegionSlice";
import { fetchAllCountries } from "../../../redux/Slices/CountriesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchCity, updateCity } from "../../../redux/Slices/CitiesSlice";
import Switch from "react-switch";

const EditCities = () => {
  const { id } = useParams();
  const { t,i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    region_id: "",
    country_id: "",
    address_ar: "",
    address_en: "",
    coordinates: "",
    arrangement: "",
    winch_city: "inactive",
  });

  const { allCountries, isLoading: loadingCountries } = useSelector(
    (state) => state.countries
  );
  const { allRegions, isLoading, error } = useSelector(
    (state) => state.regions
  );
  const { selectedCity } = useSelector((state) => state.cities);
  const { updateSuccess } = useSelector((state) => state.cities);

  useEffect(() => {
    if (selectedCity) {
      setFormData({
        name_ar: selectedCity.name_ar || "",
        name_en: selectedCity.name_en || "",
        region_id: selectedCity.region_id || "",
        country_id: selectedCity.country_id || "",
        address_ar: selectedCity.address_ar || "",
        address_en: selectedCity.address_en || "",
        coordinates: selectedCity.coordinates || "",
        arrangement: selectedCity.arrangement || "",
        winch_city: selectedCity.winch_city || "inactive",
      });
    }
  }, [selectedCity]);

  useEffect(() => {
    setTitle(`${t("sidenav.cities")} > ${t("labels.editCity")}`);
    document.title = `${t("sidenav.cities")} > ${t("labels.editCity")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [t, setTitle,i18n.language]);
  useEffect(() => {
    dispatch(fetchCity(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(fetchAllRegions());
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglerChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      winch_city: checked ? "active" : "inactive",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateCity({ id, data: formData }));
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/cities");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [updateSuccess, error, t, dispatch, navigate]);

  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/cities" className="btn btn-dark btn-sm text-white">
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
        <div className="form-group">
          <label>{t("labels.nameArabic")}</label>
          <input
            type="text"
            className="form-control"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("labels.nameEnglish")}</label>
          <input
            type="text"
            className="form-control"
            name="name_en"
            value={formData.name_en}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("labels.region")}</label>
          <select
            name="region_id"
            className="form-control"
            value={formData.region_id}
            onChange={handleChange}
            required
          >
            <option value="">{t("labels.selectRegion")}</option>
            {allRegions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{t("labels.country")}</label>
          <select
            name="country_id"
            className="form-control"
            value={formData.country_id}
            onChange={handleChange}
            required
            disabled={loadingCountries}
          >
            <option value="">{t("labels.selectCountry")}</option>
            {allCountries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{t("labels.ranking")}</label>
          <input
            type="number"
            className="form-control"
            name="arrangement"
            value={formData.arrangement}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("labels.address_ar")}</label>
          <textarea
            name="address_ar"
            className="form-control"
            value={formData.address_ar}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>{t("labels.address_en")}</label>
          <textarea
            type="text"
            name="address_en"
            className="form-control"
            value={formData.address_en}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>{t("labels.coordinates")}</label>
          <input
            type="text"
            name="coordinates"
            className="form-control"
            value={formData.coordinates}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("labels.winchCity")}</label>
          <Switch
            onChange={handleTogglerChange}
            checked={formData.winch_city === "active"}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn show_all" disabled={isLoading}>
            {isLoading ? t("labels.loading") : t("btns.saveChanges")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditCities;
