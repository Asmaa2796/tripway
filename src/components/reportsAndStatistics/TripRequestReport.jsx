import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const TripRequestReport = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t('sidenav.tripRequestReport'));
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('sidenav.corporate')}</label>
            <input type="text" name="corporate" />
          </div>
          
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.recordsPerPage')}</label>
            <input type="text" name="records_per_page" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.date')}</label>
            <input type="date" name="date" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
            <button className="btn save">{t("labels.exportInvoices")}</button>
          </div>
        </div>
      </form>
      <div className="no_data text-center rounded my-2 p-3" style={{backgroundColor:"#569a8b"}}>
        <h5 className="my-2 text-md text-white">{t('labels.noData')}</h5>
      </div>
    
    </>
  );
};

export default TripRequestReport;