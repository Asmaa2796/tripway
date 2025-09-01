import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addSalesAccount,
  clearState,
} from "../../../redux/Slices/SalesAccountsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddSalesAccount = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    status: "",
  });
  const { isLoading, error, success } = useSelector(
    (state) => state.sales_accounts
  );
  useEffect(() => {
    setTitle(t("sidenav.addSalesAccount"));
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
    dispatch(addSalesAccount(formData));
    setFormData({
      name_ar: "",
      name_en: "",
      status: "",
    });
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "sales_accounts/clearState" }); // Clear after toast
          navigate("/sales_accounts");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "sales_accounts/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      {/* form */}
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
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select
              className="input-bg w-100"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
                <option value="" disabled> {t('labels.selectItem')} </option>
                <option value="active"> {t('labels.active')} </option>
                <option value="inactive"> {t('labels.inactive')} </option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button className="btn show_all">{t("btns.add")}</button>
        </div>
      </form>
    </>
  );
};

export default AddSalesAccount;
