import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  chartAccountsRecord,
  fetchChartAccounts,
  updateChartAccounts,
  clearState,
} from "../../../redux/Slices/ChartAccountsSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const EditChartOfAccounts = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    description_en: "",
    description_ar: "",
    parent_id: "",
    nature_account: "", // select 'debitor', 'creditor', 'undefined'
    account_type: "", // select 'undefined', 'income_list', 'balance_sheet','internal_income_list'
    taxable: "0", // select tag and label yes or no but value 0 or 1
    accept_payments: "0",
    active_sub_account: "0",
    activation_type: "customize", // select tag and label customize or all
    sub_account: "", // select 'undefined','business_sector','individual_customers','owner','provider','purchase_supplier','fleet_suppliers','leasing_suppliers','employees','maintenance_types','fuel_types','winch_branches'
  });
  const { chart_accounts,record, isLoading, error, success } = useSelector(
    (state) => state.chart_accounts
  );
  useEffect(() => {
    setTitle(`${t("sidenav.chartOfAccounts")} > ${t("labels.edit")}`);
    dispatch(chartAccountsRecord(id));
  }, [setTitle, t, i18n.language]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? (checked ? "1" : "0") : value;

    setFormData((prev) => {
      let updated = { ...prev, [name]: newValue };

      // If accept_payments is unchecked, reset dependent fields
      if (name === "accept_payments" && newValue === "0") {
        updated.active_sub_account = "";
        updated.activation_type = "";
        updated.sub_account = "";
      }

      if (name === "active_sub_account" && newValue === "0") {
        updated.activation_type = "";
        updated.sub_account = "";
      }

      return updated;
    });
  };
  useEffect(() => {
    if (record) {
      setFormData({
        name_ar: record?.name_ar,
        name_en: record?.name_en,
        description_en: record?.desc_en,
        description_ar: record?.desc_ar,
        parent_id: record?.parent_id,
        nature_account: record?.nature_account,
        account_type: record?.account_type,
        taxable: record?.taxable === false ? "0":"1",
        activation_type: record?.activation_type,
        active_sub_account: record?.active_sub_account === false ? "0":"1",
        accept_payments: record?.accept_payments === false ? "0":"1",
        sub_account: record?.sub_account,
      });
    }
  }, [record]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(clearState());
    dispatch(updateChartAccounts({ id, formData }));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "chart_accounts/clearState" });
            navigate("/chart_of_accounts");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "chart_accounts/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="row align-items-center">
          {/* Name AR */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.name_ar")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
          </div>
          {/* Name EN */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.name_en")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              required
            />
          </div>
          {/* Desc AR */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.desc_ar")}</label>
            <textarea
              className="input-bg"
              name="description_ar"
              rows={4}
              value={formData.description_ar}
              onChange={handleChange}
              required
            />
          </div>
          {/* Desc EN */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.desc_en")}</label>
            <textarea
              className="input-bg"
              name="description_en"
              rows={4}
              value={formData.description_en}
              onChange={handleChange}
              required
            />
          </div>

          {/* Main Account */}
          <div className="col-xl-6 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.mainAccount")}</label>
            <select
              className="input-bg"
              name="parent_id"
              value={formData.parent_id}
              onChange={handleChange}
              disabled
              style={{cursor:"no-drop"}}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              {chart_accounts &&
                chart_accounts.length > 0 &&
                chart_accounts.map((opt, index) => (
                  <option value={opt?.id} key={opt?.id || index}>
                    {opt?.name}
                  </option>
                ))}
            </select>
          </div>
          {/* Nature Account */}
          <div className="col-xl-6 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.natureAccount")}</label>
            <select
              className="input-bg"
              name="nature_account"
              value={formData.nature_account}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="debitor">{t("labels.debitor")}</option>
              <option value="creditor">{t("labels.creditor")}</option>
              <option value="undefined">{t("labels.undefined")}</option>
            </select>
          </div>

          {/* Account Type */}
          <div className="col-xl-6 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.accountType")}</label>
            <select
              className="input-bg"
              name="account_type"
              value={formData.account_type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="undefined">{t("labels.undefined")}</option>
              <option value="income_list">{t("labels.incomeList")}</option>
              <option value="balance_sheet">{t("labels.balanceSheet")}</option>
              <option value="internal_income_list">
                {t("labels.internalIncomeList")}
              </option>
            </select>
          </div>

          {/* Taxable */}
          <div className="col-xl-6 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.taxable")}</label>
            <select
              className="input-bg"
              name="taxable"
              value={formData.taxable}
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="0">{t("labels.no")}</option>
              <option value="1">{t("labels.yes")}</option>
            </select>
          </div>

          {/* Accept Payments */}
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div
              className="form-check form-switch mt-4 p-0"
              style={{ display: "flex", flexDirection: "column-reverse" }}
            >
              <input
                className="form-check-input no-class"
                type="checkbox"
                id="acceptPayments"
                name="accept_payments"
                checked={formData.accept_payments === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label text-light">
                {t("labels.acceptPayments")}
              </label>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div
              className="form-check form-switch mt-4 p-0"
              style={{ display: "flex", flexDirection: "column-reverse" }}
            >
              <input
                className="form-check-input no-class"
                type="checkbox"
                id="activeSubAccount"
                name="active_sub_account"
                checked={formData.active_sub_account === "1"}
                onChange={handleChange}
              />
              <label className="form-check-label text-light">
                {t("labels.activeSubAccount")}
              </label>
            </div>
          </div>

          {/* Show only if active_sub_account = 1 */}
          {formData.active_sub_account === "1" && (
            <>
              {/* Activation Type */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.activationType")}
                </label>
                <select
                  className="input-bg"
                  name="activation_type"
                  required
                  value={formData.activation_type}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="customize">{t("labels.customize")}</option>
                  <option value="all">{t("labels.all")}</option>
                </select>
              </div>

              {/* Sub Account */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.subAccount")}</label>
                <select
                  className="input-bg"
                  name="sub_account"
                  required
                  value={formData.sub_account}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="undefined">{t("labels.undefined")}</option>
                  <option value="business_sector">
                    {t("labels.businessSector")}
                  </option>
                  <option value="individual_customers">
                    {t("labels.individualCustomers")}
                  </option>
                  <option value="owner">{t("labels.owner")}</option>
                  <option value="provider">{t("labels.provider")}</option>
                  <option value="purchase_supplier">
                    {t("labels.purchaseSupplier")}
                  </option>
                  <option value="fleet_suppliers">
                    {t("labels.fleetSuppliers")}
                  </option>
                  <option value="leasing_suppliers">
                    {t("labels.leasingSuppliers")}
                  </option>
                  <option value="employees">{t("labels.employees")}</option>
                  <option value="maintenance_types">
                    {t("labels.maintenanceTypes")}
                  </option>
                  <option value="fuel_types">{t("labels.fuelTypes")}</option>
                  <option value="winch_branches">
                    {t("labels.tripwayBranches")}
                  </option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-4">
          <button className="btn show_all" disabled={isLoading}>
            {isLoading ? t("labels.loading") : t("btns.save")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditChartOfAccounts;
