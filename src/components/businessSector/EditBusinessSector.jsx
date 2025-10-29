import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import "./businessSector.css";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import {
  fetchCities,
  fetchCompanies,
  fetchRoles,
} from "../../redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCountries } from "../../redux/Slices/CountriesSlice";
import {
  updateBusinessSector,
  businessSectorRecord,
  clearState,
} from "../../redux/Slices/BusinessSectorSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditBusinessSector = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const { companies, roles, cities } = useSelector((state) => state.auth);
  const { countries } = useSelector((state) => state.countries);
  const { success, error, isLoading, record } = useSelector(
    (state) => state.businessSector
  );
  console.log(record);
  const companyOptions =
    companies?.data?.map((company) => ({
      value: String(company.id),
      label: company.name,
    })) || [];

  const roleOptions =
    roles?.map((role) => ({
      value: String(role.id),
      label: role.name,
    })) || [];
  const citiesOptions =
    cities?.data?.map((city) => ({
      value: String(city.id),
      label: city.name,
    })) || [];
  const countriesOptions = countries.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  useEffect(() => {
    setTitle(`${t("sidenav.businessList")} > ${t("labels.edit")}`);
    document.title = `${t("sidenav.businessList")} > ${t("labels.edit")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchRoles());
    dispatch(fetchCountries());
    dispatch(fetchCities());
    dispatch(businessSectorRecord(id));
  }, [dispatch, i18n.language, id]);
  // fecth activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(
          "https://winch.brmjatech.co.uk/api/settings/activities",
          {
            headers: {
              Lang: i18n.language,
            },
          }
        );
        setActivities(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivities();
  }, [i18n.language]);
  const activitiesOptions =
    activities?.map((activity) => ({
      value: activity.id,
      label: activity.name,
    })) || [];

  // formdata
  const [formdata, setFormData] = useState({
    company_id: null,
    role_id: null,
    client_type: "",
    nid: "",
    commercial_register_no: "",
    legal_name_ar: "",
    legal_name_en: "",
    branch_ar: "",
    branch_en: "",
    business_type: "",
    commercial_register_no_status: "",
    commercial_registration_issue_date: "",
    vat_no: "",
    activity_id: [],
    country_id: null,
    city_id: null,
    city: "",
    postal_code: "",
    building_no: "",
    secondary_no: "",
    street_ar: "",
    street_en: "",
    district_ar: "",
    district_en: "",
    address_file: null,
    status: "",
  });

  //   fetch record info
  useEffect(() => {
    if (record) {
      setFormData((prev) => ({
        ...prev,
        client_type: record?.general_info?.client_type,
        nid: record?.general_info?.nid,
        business_type: record?.general_info?.business_type,
        commercial_registration_issue_date:
          record?.general_info?.commercial_registration_issue_date,
        commercial_register_no_status:
          record?.general_info?.commercial_register_no_status,
        commercial_register_no: record?.general_info?.commercial_register_no,
        status: record?.general_info?.status,
        vat_no: record?.general_info?.vat_no,
        building_no: record?.address?.building_no,
        city: record?.address?.city,
        postal_code: record?.address?.postal_code,
        address_file: record?.address?.address_file,
        secondary_no: record?.address?.secondary_number,
        company_id: Number(record?.general_info?.company_id) || "",
        company_name: record?.general_info?.company_name || "",
        role_id: Number(record?.general_info?.role_id) || "",
        role_name: record?.general_info?.role_name || "",
        country_id: Number(record?.address?.country_id) || "",
        country_name: record?.address?.country_name || "",
        city_id: Number(record?.address?.city_id) || "",
        city_name: record?.address?.city_name || "",
        activity_id: record?.general_info?.activities?.map((a) => a.id) || [],
      }));
    }
  }, [record]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption, { name, action }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Array.isArray(selectedOption)
        ? selectedOption.map((opt) => opt.value)
        : selectedOption
        ? selectedOption.value
        : name === "activity_id"
        ? []
        : null,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formdata.street_ar.trim() ||
      !formdata.street_en.trim() ||
      !formdata.district_ar.trim() ||
      !formdata.district_en.trim() ||
      !formdata.address_file ||
      !formdata.postal_code.trim() ||
      !formdata.secondary_no.trim()
    ) {
      toast.error(
        t("labels.please_fill_all_required_fields") ||
          "Please fill all required fields"
      );
      return;
    }

    const payload = new FormData();

    for (const key in formdata) {
      if (Object.prototype.hasOwnProperty.call(formdata, key)) {
        const value = formdata[key];
        if (value !== null && value !== undefined) {
          if (key === "activity_id" && Array.isArray(value)) {
            // Convert array to comma-separated string without quotes
            payload.append(key, value.join(","));
          } else {
            payload.append(key, value);
          }
        }
      }
    }

    for (let [key, value] of payload.entries()) {
      console.log(key, value);
    }

    dispatch(updateBusinessSector({ id, payload }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => navigate("/business_sector"),
      });
      dispatch(clearState());
    }

    if (error) {
      if (error === "The country id field is required.") {
        toast.error(t("countryIdRequired") || "Country is required");
      } else if (error === "The city id field is required.") {
        toast.error(t("cityIdRequired") || "City is required");
      } else if (error === "The city field is required.") {
        toast.error(t("cityRequired") || "City field is required");
      } else if (error === "The building no field is required.") {
        toast.error(
          t("buildingNoRequired") || "The building no field is required"
        );
      } else {
        toast.error(t("labels.failedToUpdate") || "Something went wrong");
      }
      dispatch(clearState());
    }
  }, [success, error, navigate, dispatch, t]);
  return (
    <>
     <div style={{textAlign:i18n.language === "ar"?"left":"right"}}>
        <Link to="/business_sector" className="btn btn-dark btn-sm text-white">
          {t("btns.back")} <i className={`bi bi-arrow-${i18n.language === "ar"?"left":"right"} text-xs`}></i>
        </Link>
      </div>
      {/* form */}
      <form className="table_form form-style" onSubmit={handleSubmit}>
        {/* Nav tabs */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="basicInfo-tab"
              data-bs-toggle="tab"
              href="#basicInfo"
              role="tab"
            >
              {t("labels.basicInformation")}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="address-tab"
              data-bs-toggle="tab"
              href="#address"
              role="tab"
            >
              {t("labels.address")}
            </a>
          </li>
        </ul>

        {/* Tab panes */}
        <div className="tab-content mt-3 my-3 py-3 div-bg">
          <div
            className="tab-pane fade show active"
            id="basicInfo"
            role="tabpanel"
          >
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.mainBranch")}</label>
                <Select
                  name="company_id"
                  options={companyOptions}
                  required
                  classNamePrefix="react-select"
                  value={
                    companyOptions.find(
                      (opt) => String(opt.value) === String(formdata.company_id)
                    ) || null
                  }
                  onChange={(selected) =>
                    handleSelectChange(selected, { name: "company_id" })
                  }
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.permission")} </label>
                <Select
                  name="role_id"
                  options={roleOptions}
                  required
                  classNamePrefix="react-select"
                  value={
                    roleOptions.find(
                      (opt) => String(opt.value) === String(formdata.role_id)
                    ) || null
                  }
                  onChange={(selected) =>
                    handleSelectChange(selected, { name: "role_id" })
                  }
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t("labels.clientType")}</label>
                <select
                  name="client_type"
                  required
                  className="w-100 input-bg"
                  onChange={handleChange}
                  value={formdata.client_type}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="private_sector">
                    {t("labels.private_sector")}
                  </option>
                  <option value="government_sector">
                    {t("labels.government_sector")}
                  </option>
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.unifiedNumber")}
                </label>
                <input
                  name="nid"
                  required
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.nid}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.commercialRegistrationNumber")}
                </label>
                <input
                  name="commercial_register_no"
                  required
                  value={formdata.commercial_register_no}
                  onChange={handleChange}
                  className="input-bg"
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.legalNameAr")}</label>
                <input
                  name="legal_name_ar"
                  className="input-bg"
                  required
                  value={formdata.legal_name_ar}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.legalNameEn")}</label>
                <input
                  name="legal_name_en"
                  required
                  className="input-bg"
                  value={formdata.legal_name_en}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.branchAr")}</label>
                <input
                  name="branch_ar"
                  className="input-bg"
                  required
                  value={formdata.branch_ar}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.branchEn")}</label>
                <input
                  name="branch_en"
                  required
                  className="input-bg"
                  value={formdata.branch_en}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.entityType")}</label>
                <select
                  name="business_type"
                  required
                  className="w-100 input-bg"
                  onChange={handleChange}
                  value={formdata.business_type}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="limited_liability_company">
                    {t("labels.limited_liability_company")}
                  </option>
                  <option value="unlimited_liability_company">
                    {t("labels.unlimited_liability_company")}
                  </option>
                  <option value="limited_partnership_company">
                    {t("labels.limited_partnership_company")}
                  </option>
                  <option value="joint_stock_company">
                    {t("labels.joint_stock_company")}
                  </option>
                  <option value="simplified_joint_stock_company">
                    {t("labels.simplified_joint_stock_company")}
                  </option>
                  <option value="foregin_company_branch_categories">
                    {t("labels.foregin_company_branch_categories")}
                  </option>
                  <option value="other">{t("labels.other")}</option>
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.commercialStatus")}
                </label>
                <select
                  name="commercial_register_no_status"
                  onChange={handleChange}
                  required
                  value={formdata.commercial_register_no_status}
                  className="w-100 input-bg"
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="not_selected">
                    {t("labels.not_selected")}
                  </option>
                  <option value="suspended">{t("labels.suspended")}</option>
                  <option value="active">{t("labels.active")}</option>
                  <option value="deleted">{t("labels.deleted")}</option>
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.issueDate")}</label>
                <input
                  type="date"
                  name="commercial_registration_issue_date"
                  value={formdata.commercial_registration_issue_date}
                  onChange={handleChange}
                  className="input-bg"
                  required
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t("labels.activities")}</label>
                <Select
                  name="activity_id"
                  isMulti
                  options={activitiesOptions}
                  classNamePrefix="react-select"
                  required
                  onChange={handleSelectChange}
                  value={activitiesOptions.filter((opt) =>
                    formdata.activity_id?.includes(opt.value)
                  )}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t("labels.taxNumber")} </label>
                <input
                  type="text"
                  name="vat_no"
                  value={formdata.vat_no}
                  onChange={handleChange}
                  required
                  className="input-bg"
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.status")} </label>
                <select
                  name="status"
                  onChange={handleChange}
                  required
                  value={formdata.status}
                  className="input-bg w-100"
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="active">{t("labels.active")}</option>
                  <option value="inactive">{t("labels.inactive")}</option>
                  <option value="pending">{t("labels.pending")}</option>
                </select>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="address" role="tabpanel">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.country")}</label>
                <Select
                  name="country_id"
                  options={countriesOptions}
                  value={
                    countriesOptions.find(
                      (opt) => String(opt.value) === String(formdata.country_id)
                    ) || null
                  }
                  onChange={(selected) =>
                    handleSelectChange(selected, { name: "country_id" })
                  }
                  classNamePrefix="react-select"
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.city")}</label>
                <Select
                  name="city_id"
                  options={citiesOptions}
                  value={
                    citiesOptions.find(
                      (opt) => String(opt.value) === String(formdata.city_id)
                    ) || null
                  }
                  onChange={(selected) =>
                    handleSelectChange(selected, { name: "city_id" })
                  }
                  classNamePrefix="react-select"
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.city_code")}</label>
                <input
                  name="city"
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.city}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.postal_code")}</label>
                <input
                  name="postal_code"
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.postal_code}
                />
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.building_no")}</label>
                <input
                  name="building_no"
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.building_no}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">
                  {t("labels.secondary_number")}
                </label>
                <input
                  name="secondary_no"
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.secondary_no}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.street_ar")}</label>
                <input
                  name="street_ar"
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.street_ar}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.street_en")}</label>
                <input
                  name="street_en"
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.street_en}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.district_ar")}</label>
                <input
                  name="district_ar"
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.district_ar}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.district_en")}</label>
                <input
                  name="district_en"
                  className="input-bg"
                  onChange={handleChange}
                  value={formdata.district_en}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t("labels.address_file")}</label>
                <input
                  name="address_file"
                  type="file"
                  onChange={handleFileChange}
                  className="border-0"
                  accept="image/jpg, image/jpeg, image/png"
                />
                <img
                  src={formdata.address_file || "./image.jpg"}
                  className="img-thumbnail"
                  style={{ width: "90px", height: "90px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn px-4 save" disabled={isLoading}>
              {isLoading ? t("labels.loading") : t("labels.save")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditBusinessSector;
