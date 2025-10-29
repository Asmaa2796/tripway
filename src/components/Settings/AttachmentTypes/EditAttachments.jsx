import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getAttachmentRecord,
  updateAttachment,
} from "../../../redux/Slices/AttachmentTypesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAttachments = () => {
  const { id } = useParams();
  const { t,i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    type: "",
  });

  const { isLoading, error, success, selectedAttachment } = useSelector(
    (state) => state.attachment_types
  );

  useEffect(() => {
    if (selectedAttachment) {
      setFormData({
        name_ar: selectedAttachment?.data?.name_ar || "",
        name_en: selectedAttachment?.data?.name_en || "",
        type: selectedAttachment?.data?.type || "",
      });
    }
  }, [selectedAttachment]);

  // Set page title (updates on language change)
  useEffect(() => {
    setTitle(`${t("labels.attachments")} > ${t("labels.editAttachment")}`);
    document.title = `${t("labels.attachments")} > ${t("labels.editAttachment")}`;
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  // Fetch attachment record on first load
  useEffect(() => {
    dispatch(getAttachmentRecord(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateAttachment({ id, ...formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/AttachmentsType");
        },
      });
    }

    if (error) {
      toast.error(`${t("labels.failedToUpdate")}`, {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/AttachmentsType" className="btn btn-dark btn-sm text-white">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="row align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label>{t("labels.nameArabic")}</label>
            <input
              type="text"
              className="input-bg mb-3"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
            <label>{t("labels.nameEnglish")}</label>
            <input
              type="text"
              className="input-bg mb-3"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label>{t("labels.type")}</label>
            <select
              name="type"
              className="input-bg w-100"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">{t("labels.selectType")}</option>
              <option value="employees">{t("labels.employees")}</option>
              <option value="branches_owners">{t("labels.business")}</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button className="btn show_all" disabled={isLoading}>
            {t("btns.saveChanges")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditAttachments;
