import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import "./vendors.css";
// import PhoneInput from "./PhoneInput";
import {
  clearState,
  supplierRecord,
  updateSupplier,
} from "../../redux/Slices/SuppliersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const EditSupplier = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [activities,setActivities] = useState();
  const { id } = useParams();
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
    setTitle(`${t("labels.purchaseSuppliers")} > ${t("labels.editSupplier")}`);
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { supplier, isLoading, error, success } = useSelector(
    (state) => state.suppliers
  );
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
  // get single record
  useEffect(() => {
    dispatch(supplierRecord(id));
  }, [dispatch, id, t, i18n.language]);
  useEffect(() => {
    if (supplier) {
      setFormData({
        name_ar: supplier.name_ar,
        name_en: supplier.name_en,
        phone: supplier.phone,
        activity: supplier.activity,
        resource_type: supplier.resource_type,
        account_type: supplier.account_type,
        status: supplier.status,
      });
    }
  }, [supplier]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      name_ar: supplier.name_ar,
      name_en: supplier.name_en,
      phone: supplier.phone,
      activity: supplier.activity,
      resource_type: supplier.resource_type,
      account_type: supplier.account_type,
      status: supplier.status,
    });
    dispatch(clearState());
    dispatch(updateSupplier({ id, formData }));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          navigate("/vendors");
        },
      });
    }

    if (error) {
      const errorMsg = typeof error === "string" ? error : error?.message;
      if (errorMsg === "The phone has already been taken.") {
        toast.error(t("phoneTaken"));
      } else {
        toast.error(t("labels.failedToUpdate"));
      }

      dispatch(clearState());
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
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
              className="input-bg"
              value={formData.name_ar}
              name="name_ar"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light"> {t("labels.nameEnglish")} </label>
            <input
              type="text"
              className="input-bg"
              value={formData.name_en}
              name="name_en"
              required
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
              value={formData.resource_type}
              onChange={handleChange}
              required
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
              value={formData.account_type}
              required
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
              onChange={handleChange}
              value={formData.status}
              required
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

export default EditSupplier;
