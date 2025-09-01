import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from 'react-i18next';
import "./branches.css";
const EditBranch = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(`${t('labels.winchBranches')} > ${t('labels.editWinchBranch')}`);
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3 div-bg">
        <div className="row align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t('sign.name')}</label>
            <input type="text" className="input-bg" name="name" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.salesAccount')}</label>
            <input type="text" className="input-bg" name="sales_account" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.salesReturnsAccount')}</label>
            <input
              type="text"
              className="input-bg"
              name="sales_returns_account"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.relatedPartiesAccount')}</label>
            <input
              type="text"
              className="input-bg"
              name="related_party_account"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.purchasesAccount')}</label>
            <input type="text" className="input-bg" name="purchases_account" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.purchaseReturnsAccount')}</label>
            <input
              type="text"
              className="input-bg"
              name="purchase_returns_account"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.internalSalesAccount')}</label>
            <input
              type="text"
              className="input-bg"
              name="internal_sales_account"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.internalSalesCostAccount')}</label>
            <input
              type="text"
              className="input-bg"
              name="cost_internal_sales"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.cashAccounts')}</label>
            <input type="text" className="input-bg" name="cash_accounts" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.bankAccounts')}</label>
            <input type="text" className="input-bg" name="bank_accounts" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.paymentMethod')}</label>
            <select name="payment_methods" className="w-100 input-bg">
              <option value="1">-</option>
              <option value="2">{t('labels.cash')}</option>
            </select>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t('labels.status')}</label>
            <label className="toggle">
              <input className="toggle-checkbox" type="checkbox" />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button className="btn save">{t('btns.saveChanges')}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditBranch;
