import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import "./clients.css";
import {
  updateClients,
  clearState,
  getClients,
} from "../../redux/Slices/ClientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCountries } from "../../redux/Slices/CountriesSlice";
import { fetchCities } from "../../redux/Slices/CitiesSlice";
const EditClient = () => {
  const { t, i18n } = useTranslation("global");
  const { id } = useParams();
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { record, isLoading, error, success } = useSelector(
    (state) => state.clients
  );
  const { cities } = useSelector((state) => state.cities);
  const { countries } = useSelector((state) => state.countries);
  console.log(record);
  const [formData, setFormData] = useState({
    // Basic Information
    name_ar: "",
    name_en: "",
    status: "",
    phone: "",
    gender: "",
    email: "",
    has_fixed_code_verification: "",
    account_suspend: "",
    image: null,

    // Address Info
    country_id: "",
    city_id: "",
    city: "",
    building_no: "",
    street_ar: "",
    street_en: "",
    district_ar: "",
    district_en: "",
    secondary_number: "",
    postal_code: "",
    address_file: null,

    // Financial Settings
    end_order_scenario: "",
    payment_method: "",
    cash_payment_method: "",
    invoice_issuing_method: "",
    payment_method_after_receiving_the_invoice: "",
    quantity_days_issuing_invoices: "",
    quantity_days_payment_after_receiving_invoices: "",

    // Email Settings
    invoice: "",
    bill: "",
    credit_note: "",
    debit_note: "",
    voucher: "",

    // Account Tree
    transaction: "",
  });

  useEffect(() => {
    if (record) {
      setFormData({
        name: record.general_info?.name,
        status: record.general_info?.status === true ? "1" : "0",
        phone: record.general_info?.phone || "",
        gender: record.general_info?.gender || "",
        email: record.general_info?.email || "",
        has_fixed_code_verification:
          record.general_info?.has_fixed_code_verification === true ? "1" : "0",
        account_suspend:
          record.general_info?.account_suspend === true ? "1" : "0",
        image: record.general_info?.image,
        address_file: record.address?.address_file,
        country_id: record.address?.country_id || "",
        city_id: record.address?.city_id || "",
        city: record.address?.city || "",
        building_no: record.address?.building_no || "",
        street_ar: record.address?.street_ar || "",
        street_en: record.address?.street_en || "",
        district_ar: record.address?.district_ar || "",
        district_en: record.address?.district_en || "",
        secondary_number: record.address?.secondary_number || "",
        postal_code: record.address?.postal_code || "",
        end_order_scenario: record.financial_settings?.end_order_scenario || "",
        payment_method: record.financial_settings?.payment_method || "",
        cash_payment_method:
          record.financial_settings?.cash_payment_method || "",
        invoice_issuing_method:
          record.financial_settings?.invoice_issuing_method || "",
        payment_method_after_receiving_the_invoice:
          record.financial_settings
            ?.payment_method_after_receiving_the_invoice || "",
        quantity_days_issuing_invoices:
          record.financial_settings?.quantity_days_issuing_invoices || "",
        quantity_days_payment_after_receiving_invoices:
          record.financial_settings
            ?.quantity_days_payment_after_receiving_invoices || "",
        invoice: record.email_settings?.invoice || "",
        bill: record.email_settings?.bill || "",
        credit_note: record.email_settings?.credit_note || "",
        debit_note: record.email_settings?.debit_note || "",
        voucher: record.email_settings?.voucher || "",

        transaction: record.account_tree?.transaction || "",
      });
    }
  }, [record]);

  useEffect(() => {
    setTitle(`${t("sidenav.individualClients")} > ${t("labels.edit")}`);
  }, [setTitle, t, i18n.language]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file && (name === "image" || name === "address_file")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }
  };

  useEffect(() => {
    dispatch(getClients(id));
    dispatch(fetchCities());
    dispatch(fetchCountries());
  }, [id, i18n.language, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(clearState());

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Skip if value is a string and field expects a file
        if (
          (key === "image" || key === "address_file") &&
          typeof value === "string"
        ) {
          return;
        }

        data.append(key, value);
      }
    });
    console.log(formData);
    dispatch(updateClients({ id, data }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "clients/clearState" });
          navigate("/clients");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "clients/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      {/* form */}
      <form
        className="table_form form-style my-3 py-3 div-bg"
        onSubmit={handleSubmit}
      >
        {/* Nav tabs */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="basicInfo-tab"
              data-bs-toggle="tab"
              href="#basicInfo"
              role="tab"
            >
              {t("labels.basicInformation")}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="address-tab"
              data-bs-toggle="tab"
              href="#address"
              role="tab"
            >
              {t("labels.address")}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="financial_settings-tab"
              data-bs-toggle="tab"
              href="#financial_settings"
              role="tab"
            >
              {t("labels.financial_settings")}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="email_settings-tab"
              data-bs-toggle="tab"
              href="#email_settings"
              role="tab"
            >
              {t("labels.email_settings")}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="account_tree-tab"
              data-bs-toggle="tab"
              href="#account_tree"
              role="tab"
            >
              {t("labels.account_tree")}
            </a>
          </li>
        </ul>
        <div className="tab-content mt-3 my-3 py-3 div-bg">
          <div
            className="tab-pane fade show active"
            id="basicInfo"
            role="tabpanel"
          >
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t("labels.nameArabic")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="name_ar"
                  onChange={handleChange}
                  value={formData.name_ar}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t("labels.nameEnglish")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="name_en"
                  onChange={handleChange}
                  value={formData.name_en}
                />
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.phone")}</label>
                <input
                  type="text"
                  required
                  className="input-bg"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.email")} </label>
                <input
                  type="email"
                  required
                  className="input-bg"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.gender")}</label>
                <select
                  name="gender"
                  required
                  className="w-100 input-bg"
                  onChange={handleChange}
                  value={formData.gender}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="male">{t("labels.male")}</option>
                  <option value="female">{t("labels.female")}</option>
                </select>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.status")}</label>
                <select
                  name="status"
                  required
                  className="w-100 input-bg"
                  onChange={handleChange}
                  value={formData.status}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="1">{t("labels.active")}</option>
                  <option value="0">{t("labels.inactive")}</option>
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.has_fixed_code_verification")}
                </label>
                <select
                  name="has_fixed_code_verification"
                  required
                  className="w-100 input-bg"
                  onChange={handleChange}
                  value={formData.has_fixed_code_verification}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="1">{t("labels.active")}</option>
                  <option value="0">{t("labels.inactive")}</option>
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.account_suspend")}
                </label>
                <select
                  name="account_suspend"
                  required
                  className="w-100 input-bg"
                  onChange={handleChange}
                  value={formData.account_suspend}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="1">{t("labels.active")}</option>
                  <option value="0">{t("labels.inactive")}</option>
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.profileImage")}</label>

                <div className="d-flex align-items-center">
                  <div>
                    <input
                      type="file"
                      name="image"
                      className="border-0 p-0 form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mx-2">
                    {formData.image && (
                      <div className="mb-2">
                        <img
                          src={
                            formData.image instanceof Blob
                              ? URL.createObjectURL(formData.image)
                              : formData.image // use string directly
                          }
                          alt="Preview"
                          className="img-thumbnail"
                          style={{ maxWidth: "70px", maxHeight: "70px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="address" role="tabpanel">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.country")}</label>
                <select
                  className="input-bg w-100"
                  name="country_id"
                  onChange={handleChange}
                  value={formData.country_id}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  {countries && countries.length >= 1 ? (
                    countries.map((country, index) => (
                      <option key={country.id || index} value={country.id}>
                        {country.name}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.city")}</label>
                <select
                  className="input-bg w-100"
                  name="city_id"
                  onChange={handleChange}
                  value={formData.city_id}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  {cities && cities.length >= 1 ? (
                    cities.map((city, index) => (
                      <option key={city.id || index} value={city.id}>
                        {city.name}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.city_code")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.building_no")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="building_no"
                  onChange={handleChange}
                  value={formData.building_no}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.street_ar")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="street_ar"
                  onChange={handleChange}
                  value={formData.street_ar}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.street_en")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="street_en"
                  onChange={handleChange}
                  value={formData.street_en}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.district_ar")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="district_ar"
                  onChange={handleChange}
                  value={formData.district_ar}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.district_en")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="district_en"
                  onChange={handleChange}
                  value={formData.district_en}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.secondary_number")}
                </label>
                <input
                  type="text"
                  className="input-bg"
                  name="secondary_number"
                  onChange={handleChange}
                  value={formData.secondary_number}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.postal_code")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="postal_code"
                  onChange={handleChange}
                  value={formData.postal_code}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.address_file")}</label>
                {formData.address_file ? (
                  <p className="small">
                    <a
                      href={
                        formData.address_file instanceof Blob
                          ? URL.createObjectURL(formData.address_file)
                          : formData.address_file
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("labels.view_file")}
                    </a>
                  </p>
                ) : (
                  t("labels.nothing")
                )}
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.change_file")}</label>

                <input
                  type="file"
                  name="address_file"
                  accept="image/*"
                  className="form-control border-0"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="financial_settings"
            role="tabpanel"
          >
            <div className="row align-items-center">
              {/* end_order_scenario */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.end_order_scenario")}
                </label>
                <select
                  className="input-bg w-100"
                  name="end_order_scenario"
                  value={formData.end_order_scenario}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="with_code_for_user_and_recipient">
                    {t("labels.with_code_for_user_and_recipient")}
                  </option>
                  <option value="with_code_for_user_only">
                    {t("labels.with_code_for_user_only")}
                  </option>
                  <option value="with_code_for_recipient_only">
                    {t("labels.with_code_for_recipient_only")}
                  </option>
                  <option value="without_end_code">
                    {t("labels.without_end_code")}
                  </option>
                </select>
              </div>

              {/* payment_method */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.payment_method")}
                </label>
                <select
                  className="input-bg w-100"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="cash">{t("labels.cash")}</option>
                  <option value="postpaid">{t("labels.postpaid")}</option>
                </select>
              </div>

              {/* cash_payment_method (only if cash) */}
              {formData.payment_method === "cash" && (
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <label className="text-light">
                    {t("labels.cash_payment_method")}
                  </label>
                  <select
                    className="input-bg w-100"
                    name="cash_payment_method"
                    value={formData.cash_payment_method}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      {t("labels.selectItem")}
                    </option>
                    <option value="bank_transfer">
                      {t("labels.bank_transfer")}
                    </option>
                    <option value="cash_to_provider">
                      {t("labels.cash_to_provider")}
                    </option>
                  </select>
                </div>
              )}

              {/* These appear only if postpaid */}
              {formData.payment_method === "postpaid" && (
                <>
                  {/* invoice_issuing_method */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                    <label className="text-light">
                      {t("labels.invoice_issuing_method")}
                    </label>
                    <select
                      className="input-bg w-100"
                      name="invoice_issuing_method"
                      value={formData.invoice_issuing_method}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        {t("labels.selectItem")}
                      </option>
                      <option value="directly">{t("labels.directly")}</option>
                      <option value="after_5_days">
                        {t("labels.after_5_days")}
                      </option>
                      <option value="after_7_days">
                        {t("labels.after_7_days")}
                      </option>
                      <option value="after_30_days">
                        {t("labels.after_30_day")}
                      </option>
                      <option value="after_60_days">
                        {t("labels.after_60_day")}
                      </option>
                      <option value="custom">{t("labels.customized")}</option>
                    </select>
                  </div>

                  {/* payment_method_after_receiving_the_invoice */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                    <label className="text-light">
                      {t("labels.payment_method_after_receiving_the_invoice")}
                    </label>
                    <select
                      className="input-bg w-100"
                      name="payment_method_after_receiving_the_invoice"
                      value={
                        formData.payment_method_after_receiving_the_invoice
                      }
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        {t("labels.selectItem")}
                      </option>
                      <option value="directly">{t("labels.directly")}</option>
                      <option value="after_5_days">
                        {t("labels.after_5_days")}
                      </option>
                      <option value="after_7_days">
                        {t("labels.after_7_days")}
                      </option>
                      <option value="after_30_days">
                        {t("labels.after_30_day")}
                      </option>
                      <option value="after_60_days">
                        {t("labels.after_60_day")}
                      </option>
                      <option value="custom">{t("labels.customized")}</option>
                    </select>
                  </div>

                  {/* quantity_days_issuing_invoices (only if customized invoice method) */}
                  {formData.invoice_issuing_method === "custom" && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                      <label className="text-light">
                        {t("labels.quantity_days_issuing_invoices")}
                      </label>
                      <input
                        className="input-bg"
                        name="quantity_days_issuing_invoices"
                        onChange={handleChange}
                        value={formData.quantity_days_issuing_invoices}
                      />
                    </div>
                  )}

                  {/* quantity_days_payment_after_receiving_invoices (only if customized payment method after invoice) */}
                  {formData.payment_method_after_receiving_the_invoice ===
                    "custom" && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                      <label className="text-light">
                        {t(
                          "labels.quantity_days_payment_after_receiving_invoices"
                        )}
                      </label>
                      <input
                        className="input-bg"
                        name="quantity_days_payment_after_receiving_invoices"
                        onChange={handleChange}
                        value={
                          formData.quantity_days_payment_after_receiving_invoices
                        }
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="tab-pane fade" id="email_settings" role="tabpanel">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.sales_invoices")}
                </label>
                <select
                  className="input-bg w-100"
                  name="invoice"
                  value={formData.invoice}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="enabled">{t("labels.enabled")}</option>
                  <option value="disabled">{t("labels.disabled")}</option>
                </select>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.purchase_invoices")}
                </label>
                <select
                  className="input-bg w-100"
                  name="bill"
                  value={formData.bill}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="enabled">{t("labels.enabled")}</option>
                  <option value="disabled">{t("labels.disabled")}</option>
                </select>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.credit_note")}</label>
                <select
                  className="input-bg w-100"
                  name="credit_note"
                  value={formData.credit_note}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="enabled">{t("labels.enabled")}</option>
                  <option value="disabled">{t("labels.disabled")}</option>
                </select>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.debit_note")}</label>
                <select
                  className="input-bg w-100"
                  name="debit_note"
                  value={formData.debit_note}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="enabled">{t("labels.enabled")}</option>
                  <option value="disabled">{t("labels.disabled")}</option>
                </select>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.voucher")}</label>
                <select
                  className="input-bg w-100"
                  name="voucher"
                  value={formData.voucher}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="enabled">{t("labels.enabled")}</option>
                  <option value="disabled">{t("labels.disabled")}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="tab-pane fade" id="account_tree" role="tabpanel">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.account_tree")}</label>
                <div> {record?.account_tree?.account_tree} </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.transaction")}</label>
                <select
                  className="input-bg w-100"
                  name="transaction"
                  value={formData.transaction}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="show">{t("labels.show")}</option>
                  <option value="hide">{t("labels.hide")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn px-4 save">{t("btns.add")}</button>
        </div>
      </form>
    </>
  );
};

export default EditClient;
