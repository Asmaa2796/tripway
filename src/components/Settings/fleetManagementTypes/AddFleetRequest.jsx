import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  addFleetRequestTypes,
  clearState,
} from "../../../redux/Slices/FleetManagementTypesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddFleetRequest = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    price: "",
    type: "",
  });
  useEffect(() => {
    setTitle(t("labels.addFleetRequestType"));
    document.title = t("labels.addFleetRequestType");
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector(
    (state) => state.fleet_request_types
  );
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "type" && value !== "maintenance") {
        return { ...prev, type: value, price: "" };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    const payload = {
      ...formData,
      price: formData.type === "maintenance" ? formData.price : "0",
    };
    dispatch(addFleetRequestTypes(payload));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          navigate("/fleet_management_types");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "fleet_request_types/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
    <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/fleet_management_types" className="btn btn-dark btn-sm text-white mb-2">
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
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.type")}</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-100 input-bg"
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="fuel">{t("labels.fuel")}</option>
              <option value="maintenance">{t("labels.maintenance")}</option>
              <option value="journal_entries">
                {t("labels.journal_entries")}
              </option>
            </select>
          </div>
          {formData.type === "maintenance" && (
            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
              {" "}
              <label className="text-light"> {t("labels.price")} </label>{" "}
              <input
                type="text"
                className="input-bg"
                value={formData.price}
                name="price"
                onChange={handleChange}
              />{" "}
            </div>
          )}

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

export default AddFleetRequest;
