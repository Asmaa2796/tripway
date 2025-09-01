import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const RentalRequestSummary = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.rentalRequestSummary'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.contractNumber")}</label>
            <input type="text" name="contract_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.orderNumber")}</label>
            <input type="text" name="order_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.orderType")}</label>
            <input type="text" name="order_type" />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.clientType")}</label>
            <input type="text" name="client_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.providerType")}</label>
            <input type="text" name="provider_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.vehicle")}</label>
            <input type="text" name="vehicle" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.rentalType")}</label>
            <input type="text" name="rental_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select name="status">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.serviceType")}</label>
            <select name="service_type">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.pickupCity")}</label>
            <input type="text" name="pickup_city" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.dropoffCity")}</label>
            <input type="text" name="dropoff_city" />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.requestsWithoutProvider")}</label>
            <input type="text" name="requests_without_provider" />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.report")}</label>
            <input type="text" name="report" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <Link to="">
              <span
                className="btn btn-warning btn-sm text-sm px-3"
                style={{ marginTop: "45px" }}
              >
                {t("labels.issueOrderReport")}
              </span>
            </Link>
          </div>
        </div>
      </form>
       <div className="no_data text-center rounded my-2 p-3" style={{backgroundColor:"#569a8b"}}>
        <h5 className="my-2 text-md text-white">{t('labels.noData')}</h5>
      </div>
    </>
  );
};

export default RentalRequestSummary;