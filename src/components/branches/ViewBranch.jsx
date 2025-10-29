import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { FaCodeBranch } from "react-icons/fa";
import "./branches.css";
import { tripwayBranchesRecord } from "../../redux/Slices/TripwayBranchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NestedList from "../../pages/NestedLoader";

const ViewBranch = () => {
  const { t, i18n } = useTranslation("global");
  const { id } = useParams();
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { isLoading, record } = useSelector((state) => state.tripway_branches);
  useEffect(() => {
    setTitle(
      `${t("labels.winchBranches")} > ${t("labels.winchBranchDetails")}`
    );
    document.title = `${t("labels.winchBranches")} > ${t("labels.winchBranchDetails")}`;
    dispatch(tripwayBranchesRecord(id));
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language, dispatch, id]);
  return (
    <div style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
      {/* view */}
      {isLoading ? (
        <div className="div-bg">
          <NestedList />
        </div>
      ) : (
        <div className="view">
          <div className="div-bg my-3">
            <h5 className="text-lighter text-md fw-bold mb-4">
              <FaCodeBranch className="main-color" /> {t("labels.branchInfo")}
            </h5>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter">
                  <span className="d-block text-custom my-1">
                    {t("labels.code")} :{" "}
                    <span className="highlight-text">{record?.code}</span>
                  </span>
                  <span className="d-block text-custom my-2">
                    {t("labels.nameArabic")} : {record?.name_ar}
                  </span>
                  <span className="d-block text-custom my-2">
                    {t("labels.nameEnglish")} : {record?.name_en}
                  </span>
                </div>
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.status")} :
                  </span>
                  <span
                    className={`d-block text-custom ${
                      record?.status === true ? "highlight-green" : "text-color"
                    }`}
                  >
                    {record?.status === true
                      ? t("labels.active")
                      : t("labels.inactive")}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.tripway_fleet")} :
                  </span>
                  <span
                    className={`d-block text-custom ${
                      record?.winch_fleet === true
                        ? "highlight-green"
                        : "text-color"
                    }`}
                  >
                    {record?.winch_fleet === true
                      ? t("labels.active")
                      : t("labels.inactive")}
                  </span>
                </div>
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.tripway_leasing")} :
                  </span>
                  <span
                    className={`d-block text-custom ${
                      record?.winch_leasing === true
                        ? "highlight-green"
                        : "text-color"
                    }`}
                  >
                    {record?.winch_leasing === true
                      ? t("labels.active")
                      : t("labels.inactive")}
                  </span>
                </div>
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.tripway_main")} :
                  </span>
                  <span
                    className={`d-block text-custom ${
                      record?.winch_main === true
                        ? "highlight-green"
                        : "text-color"
                    }`}
                  >
                    {record?.winch_main === true
                      ? t("labels.active")
                      : t("labels.inactive")}
                  </span>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <br />
                <br />
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.purchasesAccount")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    {record?.cost_sales_account_name}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.payment_method")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    {record?.payment === "cash"
                      ? t("labels.cash")
                      : t("labels.postpaid")}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom my-1 text-lighter">
                    {t("labels.cashAccounts")} :
                  </span>
                  <ul className="d-block text-custom my-1 highlight-blue p-0">
                    {record?.cash_accounts.length > 0
                      ? record?.cash_accounts.map((account) => (
                          <li className="my-1" key={account?.id}>
                            {account?.name}
                          </li>
                        ))
                      : "--"}
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom my-1 text-lighter">
                    {t("labels.bankAccounts")} :
                  </span>
                  <ul className="d-block text-custom my-1 highlight-blue p-0">
                    {record?.bank_accounts.length > 0
                      ? record?.bank_accounts.map((bank) => (
                          <li className="my-1" key={bank?.id}>
                            {bank?.name}
                          </li>
                        ))
                      : "--"}
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.customerPenaltiesAccounts")} :
                  </span>
                  <span className="d-block text-custom">
                    <span className="highlight-blue">
                      {record?.customer_penalties_account_name}
                    </span>
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.supplierPenaltiesAccounts")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    <span>{record?.supplier_penalties_account_name}</span>
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.earnedDiscountAccount")} :
                  </span>
                  <span className="d-block highlight-blue text-custom">
                    {record?.earned_discount_account_name}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.internalSalesCostAccount")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    <span>{record?.internal_cost_sales_account_name}</span>
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.internalSalesAccount")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    {record?.internal_sales_account_name}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.purchaseReturnsAccount")} :
                  </span>
                  <span className="d-block highlight-blue text-custom">
                    {record?.purchase_return_account_name}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.relatedPartiesAccount")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    {record?.realted_parties_account_name}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.salesDiscountAccounts")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    {record?.sales_discount_account_name}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.salesAccount")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    <span>{record?.sales_name}</span>
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                  <span className="d-block text-custom text-lighter">
                    {t("labels.salesReturnsAccount")} :
                  </span>
                  <span className="d-block text-custom highlight-blue">
                    <span>{record?.sales_return_name}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBranch;
