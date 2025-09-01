import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  PurchaseReturnsAccountsRecord,
  updateRecord,
} from "../../../redux/Slices/PurchaseReturnsAccountsSlice";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditPurchaseReturnsAccounts = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name_ar: "", name_en : "", status:"" });

  const { isLoading, error, success, record } = useSelector(
    (state) => state.purchase_returns_accounts
  );

  // Set form data when record is loaded
  useEffect(() => {
    if (record) {
      setFormData({ name: record.name || "" });
      console.log("✅ Loaded value", record);
    }
  }, [record]);

  // Set page title (updates on language change)
  useEffect(() => {
    setTitle(t("sidenav.edit_purchase_returns_accounts"));
  }, [t]);

  // Fetch management record on first load only
  useEffect(() => {
    dispatch(PurchaseReturnsAccountsRecord(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateRecord({ id,formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/purchase_returns_accounts");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="table_form form-style my-3 p-3 rounded bg-white"
    >
      <div className="row align-items-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <label className="text-light">{t("sign.name")}</label>
          <input
            type="text"
            className="input-bg"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleChange}
            placeholder={t('labels.nameArabic')}
            required
          />
           <input
            type="text"
            className="input-bg"
            name="name_en"
            value={formData.name_en}
            onChange={handleChange}
                        placeholder={t('labels.nameEnglish')}

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
        <button className="btn show_all" disabled={isLoading}>
          {t("btns.saveChanges")}
        </button>
      </div>
    </form>
  );
};

export default EditPurchaseReturnsAccounts;
