import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const DocumentReceptionReports = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t('sidenav.documentReceptionReports'));
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('sidenav.corporate')}</label>
            <input type="text" name="corporate" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.status')}</label>
            <select name="status" className="w-100">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.reportType')}</label>
            <input type="text" name="report_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.date')}</label>
            <input type="date" name="date" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
          </div>
        </div>
      </form>
      <div className="no_data text-center rounded my-2 p-3" style={{backgroundColor:"#569a8b"}}>
        <h5 className="my-2 text-md text-white">{t('labels.noData')}</h5>
      </div>
    
    </>
  );
};

export default DocumentReceptionReports;