import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from 'react-i18next';
import "./clients.css";
import { addClients,clearState } from "../../redux/Slices/ClientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddClient = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, success } = useSelector((state) => state.clients);
const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    status: "",
    phone: "",
    gender: "",
    email: "",
  });
  useEffect(() => {
      setTitle(`${t('sidenav.individualClients')} > ${t('btns.add')}`);
    }, [setTitle ,t, i18n.language]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearState());
        dispatch(addClients(formData));
      };
      useEffect(() => {
        if (success) {
          toast.success(t("labels.addedSuccessfully"), {
            onClose: () => {
              dispatch({ type: "clients/clearState" }); // Clear after toast
              navigate("/clients");
            },
          });
        }
    
        if (error) {
          toast.error(t("labels.failedToAdd"), {
            onClose: () => dispatch({ type: "clients/clearState" }),
          });
        }
      }, [success, error, t, dispatch, navigate]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3 div-bg" onSubmit={handleSubmit}>
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light"> {t('labels.nameArabic')}</label>
            <input type="text" required className="input-bg" name="name_ar" onChange={handleChange} value={formData.name_ar}  />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light"> {t('labels.nameEnglish')} </label>
            <input type="text" required className="input-bg" name="name_en" onChange={handleChange} value={formData.name_en} />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.phone')}</label>
            <input type="text" required className="input-bg" name="phone" onChange={handleChange} value={formData.phone}  />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.email')} </label>
            <input type="email" required className="input-bg" name="email" onChange={handleChange} value={formData.email}  />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.gender')}</label>
            <select name="gender" required className="w-100 input-bg" onChange={handleChange} value={formData.gender}>
              <option value="" disabled>{t('labels.selectItem')}</option>
              <option value="male">{t('labels.male')}</option>
              <option value="female">{t('labels.female')}</option>
            </select>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.status')}</label>
            <select name="status" required className="w-100 input-bg" onChange={handleChange} value={formData.status} >
              <option value="" disabled>{t('labels.selectItem')}</option>
              <option value="1">{t('labels.active')}</option>
              <option value="0">{t('labels.inactive')}</option>
            </select>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button className="btn px-4 save">{t('btns.add')}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddClient;
