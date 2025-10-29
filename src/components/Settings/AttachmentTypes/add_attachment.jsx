import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAttachment } from "../../../redux/Slices/AttachmentTypesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTitle } from "../../../context/TitleContext";

function AddAttachments() {
  const { t,i18n } = useTranslation("global");
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { setTitle } = useTitle();
   useEffect(() => {
      setTitle(`${t("labels.attachments")} > ${t("labels.addAttachment")}`);
      document.title = `${t("labels.attachments")} > ${t("labels.addAttachment")}`;
      return () => {
      document.title = "Tripway | تريپ واي";
    };
    }, [t, setTitle,i18n.language]);

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAttachment(formData))
      .unwrap()
      .then(() => {
        toast.success(t("labels.addedSuccessfully"), {
          autoClose: 1000,
          onClose: () => {
            navigate("/AttachmentsType");
          },
        });
        setFormData({ name_ar: "", name_en: "", type: "" });
      })
      .catch((error) => {
        toast.error(`${t("labels.failedToAdd")}`);
      });
  };

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
      <div>
        <h5 className="my-3" style={{ fontWeight: "bold" }}>
          {t("labels.addNewAttachment")}
        </h5>
        <form
          className="form-style bg-white rounded p-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label>{t("labels.nameArabic")}</label>
            <input
              type="text"
              name="name_ar"
              className="input-bg"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("labels.nameEnglish")}</label>
            <input
              type="text"
              name="name_en"
              className="input-bg"
              value={formData.name_en}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("labels.type")}</label>
            <select
              name="type"
              className="input-bg w-100"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("labels.selectType")}
              </option>
              <option value="employees">{t("labels.employees")}</option>
              <option value="branches_owners">{t("labels.business")}</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn save px-4 text-white my-4 btn-sm"
            >
              {t("btns.add")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAttachments;
