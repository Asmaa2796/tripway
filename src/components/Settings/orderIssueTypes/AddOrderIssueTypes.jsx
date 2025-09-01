import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  addOrderIssueTypes,
  clearState,
} from "../../../redux/Slices/OrderIssueTypesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddOrderIssueTypes = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: ""
  });
  useEffect(() => {
    setTitle(`${t("sidenav.orderIssueTypes")} > ${t("btns.add")}`);
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.order_issue_types);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addOrderIssueTypes(formData));
    console.log(formData);
    setFormData({
      name_ar: "",
      name_en: ""
    });
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          navigate("/order_issue_types");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "order_issue_types/clearState" }),
      });
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

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button className="btn show_all" disabled={isLoading}>
           {isLoading ? t("labels.loading") : t("btns.add")}
          </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddOrderIssueTypes;
