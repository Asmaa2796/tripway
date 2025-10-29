import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import "./branches.css";
import {
  addTripwayBranches,
  clearState,
  fetchSalesAccounts,
  fetchRelatedPartiesAccounts,
  fetchInternalSalesAccounts,
  fetchInternalCostSalesAccounts,
  fetchPurchaseReturnsAccounts,
  fetchCashAccounts,
  fetchSalesReturnsAccounts,
  fetchEarnedDiscountAccounts,
  fetchCustomerPenaltiesAccounts,
  fetchCostSalesAccounts,
  fetchSupplierPenaltiesAccounts,
  fetchSalesDiscountAccounts,
  fetchBankAccounts,
} from "../../redux/Slices/TripwayBranchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTripwayBranch = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    status: "0",
    sales_id: "",
    sales_return_id: "",
    realted_parties_account_id: "",
    cost_sales_account_id: "",
    purchase_return_account_id: "",
    sales_discount_account_id: "",
    customer_penalties_account_id: "",
    supplier_penalties_account_id: "",
    internal_sales_account_id: "",
    internal_cost_sales_account_id: "",
    cash_account_id: [],
    bank_account_id: [],
    earned_discount_account_id: "",
  });
  const {
    isLoading,
    error,
    success,
    sales_accounts,
    sales_returns_accounts,
    related_parties_accounts,
    internal_sales_accounts,
    internal_cost_sales_accounts,
    purchase_returns_accounts,
    cash_accounts,
    earned_discount_accounts,
    customer_penalties_accounts,
    cost_sales_accounts,
    supplier_penalties_accounts,
    sales_discount_accounts,
    bank_accounts,
  } = useSelector((state) => state.tripway_branches);
  useEffect(() => {
    setTitle(`${t("labels.winchBranches")} > ${t("labels.addWinchBranch")}`);
    document.title = `${t("labels.winchBranches")} > ${t("labels.addWinchBranch")}`;
    dispatch(fetchSalesAccounts());
    dispatch(fetchBankAccounts());
    dispatch(fetchSalesReturnsAccounts());
    dispatch(fetchRelatedPartiesAccounts());
    dispatch(fetchInternalSalesAccounts());
    dispatch(fetchInternalCostSalesAccounts());
    dispatch(fetchPurchaseReturnsAccounts());
    dispatch(fetchCashAccounts());
    dispatch(fetchEarnedDiscountAccounts());
    dispatch(fetchCustomerPenaltiesAccounts());
    dispatch(fetchSupplierPenaltiesAccounts());
    dispatch(fetchSalesDiscountAccounts());
    dispatch(fetchCostSalesAccounts());
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language, dispatch]);
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    }));
  };
  const handleMultiSelectChange = (selectedOptions, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      cash_account_id: formData.cash_account_id.join(","),
      bank_account_id: formData.bank_account_id.join(","),
    };
    dispatch(clearState());
    dispatch(addTripwayBranches(payload));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "tripway_branches/clearState" }); // Clear after toast
          navigate("/tripway_branches");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "tripway_branches/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/tripway_branches" className="btn btn-dark btn-sm text-white">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
      {/* form */}
      <form
        className="table_form form-style my-3 py-3 div-bg"
        onSubmit={handleSubmit}
      >
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.nameArabic")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.nameEnglish")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_en"
              value={formData.name_en}
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.salesAccount")}</label>
            <select
              type="text"
              className="input-bg w-100"
              name="sales_id"
              value={formData.sales_id}
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {sales_accounts &&
                sales_accounts.length > 0 &&
                sales_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.salesReturnsAccount")}
            </label>
            <select
              type="text"
              className="input-bg w-100"
              name="sales_return_id"
              required
              value={formData.sales_return_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {sales_returns_accounts &&
                sales_returns_accounts.length > 0 &&
                sales_returns_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.relatedPartiesAccount")}
            </label>
            <select
              type="text"
              className="input-bg w-100"
              required
              name="realted_parties_account_id"
              value={formData.realted_parties_account_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {related_parties_accounts &&
                related_parties_accounts.length > 0 &&
                related_parties_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.purchasesAccount")}</label>
            <select
              type="text"
              className="input-bg w-100"
              required
              name="cost_sales_account_id"
              value={formData.cost_sales_account_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {cost_sales_accounts &&
                cost_sales_accounts.length > 0 &&
                cost_sales_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.purchaseReturnsAccount")}
            </label>
            <select
              type="text"
              required
              className="input-bg w-100"
              name="purchase_return_account_id"
              value={formData.purchase_return_account_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {purchase_returns_accounts &&
                purchase_returns_accounts.length > 0 &&
                purchase_returns_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.internalSalesAccount")}
            </label>
            <select
              type="text"
              className="input-bg w-100"
              required
              name="internal_sales_account_id"
              value={formData.internal_sales_account_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {internal_sales_accounts &&
                internal_sales_accounts.length > 0 &&
                internal_sales_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.internalSalesCostAccount")}
            </label>
            <select
              type="text"
              className="input-bg w-100"
              required
              name="internal_cost_sales_account_id"
              value={formData.internal_cost_sales_account_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {internal_cost_sales_accounts &&
                internal_cost_sales_accounts.length > 0 &&
                internal_cost_sales_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.earnedDiscountAccount")}
            </label>
            <select
              type="text"
              className="input-bg w-100"
              name="earned_discount_account_id"
              value={formData.earned_discount_account_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {earned_discount_accounts &&
                earned_discount_accounts.length > 0 &&
                earned_discount_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.customerPenaltiesAccounts")}
            </label>
            <select
              type="text"
              className="input-bg w-100"
              name="customer_penalties_account_id"
              value={formData.customer_penalties_account_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {customer_penalties_accounts &&
                customer_penalties_accounts.length > 0 &&
                customer_penalties_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.salesDiscountAccounts")}
            </label>
            <select
              type="text"
              className="input-bg w-100"
              name="sales_discount_account_id"
              value={formData.sales_discount_account_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {sales_discount_accounts &&
                sales_discount_accounts.length > 0 &&
                sales_discount_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">
              {t("labels.supplierPenaltiesAccounts")}
            </label>
            <select
              type="text"
              className="input-bg w-100"
              name="supplier_penalties_account_id"
              value={formData.supplier_penalties_account_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {supplier_penalties_accounts &&
                supplier_penalties_accounts.length > 0 &&
                supplier_penalties_accounts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}{" "}
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.cashAccounts")}</label>
            <Select
              isMulti
              required
              options={cash_accounts?.map((opt) => ({
                value: opt.id,
                label: opt.name,
              }))}
              value={cash_accounts
                ?.filter((opt) => formData.cash_account_id.includes(opt.id))
                .map((opt) => ({ value: opt.id, label: opt.name }))}
              onChange={(selected) =>
                handleMultiSelectChange(selected, "cash_account_id")
              }
              className="input-bg"
              placeholder={t("labels.selectItem")}
              styles={{
                control: (base) => ({
                  ...base,
                  fontSize: "13px",
                }),
                option: (base) => ({
                  ...base,
                  fontSize: "13px",
                }),
                multiValue: (base) => ({
                  ...base,
                  fontSize: "13px",
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: "13px",
                }),
              }}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.bankAccounts")}</label>
            <Select
              isMulti
              required
              options={bank_accounts?.map((opt) => ({
                value: opt.id,
                label: opt.name,
              }))}
              value={bank_accounts
                ?.filter((opt) => formData.bank_account_id.includes(opt.id))
                .map((opt) => ({ value: opt.id, label: opt.name }))}
              onChange={(selected) =>
                handleMultiSelectChange(selected, "bank_account_id")
              }
              className="input-bg"
              placeholder={t("labels.selectItem")}
              styles={{
                control: (base) => ({
                  ...base,
                  fontSize: "13px",
                }),
                option: (base) => ({
                  ...base,
                  fontSize: "13px",
                }),
                multiValue: (base) => ({
                  ...base,
                  fontSize: "13px",
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: "13px",
                }),
              }}
            />
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <label className="toggle">
              <input
                className="toggle-checkbox"
                type="checkbox"
                name="status"
                checked={formData.status === "1"}
                onChange={handleChange}
              />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
            <button className="btn show_all" disabled={isLoading}>
              {isLoading ? t("labels.loading") : t("btns.add")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTripwayBranch;
