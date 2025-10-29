import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import "./vendors.css";

// import PhoneInput from "./PhoneInput";
import { addSupplier, clearState } from "../../redux/Slices/SuppliersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const AddVendor = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    phone: "",
    activity: "",
    resource_type: "",
    account_type: "",
    status: "",
  });
  useEffect(() => {
    setTitle(
      `${t("labels.purchaseSuppliers")} > ${t("labels.addPurchaseSupplier")}`
    );
    document.title = `${t("labels.purchaseSuppliers")} > ${t("labels.addPurchaseSupplier")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.suppliers);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addSupplier(formData));
    console.log(formData);
    // setFormData({
    //   name_ar: "",
    //   name_en: "",
    //   phone: "",
    //   activity: "",
    //   resource_type: "",
    //   account_type: "",
    //   status: "",
    // });
  };
  useEffect(() => {
  if (success) {
    toast.success(t("labels.addedSuccessfully"), {
      onClose: () => navigate("/suppliers"),
    });
  }

  if (error) {
    const errorMsg = typeof error === "string" ? error : error?.message;
    if (errorMsg === "The phone has already been taken.") {
      toast.error(t("phoneTaken"));
    } else {
      toast.error(t("labels.failedToAdd"));
    }

    dispatch(clearState());
  }

}, [success, error, t, dispatch, navigate]);


  return (
    <>
    <div style={{textAlign:i18n.language === "ar"?"left":"right"}}>
        <Link to="/suppliers" className="btn btn-dark btn-sm text-white">
          {t("btns.back")} <i className={`bi bi-arrow-${i18n.language === "ar"?"left":"right"} text-xs`}></i>
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
              required
              className="input-bg"
              value={formData.name_ar}
              name="name_ar"
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light"> {t("labels.nameEnglish")} </label>
            <input
              type="text"
              required
              className="input-bg"
              value={formData.name_en}
              name="name_en"
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.phone")}</label>
            {/* <PhoneInput value={formData.phone} onChange={handleChange} /> */}
            <input
              name="phone"
              required
              onChange={handleChange}
              value={formData.phone}
              className="w-100 input-bg"
            />
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.activity")}</label>
            <select
              name="activity"
              required
              value={formData.activity}
              onChange={handleChange}
              className="w-100 input-bg"
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {activities &&
                activities.map((act) => (
                  <option key={act?.id} value={act?.name}>
                    {act?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.supplierType")}</label>
            <select
              name="resource_type"
              required
              value={formData.resource_type}
              onChange={handleChange}
              className="w-100 input-bg"
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="fuel">{t("labels.fuel")}</option>
              <option value="maintenance">{t("labels.maintenance")}</option>
              <option value="purchases">{t("labels.purchases")}</option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.accountType")}</label>
            <select
              name="account_type"
              required
              value={formData.account_type}
              onChange={handleChange}
              className="w-100 input-bg"
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="other_creditors">
                {t("labels.otherCreditors")}
              </option>
              <option value="other_debtors">{t("labels.otherDebitors")}</option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select
              name="status"
              required
              onChange={handleChange}
              value={formData.status}
              className="w-100 input-bg"
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="1">{t("labels.active")}</option>
              <option value="0">{t("labels.inactive")}</option>
            </select>
          </div>

          {/* <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.status')}</label>
            <label className="toggle">
              <input className="toggle-checkbox" type="checkbox" />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div> */}

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

export default AddVendor;
