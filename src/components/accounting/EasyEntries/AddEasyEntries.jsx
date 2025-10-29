import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  addEasyEntries,
  fetchAccountsTree,
  clearState,
} from "../../../redux/Slices/EasyEntriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddEasyEntries = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from_id: "",
    to_id: "",
    value: "",
    date: "",
    description: "",
    file: [],
  });
  useEffect(() => {
    setTitle(`${t("sidenav.easyEntries")} > ${t("btns.add")}`);
    document.title = `${t("sidenav.easyEntries")} > ${t("btns.add")}`;
    dispatch(fetchAccountsTree());
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { isLoading, tree, error, success } = useSelector(
    (state) => state.easy_entries
  );
  const handleFileChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    file: Array.from(e.target.files),
  }));
};
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

  // use FormData for file upload
  const data = new FormData();
  data.append("from_id", formData.from_id);
  data.append("to_id", formData.to_id);
  data.append("value", formData.value);
  data.append("date", formData.date);
  data.append("description", formData.description);

  formData.file.forEach((f) => {
    data.append("file[]", f);
  });
  dispatch(addEasyEntries(data));

  setFormData({
    from_id: "",
    to_id: "",
    value: "",
    date: "",
    description: "",
    file: [],
  });
};
const errorMessageMap = {
  "The to id field and from id must be different.": "the_to_id_field_and_from_id_must_be_different",
  "The file field must be an array.": "errors.invalidFile",
  "The value field must be a number.": "value_must_be_number",
  "The value field must be at least 0.01": "value_must_be_at_least"
};
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          navigate("/easy_entries");
        },
      });
    }

    if (error) {
      const translationKey = errorMessageMap[error] || "labels.failedToAdd";
      toast.error(t(translationKey), {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/easy_entries" className="btn btn-dark btn-sm text-white">
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
            <label className="text-light">{t("labels.from_account")}</label>
            <select
              className="input-bg w-100"
              value={formData.from_id}
              name="from_id"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {tree &&
                tree.length > 0 &&
                tree.map((opt) => (
                  <option key={opt?.id} value={opt?.id}>
                    {opt?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.to_account")}</label>
            <select
              className="input-bg w-100"
              value={formData.to_id}
              name="to_id"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {tree &&
                tree.length > 0 &&
                tree.map((opt) => (
                  <option key={opt?.id} value={opt?.id}>
                    {opt?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.value")}</label>
            <input
              type="number"
              className="input-bg"
              value={formData.value}
              name="value"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.date")}</label>
            <input
              type="date"
              className="input-bg"
              value={formData.date}
              name="date"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.description")}</label>
            <textarea
              className="input-bg"
              rows={4}
              value={formData.description}
              name="description"
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.attachments")}</label>
            <input
              type="file"
              className="border-0"
              name="file"
              multiple
              onChange={handleFileChange}
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

export default AddEasyEntries;
