import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";

import {
  updateEasyEntries,
  easyEntriesRecord,
  fetchAccountsTree,
  clearState,
} from "../../../redux/Slices/EasyEntriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const EditEasyEntries = () => {
  const { t, i18n } = useTranslation("global");
  const { id } = useParams();
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
    setTitle(`${t("sidenav.easyEntries")} > ${t("labels.edit")}`);
    document.title = `${t("sidenav.easyEntries")} > ${t("labels.edit")}`;
    dispatch(fetchAccountsTree());
    dispatch(easyEntriesRecord(id));
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { isLoading, tree, error, record, success } = useSelector(
    (state) => state.easy_entries
  );
  useEffect(() => {
    if (record) {
      setFormData({
        from_id: record?.from_id,
        to_id: record?.to_id,
        value: record?.total,
        date: record?.date,
        description: record?.description,
        file: record?.files.map((file) => file),
      });
    }
  }, [record]);
  console.log(record);
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setFormData((prev) => {
      const updatedFiles = [...prev.file, ...newFiles]; // keep old + add new
      return { ...prev, file: updatedFiles };
    });

    // Reset input after merging so user can re-upload same file if needed
    e.target.value = "";
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  // inside your component
  const fileInputRef = useRef(null);

  const handleDeleteFile = async (file, index) => {
    // If it's a new upload (File object)
    if (!file.id) {
      setFormData((prev) => {
        const updatedFiles = prev.file.filter((_, i) => i !== index);

        // re-sync input only with remaining new Files
        if (fileInputRef.current) {
          const dataTransfer = new DataTransfer();
          updatedFiles.forEach((f) => {
            if (f instanceof File) {
              dataTransfer.items.add(f);
            }
          });
          fileInputRef.current.files = dataTransfer.files;
        }

        return { ...prev, file: updatedFiles };
      });
      return;
    }

    // If it's a backend file
    try {
      await axios.post(
        `https://winch.brmjatech.co.uk/api/easy-entries/delete-file`,
        { file_id: file.id }
      );

      setFormData((prev) => {
        const updatedFiles = prev.file.filter((_, i) => i !== index);
        return { ...prev, file: updatedFiles };
      });

      toast.success(t("labels.deleteSuccess"));
    } catch (err) {
      console.log(err);
      toast.error(t("labels.deleteFail"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());

    // use FormData for file upload
    const data = new FormData();
    data.append("entry_id", id);
    data.append("from_id", formData.from_id);
    data.append("to_id", formData.to_id);
    data.append("value", formData.value);
    data.append("date", formData.date);
    data.append("description", formData.description);

    formData.file.forEach((f) => {
      if (f instanceof File) {
        data.append("file[]", f); // only new ones are uploaded
      }
    });
    console.log(formData);

    dispatch(updateEasyEntries({ data }));
  };
  const errorMessageMap = {
    "The to id field and from id must be different.":
      "the_to_id_field_and_from_id_must_be_different",
    "The file field must be an array.": "errors.invalidFile",
    "The value field must be a number.": "value_must_be_number",
    "The value field must be at least 0.01": "value_must_be_at_least",
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          navigate("/easy_entries");
        },
      });
    }

    if (error) {
      const translationKey = errorMessageMap[error] || "labels.failedToUpdate";
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
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {/* Preview existing files */}
            <div className="d-flex flex-wrap gap-3 my-3">
              {formData.file && formData.file.length > 0 ? (
                formData.file.map((f, index) => {
                  // f might be {id, file: "url"} OR a File object (when uploading new)
                  const fileUrl = f.file ? f.file : URL.createObjectURL(f);
                  const extension = fileUrl.split(".").pop().toLowerCase();

                  const isImage = [
                    "jpeg",
                    "jpg",
                    "png",
                    "gif",
                    "webp",
                  ].includes(extension);
                  const isPdf = extension === "pdf";
                  const isDoc = ["doc", "docx"].includes(extension);

                  return (
                    <div
                      key={index}
                      className="border p-2 rounded text-center position-relative"
                    >
                      {f.id && (
                        <button
                          type="button"
                          className="delete_file btn btn-sm text-sm p-0"
                          onClick={() => handleDeleteFile(f, index)}
                        >
                          <i className="bi bi-x fw-bold"></i>
                        </button>
                      )}

                      {isImage ? (
                        <img
                          src={fileUrl}
                          alt={`preview-${index}`}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                          onError={(e) => (e.currentTarget.src = "/image.jpg")}
                        />
                      ) : (
                        <img
                          src={
                            isPdf
                              ? "/pdf.png"
                              : isDoc
                              ? "/doc.png"
                              : "/file.png"
                          }
                          alt={`preview-${index}`}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                          onError={(e) => (e.currentTarget.src = "/file.png")}
                        />
                      )}

                      <div className="mt-2">
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="highlight-blue text-sm"
                        >
                          {isImage
                            ? t("labels.viewFile")
                            : t("labels.downloadFile")}
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="m-2">
                  <i className="fa fa-file main-color"></i>{" "}
                  {t("labels.noFilesExist")}
                </p>
              )}
            </div>
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

export default EditEasyEntries;