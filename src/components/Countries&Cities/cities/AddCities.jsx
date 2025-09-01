import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch"; // استيراد Switch
import { addCity, clearState } from "../../../redux/Slices/CitiesSlice";
import { fetchAllCountries } from "../../../redux/Slices/CountriesSlice";
import { fetchAllRegions } from "../../../redux/Slices/RegionSlice";
import { useTitle } from "../../../context/TitleContext";

const AddCities = () => {
  const { t,i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 useEffect(() => {
    setTitle(`${t("sidenav.cities")} > ${t("labels.addCity")}`);
  }, [setTitle, t, i18n.language]);
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
  const { allRegions } = useSelector((state) => state.regions);
  const { error, isLoading, success } = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllRegions());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglerChange = (checked) => {
    setFormData((prev) => ({ ...prev, winch_city: checked ? "active" : "inactive" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addCity(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/cities");
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
    <form onSubmit={handleSubmit} className="form-style my-3 p-3 bg-white rounded">
      <div className="form-group">
        <label>{t("labels.nameArabic")}</label>
        <input
          type="text"
          name="name_ar"
          className="form-control"
          value={formData.name_ar}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>{t("labels.nameEnglish")}</label>
        <input
          type="text"
          name="name_en"
          className="form-control"
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
        <label>{t("labels.ranking")}</label>
        <input
          type="number"
          name="arrangement"
          className="form-control"
          value={formData.arrangement}
          onChange={handleChange}
          required
        />
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
       <button style={{background : "#006a53", color : "white"}} className="btn  mt-3" type="submit" disabled={isLoading}>
        {isLoading ? t("labels.loading") : t("btns.add")}
      </button>
     </div>
    </form>
  );
};

export default AddCities;
