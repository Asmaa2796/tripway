import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const TaxCalculation = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.taxCalculation'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3 bg-white border rounded p-3">
        <div className="row align-items-center">
         
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.clientPrice")}</label>
            <input type="text" className="input-bg" name="client_price" />
          </div>
          
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.providerCost")}</label>
            <input type="text" className="input-bg" name="provider_cost" />
          </div>
          
          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button className="btn show_result">{t("labels.calculate")}</button>            
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr/>
            <b className="d-block my-3"> {t('labels.tax')} : <span className="text-color">$00</span></b>         
            <b className="d-block my-3"> {t('labels.totalPrice')} : <span className="text-color">$00</span></b>         
          </div>
          
        </div>
      </form>
    
    </>
  );
};

export default TaxCalculation;