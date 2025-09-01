import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import "./branches.css";
import { useTranslation } from 'react-i18next';
const ViewBranch = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(`${t('labels.winchBranches')} > ${t('labels.winchBranchDetails')}`);
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* view */}
      <div className="view">
        <div className="div-bg my-3">
          <h5 className="text-lighter text-md mb-4">{t('labels.branchInfo')}</h5>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter">
                <span className="d-block text-custom my-1 text-lighter">
                  WB3
                </span>
                <span className="d-block text-custom my-1 text-lighter">
                  {t('labels.winchRental')}
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.status')} :
                </span>
                <span className="d-block text-custom text-color">{t('labels.active')}</span>
              </div>
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom my-1 text-lighter">
                  {t('labels.creationDate')} :
                </span>
                <span
                  className="d-block text-custom my-1 text-lighter"
                  style={{ direction: "ltr" }}
                >
                  03:39 PM 02/01/2025
                </span>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <br />
              <br />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.paymentMethod')} :
                </span>
                <span className="d-block text-custom text-lighter">{t('labels.cash')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.unbilledTripSales')} :
                </span>
                <span className="d-block text-custom text-lighter">
                  0 - <span className="text-color">{t('labels.view')}</span>
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.draftPurchaseBalance')} :
                </span>
                <span className="d-block text-custom text-lighter">
                  0 - <span className="text-color">{t('labels.view')}</span>
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.invoiceIssuanceMethod')} :
                </span>
                <span className="d-block text-xs text-lighter">{t('labels.undefined')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.unbilledRentalSales')} :
                </span>
                <span className="d-block text-custom text-lighter">
                  0 - <span className="text-color">{t('labels.view')}</span>
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.totalBalance')} :
                </span>
                <span
                  className="d-block text-custom"
                  style={{ color: "#7ba946" }}
                >
                  358.821.69
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.paymentAfterInvoice')} :
                </span>
                <span className="d-block text-xs text-lighter">{t('labels.undefined')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.unbilledPurchaseRentals')} :
                </span>
                <span
                  className="d-block text-custom"
                  style={{ color: "#7ba946" }}
                >
                  358.821.69
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.dueSalesBalance')} :
                </span>
                <span className="d-block text-xs text-lighter">{t('labels.undefined')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.currentBalance')} :
                </span>
                <span className="d-block text-custom">
                  <span style={{ color: "#7ba946" }}>358.821.69</span> -{" "}
                  <span className="text-color">{t('labels.view')}</span>
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.draftSalesBalance')} :
                </span>
                <span className="d-block text-custom text-lighter">
                  0 - <span className="text-color">{t('labels.view')}</span>
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                  {t('labels.duePurchaseBalance')} :
                </span>
                <span
                  className="d-block text-custom"
                  style={{ color: "#7ba946" }}
                >
                  358.821.69
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="div-bg my-3">
          <h5 className="text-lighter text-md mb-4">{t('labels.rentalRequests')}</h5>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.rentalRequests')}
                </span>
                <span className="d-block text-custom text-lighter">0</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.rentalProjects')} :
                </span>
                <span className="d-block text-custom text-lighter">1</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.rentalContracts')} :
                </span>
                <span className="d-block text-custom text-lighter">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="div-bg my-3">
          <h5 className="text-lighter text-md mb-4">{t('labels.invoices')}</h5>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.issueGroupedTripPurchases')} :
                </span>
                <span className="d-block text-custom text-color">{t('labels.issue')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.issueGroupedRentalSales')} :
                </span>
                <span className="d-block text-custom text-color">{t('labels.issue')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.issueGroupedRentalPurchases')} :
                </span>
                <span className="d-block text-custom text-color">{t('labels.issue')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.issueManualInternalSales')} :
                </span>
                <span className="d-block text-custom text-color">{t('labels.issue')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.issueManualInternalPurchases')} :
                </span>
                <span className="d-block text-custom text-color">{t('labels.issue')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.totalInternalSales')} :
                </span>
                <span className="d-block text-custom text-color">0</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.dueInternalSales')} :
                </span>
                <span className="d-block text-custom text-color">0</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.undueInternalSales')} :
                </span>
                <span className="d-block text-custom text-color">0</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.draftInternalSales')} :
                </span>
                <span className="d-block text-custom text-color">0</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.totalInternalPurchases')} :
                </span>
                <span className="d-block text-custom text-color">1</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.dueInternalPurchases')} :
                </span>
                <span className="d-block text-custom text-color">1</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.undueInternalPurchases')} :
                </span>
                <span className="d-block text-custom text-color">0</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                {t('labels.draftInternalPurchases')} :
                </span>
                <span className="d-block text-custom text-color">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="div-bg my-3">
          <h5 className="text-lighter text-md mb-4">{t('labels.internalVouchers')}</h5>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.issueReceiptVoucher')} :
                </span>
                <span className="d-block text-custom text-color">{t('labels.issue')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.issuePaymentVoucher')} :
                </span>
                <span className="d-block text-custom text-color">{t('labels.issue')}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.receiptVouchers')} :
                </span>
                <span className="d-block text-custom text-lighter">0</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.paymentVouchers')} :
                </span>
                <span className="d-block text-custom text-lighter">1</span>
              </div>
            </div>
          </div>
        </div>
        <div className="div-bg my-3">
          <h5 className="text-lighter text-md mb-4">{t('labels.accountingReports')}</h5>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.issueClientStatement')} :
                </span>
                <span className="d-block text-custom text-lighter">0</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.issueAdminStatement')} :
                </span>
                <span className="d-block text-custom text-lighter">1</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="input-bg my-2 px-3 py-2 rounded border-lighter d-flex justify-content-between align-items-center">
                <span className="d-block text-custom text-lighter">
                 {t('labels.clientBalance')} :
                </span>
                <span className="d-block text-custom text-lighter">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBranch;
