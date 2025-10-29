import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  orderIssueTypesRecord,
  updateRecord,
  clearState,
} from "../../../redux/Slices/OrderIssueTypesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EditOrderIssueTypes = () => {
  const { t, i18n } = useTranslation("global");
  const {id} = useParams();
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: ""
  });
  useEffect(() => {
    setTitle(`${t("sidenav.orderIssueTypes")} > ${t("labels.edit")}`);
    document.title = `${t("sidenav.orderIssueTypes")} > ${t("labels.edit")}`;
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { record,isLoading, error, success } = useSelector((state) => state.order_issue_types);
  // get single record
useEffect(() => {
    dispatch(orderIssueTypesRecord(id));
}, [dispatch, id, t, i18n.language]);
useEffect(() => {
  if (record) {
    setFormData({
      name_ar: record.name_ar,
      name_en: record.name_en
    });
  }
}, [record]);
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
    dispatch(updateRecord({id,formData}));
    setFormData({
      name_ar: "",
      name_en: ""
    });
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          navigate("/order_issue_types");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "order_issue_types/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link
          to="/order_issue_types"
          className="btn btn-dark btn-sm text-white mb-2"
        >
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
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
              required
              name="name_en"
              onChange={handleChange}
            />
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button className="btn show_all" disabled={isLoading}>
              {isLoading ? t("labels.loading") : t("btns.save")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditOrderIssueTypes;
