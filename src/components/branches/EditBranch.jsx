import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import "./branches.css";
import {
  updateTripwayBranches,
  tripwayBranchesRecord,
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NestedList from "../../pages/NestedLoader";

const EditTripwayBranch = () => {
  const { t, i18n } = useTranslation("global");
  const { id } = useParams();
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
    cost_sales_account_id: "",
    payment: "",
    winch_fleet: "0",
    winch_leasing: "0",
    winch_main: "0",
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
    record,
  } = useSelector((state) => state.tripway_branches);
  useEffect(() => {
    setTitle(`${t("labels.winchBranches")} > ${t("labels.editWinchBranch")}`);
    document.title = `${t("labels.winchBranches")} > ${t("labels.editWinchBranch")}`;
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
    dispatch(fetchCostSalesAccounts());
    dispatch(fetchSupplierPenaltiesAccounts());
    dispatch(fetchSalesDiscountAccounts());
    dispatch(tripwayBranchesRecord(id));
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language, dispatch, id]);
  useEffect(() => {
    if (record) {
      setFormData({
        status: record?.status === true ? "1" : "0",
        winch_fleet: record?.winch_fleet === true ? "1" : "0",
        winch_leasing: record?.winch_leasing === true ? "1" : "0",
        winch_main: record?.winch_main === true ? "1" : "0",
        name_ar: record?.name_ar,
        name_en: record?.name_en,
        sales_id: record?.sales_id,
        sales_return_id: record?.sales_return_id,
        realted_parties_account_id: record?.realted_parties_account_id,
        purchase_return_account_id: record?.purchase_return_account_id,
        sales_discount_account_id: record?.sales_discount_account_id,
        customer_penalties_account_id: record?.customer_penalties_account_id,
        supplier_penalties_account_id: record?.supplier_penalties_account_id,
        internal_sales_account_id: record?.internal_sales_account_id,
        internal_cost_sales_account_id: record?.internal_cost_sales_account_id,
        cash_account_id: record?.cash_accounts
          ? record.cash_accounts.map((acc) => acc.id)
          : [],
        bank_account_id: record?.bank_accounts
          ? record.bank_accounts.map((acc) => acc.id)
          : [],
        earned_discount_account_id: record?.earned_discount_account_id,
        cost_sales_account_id: record?.cost_sales_account_id,
        payment: record?.payment,
      });
    }
  }, [record]);
  console.log(record);
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
    dispatch(updateTripwayBranches({ id, payload }));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "tripway_branches/clearState" }); // Clear after toast
          navigate("/tripway_branches");
        },
      });
    }

    if (error && record) {
      toast.error(t("labels.failedToUpdate"), {
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
    <div style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
      {isLoading ? (
        <div className="div-bg">
          <NestedList />
        </div>
      ) : (
        record && (
          <>
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
                  <label className="text-light">
                    {t("labels.nameEnglish")}
                  </label>
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
                  <label className="text-light">
                    {t("labels.salesAccount")}
                  </label>
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
                  <label className="text-light">
                    {t("labels.purchasesAccount")}
                  </label>
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
                  <label className="text-light">
                    {t("labels.cashAccounts")}
                  </label>
                  <Select
                    isMulti
                    required
                    options={cash_accounts?.map((opt) => ({
                      value: opt.id,
                      label: opt.name,
                    }))}
                    value={cash_accounts
                      ?.filter((opt) =>
                        formData.cash_account_id.includes(opt.id)
                      )
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
                  <label className="text-light">
                    {t("labels.bankAccounts")}
                  </label>
                  <Select
                    isMulti
                    required
                    options={bank_accounts?.map((opt) => ({
                      value: opt.id,
                      label: opt.name,
                    }))}
                    value={bank_accounts
                      ?.filter((opt) =>
                        formData.bank_account_id.includes(opt.id)
                      )
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
                  <label className="text-light">
                    {t("labels.payment_method")}
                  </label>
                  <select
                    type="text"
                    className="input-bg w-100"
                    name="payment"
                    value={formData.payment}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {t("labels.selectItem")}
                    </option>
                    <option value="cash">{t("labels.cash")}</option>
                    <option value="postpaid">{t("labels.postpaid")}</option>
                  </select>
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
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <label className="text-md fw-bold">
                    <i className="bi bi-tree-fill main-color"></i>{" "}
                    {t("sidenav.chartOfAccounts")}
                  </label>
                  <hr />
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                      <label className="text-light">
                        {t("labels.tripway_fleet")}
                      </label>
                      <label className="toggle">
                        <input
                          className="toggle-checkbox"
                          type="checkbox"
                          name="winch_fleet"
                          checked={formData.winch_fleet === "1"}
                          onChange={handleChange}
                        />
                        <div className="toggle-switch"></div>
                        <span className="toggle-label"></span>
                      </label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                      <label className="text-light">
                        {t("labels.tripway_leasing")}
                      </label>
                      <label className="toggle">
                        <input
                          className="toggle-checkbox"
                          type="checkbox"
                          name="winch_leasing"
                          checked={formData.winch_leasing === "1"}
                          onChange={handleChange}
                        />
                        <div className="toggle-switch"></div>
                        <span className="toggle-label"></span>
                      </label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                      <label className="text-light">
                        {t("labels.tripway_main")}
                      </label>
                      <label className="toggle">
                        <input
                          className="toggle-checkbox"
                          type="checkbox"
                          name="winch_main"
                          checked={formData.winch_main === "1"}
                          onChange={handleChange}
                        />
                        <div className="toggle-switch"></div>
                        <span className="toggle-label"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
                  <button className="btn show_all" disabled={isLoading}>
                    {isLoading ? t("labels.loading") : t("btns.save")}
                  </button>
                </div>
              </div>
            </form>
          </>
        )
      )}
    </div>
    </>
  );
};

export default EditTripwayBranch;
