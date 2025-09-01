import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getManagementRecord,
  updateManagement,
} from "../../../redux/Slices/CompanyManagementsSlice";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditManagement = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name_ar: "", name_en : "" });

  const { isLoading, error, success, selectedManagement } = useSelector(
    (state) => state.company_managements
  );
  // Set form data when selectedManagement is loaded
  useEffect(() => {
    if (selectedManagement) {
      setFormData({
         name_ar: selectedManagement?.name_ar || "" ,
         name_en: selectedManagement?.name_en || ""
        });
    }
  }, [selectedManagement]);

  // Set page title (updates on language change)
  useEffect(() => {
    setTitle(
      `${t("sidenav.companyManagements")} > ${t("labels.editManagement")}`
    );
  }, [t]);

  // Fetch management record on first load only
  useEffect(() => {
    dispatch(getManagementRecord(id));
  }, [dispatch, id,i18n.language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateManagement({ id, data: formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/company_managements");
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
      </div>

      <div className="text-center">
        <button className="btn show_all" disabled={isLoading}>
          {t("btns.saveChanges")}
        </button>
      </div>
    </form>
  );
};

export default EditManagement;
