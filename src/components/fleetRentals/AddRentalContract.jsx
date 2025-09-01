import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import PhoneInput from "../vendors/PhoneInput";
const AddBusinessSector = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(
      `${t("sidenav.rentalContracts")} > ${t("labels.addRentalContract")}`
    );
  }, [setTitle, t, i18n.language]);

  return (
    <>
      {/* form */}
      <form className="table_form form-style border shadow-sm bg-white rounded p-3 my-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.clientType")}</label>
            <input type="text" className="input-bg" name="client_type" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.client")} </label>
            <input type="text" className="input-bg" name="client" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.clientPrice")} </label>
            <input type="text" className="input-bg" name="client_price" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">
              {t("labels.calculateMonthlyDays")}
            </label>
            <input name="calculate_monthly_days" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.serviceProvider")}</label>
            <input name="serviceProvider" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.providerCost")}</label>
            <input name="provider_cost" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.hasDriver")}</label>
            <input name="has_driver" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.vehicle")}</label>
            <input name="vehicle" className="input-bg" />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <b className="my-3 d-block text-lg">{t("labels.contractInfo")}</b>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.issueDate")}</label>
            <input name="issue_date" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.startDate")}</label>
            <input name="start_date" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.endDateOptional")}</label>
            <input name="end_date" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">
              {t("labels.orderBillingMethod")}
            </label>
            <input name="order_billing_method" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.rentalProject")}</label>
            <input name="rental_project" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.autoRenewOrders")}</label>
            <input name="auto_renew_orders" className="input-bg" />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <b className="my-3 d-block text-lg">{t("labels.loadInfo")}</b>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.serviceType")}</label>
            <input name="service_type" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.loadWeight")}</label>
            <select name="ton" className="input-bg">
              <option value="1">{t("labels.ton")} 1</option>
              <option value="2">{t("labels.ton")} 2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.loadType")}</label>
            <select name="load_type" className="input-bg">
              <option value="1">{t("labels.loadType")} 1</option>
              <option value="2">{t("labels.loadType")} 2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.loadImages")}</label>
            <div className="file-input">
              <input
                type="file"
                name="file-input"
                id="file-input"
                className="file-input__input"
              />
              <label className="file-input__label" htmlFor="file-input">
                <i className="bi bi-images mx-2"></i>
                <span>{t("labels.chooseImage")}</span>
              </label>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <b className="my-3 d-block text-lg">{t("labels.rentalDetails")}</b>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.rentalType")}</label>
            <input name="rental_type" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.workingDays")}</label>
            <input name="working_days" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.workingHours")}</label>
            <input name="working_hours" className="input-bg" />
          </div>

          <div className="accordion mt-4" id="exampleAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button text-lg"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <h5 className="my-0 text-md">
                    {t("labels.pickupLocations")}
                  </h5>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#exampleAccordion"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.pickupCity")}
                      </label>
                      <input name="pickup_city" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.pickupLocation")}
                      </label>
                      <input name="pickup_location" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.pickupLocationName")}
                      </label>
                      <input name="pickup_location_name" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.pickupTime")}
                      </label>
                      <input name="pickup_time" className="input-bg" />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <b className="mt-3 d-block">
                        {" "}
                        {t("labels.pickupSiteManagers")}{" "}
                      </b>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">{t("sign.name")}</label>
                      <input name="name" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.position")}
                      </label>
                      <input name="position" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">{t("labels.phone")}</label>
                      <div style={{ marginBlock: "16px" }}>
                        <PhoneInput />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <h5 className="my-0">{t("labels.dropoffLocations")}</h5>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#exampleAccordion"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.pickupCity")}
                      </label>
                      <input name="pickup_city" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.dropoffLocation")}
                      </label>
                      <input name="dropoff_location" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.dropoffLocationName")}
                      </label>
                      <input
                        name="dropoff_location_name"
                        className="input-bg"
                      />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.pickupTime")}
                      </label>
                      <input name="dropoff_time" className="input-bg" />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <b className="mt-3 d-block">
                        {" "}
                        {t("labels.dropoffSiteManagers")}{" "}
                      </b>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">{t("sign.name")}</label>
                      <input name="name" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.position")}
                      </label>
                      <input name="position" className="input-bg" />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <label className="text-light">{t("labels.phone")}</label>
                      <div style={{ marginBlock: "16px" }}>
                        <PhoneInput />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr /><br /><br />
          <div className="custom-group">
            <input type="checkbox" id="comment" />
            <label htmlFor="comment"><b className="d-inline-block mx-2">{t('labels.comment')}</b></label>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button type="submit" className="btn px-4 save">
              {t("labels.saveAndApprove")}{" "}
            </button>
            <button type="button" className="btn px-4 btn-warning text-dark">
              {t("labels.saveAsDraft")}{" "}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddBusinessSector;
