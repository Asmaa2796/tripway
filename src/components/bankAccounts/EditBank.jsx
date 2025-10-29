import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateBank,getBank, clearState } from "../../redux/Slices/BanksSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBank = () => {
  const { t, i18n } = useTranslation("global");
  const {id} = useParams();
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    account_name_en: "",
    account_name_ar: "",
    iban: "",
    account_number: "",
    bank_code: "",
    withdrawal: 0,
    deposit: 0,
    logo: null,
  });

  const { isLoading, error, success,record } = useSelector((state) => state.banks); 
  useEffect(() => {
    setTitle(`${t("sidenav.banks")} > ${t("labels.edit")}`);
    document.title = `${t("sidenav.banks")} > ${t("labels.edit")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    if(record) {
        setFormData({
            iban:record.iban || "",
            bank_code:record.bank_code || "",
            logo:record.logo || null,
            withdrawal:record.withdrawal === true?1:0,
            deposit:record.deposit === true?1:0,
        })
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleChangeFile = (e) => {
    setFormData((prev) => ({
      ...prev,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());

    // convert to FormData for upload
    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
    if (key === "logo") {
      if (formData.logo instanceof File) {
        fd.append("logo", formData.logo);
      }
    } else {
      fd.append(key, formData[key]);
    }
  });

    fd.append("bank_id", id);
    dispatch(updateBank({id,data:fd}));
  };

  useEffect(() => {
    dispatch(getBank(id));
  }, [id,i18n.language]);
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/banks");
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
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/banks" className="btn btn-dark btn-sm text-white">
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
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="fw-bold">{t("labels.nameArabic")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="fw-bold">{t("labels.nameEnglish")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="fw-bold">{t("labels.account_name_ar")}</label>
            <input
              type="text"
              className="input-bg"
              name="account_name_ar"
              value={formData.account_name_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="fw-bold">{t("labels.account_name_en")}</label>
            <input
              type="text"
              className="input-bg"
              name="account_name_en"
              value={formData.account_name_en}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="fw-bold">{t("labels.account_number")}</label>
            <input
              type="text"
              className="input-bg"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="fw-bold">{t("labels.bank_code")}</label>
            <input
              type="text"
              className="input-bg"
              name="bank_code"
              value={formData.bank_code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="fw-bold">{t("labels.IBANNumber")}</label>
            <input
              type="text"
              className="input-bg"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <div className="d-flex align-items-center">
              <label className="fw-bold">{t("labels.withdraw")}</label>
              <div className="form-check form-switch mx-2">
                <input
                  className="form-check-input no-class"
                  type="checkbox"
                  id="withdrawalSwitch"
                  name="withdrawal"
                  checked={formData.withdrawal === 1}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <div className="d-flex align-items-center">
              <label className="fw-bold">{t("labels.deposit")}</label>
              <div className="form-check form-switch mx-2">
                <input
                  className="form-check-input no-class"
                  type="checkbox"
                  id="depositSwitch"
                  name="deposit"
                  checked={formData.deposit === 1}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="fw-bold">{t("labels.logo")}</label>
            <input
              type="file"
              className="border-0"
              name="logo"
              accept="image/*"
              onChange={handleChangeFile}
            />
            <img
              src={record?.logo || "/img/placeholder.jpg"}
              className="d-inline-block mx-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn show_all" disabled={isLoading}>
            {isLoading ? t("labels.loading") : t("labels.save")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditBank;
