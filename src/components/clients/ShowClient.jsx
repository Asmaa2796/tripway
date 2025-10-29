import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../redux/Slices/ClientsSlice";

const ShowClient = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { record, loading } = useSelector((state) => state.clients);
  console.log(record);
  const scenarioLabels = {
    with_code_for_user_and_recipient: t(
      "labels.with_code_for_user_and_recipient"
    ),
    with_code_for_user_only: t("labels.with_code_for_user_only"),
    with_code_for_recipient_only: t("labels.with_code_for_recipient_only"),
    without_end_code: t("labels.without_end_code"),
  };
  useEffect(() => {
    setTitle(`${t("sidenav.individualClients")} > ${t("labels.view")}`);
    document.title = `${t('sidenav.individualClients')} > ${t('labels.view')}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    dispatch(getClients(id));
  }, [id, i18n.language]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/clients" className="btn btn-dark btn-sm text-white">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
      <div style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
        <div className="div-bg">
          <h5 className="fw-bold text-md my-3">
            {" "}
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.basic_info")}
          </h5>
          {/* basic_info */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <div>
                    <b className="d-block text-sm my-1">
                      {t("labels.avatar")}:{" "}
                    </b>
                    <img
                      src={
                        record?.general_info?.image
                          ? record?.general_info?.image
                          : "/avatar.webp"
                      }
                      alt="--"
                      style={{
                        width: "auto",
                        maxHeight: "50px",
                        display: "inline-block",
                      }}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.name")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-person main-color"></i>{" "}
                    {record?.general_info?.name}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">{t("labels.email")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-envelope-at main-color"></i>{" "}
                    {record?.general_info?.email}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">{t("labels.phone")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-telephone main-color"></i>{" "}
                    {record?.general_info?.phone}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">
                    {t("labels.account_suspend")}:{" "}
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-ban main-color"></i>{" "}
                    {record?.general_info?.account_suspend === 1
                      ? t("labels.active")
                      : t("labels.inactive")}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">
                    {t("labels.has_fixed_code_verification")}:{" "}
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-ban main-color"></i>{" "}
                    {record?.general_info?.has_fixed_code_verification === 1
                      ? t("labels.active")
                      : t("labels.inactive")}
                  </span>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm mb-2">
                    {t("labels.clientID")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-person main-color"></i>{" "}
                    <span className="custom-span1">
                      {record?.general_info?.number}
                    </span>
                  </span>
                </div>

                <div className="my-3">
                  <b className="d-block text-sm my-1">
                    {t("labels.tripRequests")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-collection main-color"></i>{" "}
                    <span className="custom-span2">
                      {record?.general_info?.orders_count || "--"}{" "}
                    </span>{" "}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">{t("labels.rating")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-star-fill text-warning"></i>{" "}
                    {record?.general_info?.rate}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">{t("labels.status")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-toggles2 main-color"></i>{" "}
                    {record?.general_info?.status === true
                      ? t("labels.active")
                      : t("labels.inactive")}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">
                    {t("labels.created_at")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-calendar main-color"></i>{" "}
                    {record?.general_info?.created_at}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h5 className="fw-bold text-md my-3">
            {" "}
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("sidenav.banks")}
          </h5>
          {/* banks */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("sidenav.bankAccounts")}:{" "}
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-bank main-color"></i>{" "}
                    {record?.banks?.bank_accounts}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h5 className="fw-bold text-md my-3">
            {" "}
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.address")}
          </h5>
          {/* address */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.country")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-geo-alt main-color"></i>{" "}
                    {record?.address?.country_name || "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.city")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-geo-alt-fill main-color"></i>{" "}
                    {record?.address?.city_name || "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.district")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-houses main-color"></i>{" "}
                    {record?.address?.district || "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.street")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-signpost main-color"></i>{" "}
                    {record?.address?.street || "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.building_no")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-building main-color"></i>{" "}
                    {record?.address?.building_no || "--"}
                  </span>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.secondary_number")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-123 main-color"></i>{" "}
                    {record?.address?.secondary_number || "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.postal_code")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-envelope main-color"></i>{" "}
                    {record?.address?.postal_code || "--"}
                  </span>
                </div>

                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.address_file")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-paperclip main-color"></i>{" "}
                    {record?.address?.address_file ? (
                      <a
                        href={record.address.address_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-underline"
                      >
                        {t("labels.view_file")}
                      </a>
                    ) : (
                      "--"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h5 className="fw-bold text-md my-3">
            {" "}
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.account_tree")}
          </h5>
          {/* account_tree */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.account_tree")}:{" "}
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-tree main-color"></i>{" "}
                    {record?.account_tree?.account_tree}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.transaction")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-arrow-return-left main-color"></i>{" "}
                    {record?.account_tree?.transaction === "show"
                      ? t("labels.show")
                      : t("labels.hide")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h5 className="fw-bold text-md my-3">
            {" "}
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.quotations")}
          </h5>
          {/* quotations */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.quantity_of_quotations_customers")}:{" "}
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.quotations?.quantity_of_quotations_customers}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.quantity_of_quotations_providers")}:{" "}
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.quotations?.quantity_of_quotations_customers ||
                      "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h5 className="fw-bold text-md my-3">
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.invoices")}
          </h5>
          {/* invoices */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.quantity_of_sales_invoices")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.quantity_of_sales_invoices || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.sales_invoices_due")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.sales_invoices_due || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.draft_sales_invoices")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.draft_sales_invoices || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.credit_notes")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.credit_notes || "0"}
                  </span>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.quantity_purchase_invoices")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.quantity_purchase_invoices || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.purchase_invoices_due")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.purchase_invoices_due || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.sales_invoices_not_yet_due")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.sales_invoices_not_yet_due || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.draft_purchase_invoice")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.draft_purchase_invoice || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.debit_notes")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.invoices?.debit_notes || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h5 className="fw-bold text-md my-3">
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.email_settings")}
          </h5>
          {/* email settings */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.invoice")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.email_settings?.invoice === "enabled"
                      ? t("labels.enabled")
                      : t("labels.disabled")}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.bill")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.email_settings?.bill === "enabled"
                      ? t("labels.enabled")
                      : t("labels.disabled")}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.credit_note")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.email_settings?.credit_note === "enabled"
                      ? t("labels.enabled")
                      : t("labels.disabled")}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.debit_note")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.email_settings?.debit_note === "enabled"
                      ? t("labels.enabled")
                      : t("labels.disabled")}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.voucher")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-blockquote-left main-color"></i>{" "}
                    {record?.email_settings?.voucher === "enabled"
                      ? t("labels.enabled")
                      : t("labels.disabled")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h5 className="fw-bold text-md my-3">
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.financial_settings")}
          </h5>
          {/* financial_settings */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.current_balance")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-currency-dollar main-color"></i>{" "}
                    {record?.financial_settings?.current_balance || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.uninvoiced_balance")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-receipt main-color"></i>{" "}
                    {record?.financial_settings?.uninvoiced_balance || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.draft_balance")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-file-earmark-text main-color"></i>{" "}
                    {record?.financial_settings?.draft_balance || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.end_order_scenario")}:
                  </b>

                  <span className="d-block text-sm">
                    <i className="bi bi-list-check main-color"></i>{" "}
                    {scenarioLabels[
                      record?.financial_settings?.end_order_scenario
                    ] || "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.payment_method")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-credit-card main-color"></i>{" "}
                    {record?.financial_settings?.payment_method === "cash"
                      ? t("labels.cash")
                      : t("labels.postpaid")}
                  </span>
                </div>

                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.quantity_days_payment_after_receiving_invoices")}
                    :
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-credit-card main-color"></i>{" "}
                    {record?.financial_settings
                      ?.quantity_days_payment_after_receiving_invoices || "--"}
                  </span>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.total_balance")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-calculator main-color"></i>{" "}
                    {record?.financial_settings?.total_balance || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.total_revenue")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-graph-up-arrow main-color"></i>{" "}
                    {record?.financial_settings?.total_revenue || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.points")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-stars main-color"></i>{" "}
                    {record?.financial_settings?.points ?? "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.cash_payment_method")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-cash main-color"></i>{" "}
                    {record?.financial_settings?.cash_payment_method ===
                    "bank_transfer"
                      ? t("labels.bank_transfer")
                      : t("labels.cash_to_provider")}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.invoice_issuing_method")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-file-earmark-medical main-color"></i>{" "}
                    {record?.financial_settings?.invoice_issuing_method ===
                    "directly"
                      ? t("labels.directly")
                      : record?.financial_settings?.invoice_issuing_method ===
                        "custom"
                      ? t("labels.customized")
                      : record?.financial_settings?.invoice_issuing_method ===
                        "after_5_days"
                      ? t("labels.after_5_days")
                      : record?.financial_settings?.invoice_issuing_method ===
                        "after_7_days"
                      ? t("labels.after_7_days")
                      : record?.financial_settings?.invoice_issuing_method ===
                        "after_30_days"
                      ? t("labels.after_30_day")
                      : record?.financial_settings?.invoice_issuing_method ===
                        "after_60_days"
                      ? t("labels.after_60_day")
                      : "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.payment_method_after_receiving_invoice")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-cash main-color"></i>{" "}
                    {record?.financial_settings
                      ?.payment_method_after_receiving_invoice === "directly"
                      ? t("labels.directly")
                      : record?.financial_settings
                          ?.payment_method_after_receiving_invoice === "custom"
                      ? t("labels.customized")
                      : record?.financial_settings
                          ?.payment_method_after_receiving_invoice ===
                        "after_5_days"
                      ? t("labels.after_5_days")
                      : record?.financial_settings
                          ?.payment_method_after_receiving_invoice ===
                        "after_7_days"
                      ? t("labels.after_7_days")
                      : record?.financial_settings
                          ?.payment_method_after_receiving_invoice ===
                        "after_30_days"
                      ? t("labels.after_30_day")
                      : record?.financial_settings
                          ?.payment_method_after_receiving_invoice ===
                        "after_60_days"
                      ? t("labels.after_60_day")
                      : "--"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.quantity_days_issuing_invoices")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-123 main-color"></i>{" "}
                    {record?.financial_settings
                      ?.quantity_days_issuing_invoices || "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h5 className="fw-bold text-md my-3">
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.rental_trip_orders")}
          </h5>

          {/* rental_trip_orders */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.trip_orders")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-truck main-color"></i>{" "}
                    {record?.rental_trip_orders?.trip_orders || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.cancelled_orders")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-x-circle main-color"></i>{" "}
                    {record?.rental_trip_orders?.cancelled_orders || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.order_changed_by_provider")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-arrow-left-right main-color"></i>{" "}
                    {record?.rental_trip_orders?.order_changed_by_provider ||
                      "0"}
                  </span>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.rental_orders")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-calendar2-check main-color"></i>{" "}
                    {record?.rental_trip_orders?.rental_orders || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.rental_projects")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-diagram-3 main-color"></i>{" "}
                    {record?.rental_trip_orders?.rental_projects || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.rental_contracts")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-file-earmark-check main-color"></i>{" "}
                    {record?.rental_trip_orders?.rental_contracts || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h5 className="fw-bold text-md my-3">
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.vouchers")}
          </h5>

          {/* vouchers */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.receipt_vouchers")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-file-earmark-arrow-down main-color"></i>{" "}
                    {record?.vouchers?.receipt_vouchers || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.pay_vouchers")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-file-earmark-arrow-up main-color"></i>{" "}
                    {record?.vouchers?.pay_vouchers || "0"}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.free_credit")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-cash-coin main-color"></i>{" "}
                    {record?.vouchers?.free_credit || "0"}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.cost_center")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-diagram-3 main-color"></i>{" "}
                    {record?.vouchers?.cost_center || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowClient;
