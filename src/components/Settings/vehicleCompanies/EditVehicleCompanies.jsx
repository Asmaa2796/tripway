import React, { useCallback, useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from 'react-i18next';

import { clearState, vehicleCompaniesRecord, updateVehicleCompanies } from "../../../redux/Slices/VehicleCompaniesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EditVehicleCompanies = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const {id} = useParams();
 const [formData, setFormData] = useState({
      name_ar: "",
      name_en: ""
});
  useEffect(() => {
    setTitle(`${t('sidenav.vehicleCompanies')} > ${t('labels.edit')}`);
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
    const { record,isLoading, error,success } = useSelector(
      (state) => state.vehicle_companies
    );
    // get single record
     useEffect(() => {
        dispatch(vehicleCompaniesRecord(id));
      }, [dispatch, id, t, i18n.language]);
      useEffect(() => {
        if(record) {
            setFormData({
                name_ar:  record?.name_ar,
                name_en:  record?.name_en
            });
        }
      }, [record]);

    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }, []);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormData({
        name_ar:  formData.name_ar,
        name_en:  formData.name_en
    });
    dispatch(clearState());
    dispatch(updateVehicleCompanies({id,formData}));
  };
    useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          navigate("/vehicle_companies");
        },
      });
    }
  
    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "vehicle_companies/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      {/* form */}
      <form onSubmit={handleSubmit} className="table_form form-style my-3 py-3 div-bg">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.nameArabic')}</label>
            <input type="text" className="input-bg" value={formData.name_ar} name="name_ar" onChange={handleChange} required />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light"> {t('labels.nameEnglish')} </label>
            <input type="text" className="input-bg" value={formData.name_en} name="name_en" onChange={handleChange} required />
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

export default EditVehicleCompanies;
