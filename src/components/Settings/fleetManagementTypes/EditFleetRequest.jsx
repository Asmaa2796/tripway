import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  fleetRecord,
  updateRecord,
  clearState,
} from "../../../redux/Slices/FleetManagementTypesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EditFleetRequest = () => {
  const { t, i18n } = useTranslation("global");
  const { id } = useParams();
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    price: "",
    type: "",
  });
  useEffect(() => {
    setTitle(t("labels.editFleetRequestType"));
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { record, isLoading, error, success } = useSelector(
    (state) => state.fleet_request_types
  );
  // get single record
  useEffect(() => {
    dispatch(fleetRecord(id));
  }, [dispatch, id, t, i18n.language]);
  useEffect(() => {
    if (record) {
      setFormData({
        name_ar: record.name_ar,
        name_en: record.name_en,
        price: record.price,
        type: record.type,
      });
    }
  }, [record]);
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
    dispatch(updateRecord({ id, formData }));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          navigate("/fleet_management_types");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "fleet_request_types/clearState" }),
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
              required
              value={formData.name_en}
              name="name_en"
              onChange={handleChange}
            />
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.type")}</label>
            <div className="text-sm">
              {formData?.type === "maintenance"
                ? t("labels.maintenance")
                : formData?.type === "journal_entries"
                ? t("labels.entry")
                : formData?.type === "fuel"
                ? t("labels.fuel")
                : ""}
            </div>
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
                required
              />{" "}
            </div>
          )}

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

export default EditFleetRequest;
