import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettings,
  updateSettings,
  clearState,
} from "../../../redux/Slices/MainSettingsSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBanks } from "../../../redux/Slices/BanksSlice";

const EditMainSettings = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("general_settings");
  const [formData, setFormData] = useState({
    name_arabic: "",
    name_english: "",
    desc: "",
    phone_number: "",
    call_center_customers: "",
    call_center_providers: "",
    whatsapp_customers: "",
    whatsapp_providers: "",
    telegram_customers: "",
    telegram_providers: "",
    whatsapp_customers: "",
    whatsapp_providers: "",
    bank_account_moyasar: "",
    bank_account_hyper_pay: "",
    whatsapp_web: "",
    email: "",
    email_provider: "",
    location: "",
    duration_evaluation_adjustment: "",
    provider_waiting_time: "",
    distance_nearest_city: "",
    time_allowed_control_comment: "",
    verification_code: "",
    default_mobile_number: "",
    invoices_sent_email: "",
    vouchers_sent_email: "",
    vat: "",
    calculating_tax_for_customers: "",
    free_invitations_number_of_kilo_per_person: "",
    free_invitations_amount_value: "",
    loading_workers_price: "",
    unloading_workers_price: "",
    percentage_increase_case_of_price_forecast: "",
    minimum_withdraw_amount: "",
    provider_credit_limit: "",
    search_distance_to_nearest_orders: "",
    user_minimum_points_to_transfer: "",
    user_point_equal_riyal: "",
    user_points_value_sar: "",
    provider_minimum_points_to_transfer: "",
    provider_point_equal_riyal: "",
    provider_points_value_sar: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    linkedin_url: "",
    youtube_url: "",
    google_play_url: "",
    app_store_url: "",
    app_gallery_url: "",
    app_gallery_url: "",
    partners: [],
  });

  const { isLoading, error, success, main_settings } = useSelector(
    (state) => state.main_settings
  );
  const { banks } = useSelector((state) => state.banks);
  useEffect(() => {
    setTitle(`${t("sidenav.main_settings")} > ${t("labels.edit")}`);
    dispatch(fetchSettings());
    dispatch(fetchBanks());
  }, [setTitle, t, i18n.language, id]);

  useEffect(() => {
    if (main_settings && banks?.data?.length > 0) {
      setFormData((prev) => ({
        ...prev,
        name_arabic: main_settings?.system?.name_arabic,
        name_english: main_settings?.system?.name_english,
        desc: main_settings?.system?.desc,
        phone_number: main_settings?.system?.phone_number,
        call_center_customers: main_settings?.system?.call_center_customers,
        call_center_providers: main_settings?.system?.call_center_providers,
        telegram_customers: main_settings?.system?.telegram_customers,
        telegram_providers: main_settings?.system?.telegram_providers,
        whatsapp_customers: main_settings?.system?.whatsapp_customers,
        whatsapp_providers: main_settings?.system?.whatsapp_providers,
        whatsapp_web: main_settings?.system?.whatsapp_web,
        email: main_settings?.system?.email,
        email_provider: main_settings?.system?.email_provider,
        location: main_settings?.system?.location,
        duration_evaluation_adjustment:
          main_settings?.system?.duration_evaluation_adjustment,
        provider_waiting_time: main_settings?.system?.provider_waiting_time,
        distance_nearest_city: main_settings?.system?.distance_nearest_city,
        time_allowed_control_comment:
          main_settings?.system?.time_allowed_control_comment,
        verification_code: main_settings?.system?.verification_code,
        default_mobile_number: main_settings?.system?.default_mobile_number,
        invoices_sent_email: main_settings?.email?.invoices_sent_email,
        vouchers_sent_email: main_settings?.email?.vouchers_sent_email,
        vat: main_settings?.financial?.vat,
        calculating_tax_for_customers:
          main_settings?.financial?.calculating_tax_for_customers === "on_total"
            ? "on_total"
            : "without",
        free_invitations_number_of_kilo_per_person:
          main_settings?.financial?.free_invitations_number_of_kilo_per_person,
        free_invitations_amount_value:
          main_settings?.financial?.free_invitations_amount_value,
        loading_workers_price: main_settings?.financial?.loading_workers_price,
        unloading_workers_price:
          main_settings?.financial?.unloading_workers_price,
        percentage_increase_case_of_price_forecast:
          main_settings?.financial?.percentage_increase_case_of_price_forecast,
        minimum_withdraw_amount:
          main_settings?.financial?.minimum_withdraw_amount,
        provider_credit_limit: main_settings?.financial?.provider_credit_limit,
        bank_account_moyasar:
          banks?.data.find(
            (b) => b.name === main_settings?.financial?.bank_account_moyasar
          )?.id || "",
        bank_account_hyper_pay:
          banks?.data.find(
            (b) => b.name === main_settings?.financial?.bank_account_hyper_pay
          )?.id || "",
        search_distance_to_nearest_orders:
          main_settings?.offer_orders?.search_distance_to_nearest_orders,
        minimum_points_to_transfer:
          main_settings?.points_orders?.user?.minimum_points_to_transfer,
        point_equal_riyal:
          main_settings?.points_orders?.user?.point_equal_riyal,
        points_value_sar: main_settings?.points_orders?.user?.points_value_sar,
        user_minimum_points_to_transfer:
          main_settings?.points_orders?.user?.user_minimum_points_to_transfer,
        user_point_equal_riyal:
          main_settings?.points_orders?.user?.user_point_equal_riyal,
        user_points_value_sar:
          main_settings?.points_orders?.user?.user_points_value_sar,
        provider_minimum_points_to_transfer:
          main_settings?.points_orders?.provider
            ?.provider_minimum_points_to_transfer,
        provider_point_equal_riyal:
          main_settings?.points_orders?.provider?.provider_point_equal_riyal,
        provider_points_value_sar:
          main_settings?.points_orders?.provider?.provider_points_value_sar,
        facebook_url: main_settings?.social_media?.facebook_url,
        twitter_url: main_settings?.social_media?.twitter_url,
        instagram_url: main_settings?.social_media?.instagram_url,
        linkedin_url: main_settings?.social_media?.linkedin_url,
        youtube_url: main_settings?.social_media?.youtube_url,
        google_play_url: main_settings?.application_urls?.google_play_url,
        app_store_url: main_settings?.application_urls?.app_store_url,
        app_gallery_url: main_settings?.application_urls?.app_gallery_url,
        success_partners: Array.isArray(main_settings?.success_partners)
          ? main_settings.success_partners
          : [],
      }));
    }
  }, [main_settings, banks]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePartnerChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedPartners = [...prev.success_partners];
      updatedPartners[index] = {
        ...updatedPartners[index],
        [name]: value,
      };
      return {
        ...prev,
        success_partners: updatedPartners,
      };
    });
  };
  // add new partner
  const addPartner = () => {
    setFormData((prev) => ({
      ...prev,
      success_partners: [
        ...prev.success_partners,
        { name: "", link: "", file: null, logoPreview: null, id: null },
      ],
    }));
  };

  // remove partner
  const removePartner = (index) => {
    setFormData((prev) => ({
      ...prev,
      success_partners: prev.success_partners.filter((_, i) => i !== index),
    }));
  };
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(`${t("only_allowed")} jpeg, png, jpg.`);
      return;
    }

    setFormData((prev) => {
      const partners = [...prev.success_partners];
      partners[index] = {
        ...partners[index],
        file,
        logoPreview: URL.createObjectURL(file),
      };
      return { ...prev, success_partners: partners };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearState());

    try {
      const payload = new FormData();
      payload.append("system_name_arabic", formData.name_arabic || "");
      payload.append("system_name_english", formData.name_english || "");
      payload.append("desc", formData.desc || "");
      payload.append("phone_number", formData.phone_number || "");
      payload.append(
        "call_center_customers",
        formData.call_center_customers || ""
      );
      payload.append(
        "call_center_providers",
        formData.call_center_providers || ""
      );
      payload.append("telegram_customers", formData.telegram_customers || "");
      payload.append("telegram_providers", formData.telegram_providers || "");
      payload.append("whatsapp_customers", formData.whatsapp_customers || "");
      payload.append("whatsapp_providers", formData.whatsapp_providers || "");
      payload.append("verification_code", formData.verification_code || "");
      payload.append("website", formData.website || "");
      payload.append("email", formData.email || "");
      payload.append("email_provider", formData.email_provider || "");
      payload.append("location", formData.location || "");
      payload.append(
        "duration_evaluation_adjustment",
        formData.duration_evaluation_adjustment || ""
      );
      payload.append(
        "provider_waiting_time",
        formData.provider_waiting_time || ""
      );
      payload.append(
        "distance_nearest_city",
        formData.distance_nearest_city || ""
      );
      payload.append(
        "default_mobile_number",
        formData.default_mobile_number || ""
      );
      payload.append(
        "time_allowed_control_comment",
        formData.time_allowed_control_comment || ""
      );
      payload.append("time_in_minutes", formData.time_in_minutes || "");
      payload.append("invoices_sent_email", formData.invoices_sent_email || "");
      payload.append("vouchers_sent_email", formData.vouchers_sent_email || "");
      payload.append("vat", formData.vat || "");
      payload.append(
        "free_invitations_amount_value",
        formData.free_invitations_amount_value || ""
      );
      payload.append(
        "calculating_tax_for_customers",
        formData.calculating_tax_for_customers || ""
      );
      payload.append(
        "loading_workers_price",
        formData.loading_workers_price || ""
      );
      payload.append(
        "unloading_workers_price",
        formData.unloading_workers_price || ""
      );
      payload.append(
        "percentage_increase_case_of_price_forecast",
        formData.percentage_increase_case_of_price_forecast || ""
      );
      payload.append(
        "minimum_withdraw_amount",
        formData.minimum_withdraw_amount || ""
      );
      payload.append(
        "provider_credit_limit",
        formData.provider_credit_limit || ""
      );
      payload.append(
        "bank_account_moyasar",
        formData.bank_account_moyasar || ""
      );
      payload.append(
        "bank_account_hyper_pay",
        formData.bank_account_hyper_pay || ""
      );
      payload.append(
        "free_invitations_number_of_kilo_per_person",
        formData.free_invitations_number_of_kilo_per_person || ""
      );
      payload.append(
        "search_distance_to_nearest_orders",
        formData.search_distance_to_nearest_orders || ""
      );
      payload.append(
        "user_point_equal_riyal",
        formData.user_point_equal_riyal || ""
      );
      payload.append(
        "user_minimum_points_to_transfer",
        formData.user_minimum_points_to_transfer || ""
      );
      payload.append(
        "user_points_value_sar",
        formData.user_points_value_sar || ""
      );
      payload.append(
        "provider_point_equal_riyal",
        formData.provider_point_equal_riyal || ""
      );
      payload.append(
        "provider_minimum_points_to_transfer",
        formData.provider_minimum_points_to_transfer || ""
      );
      payload.append(
        "provider_points_value_sar",
        formData.provider_points_value_sar || ""
      );
      payload.append("facebook_url", formData.facebook_url || "");
      payload.append("twitter_url", formData.twitter_url || "");
      payload.append("instagram_url", formData.instagram_url || "");
      payload.append("linkedin_url", formData.linkedin_url || "");
      payload.append("youtube_url", formData.youtube_url || "");
      payload.append("google_play_url", formData.google_play_url || "");
      payload.append("app_store_url", formData.app_store_url || "");
      payload.append("app_gallery_url", formData.app_gallery_url || "");
      formData.success_partners.forEach((partner, index) => {
        payload.append(`partners[${index}][name]`, partner.name);
        payload.append(`partners[${index}][link]`, partner.link);

        if (partner.file) {
          // new or previously saved file object
          payload.append(`partners[${index}][media][0][logo]`, partner.file);
        }
      });

      await dispatch(updateSettings(payload)).unwrap();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "main_settings/clearState" });
        },
      });
      window.location.reload();
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "main_settings/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <>
      {/* Nav Tabs */}
      <ul className="nav nav-tabs mb-3">
        {[
          "general_settings",
          "messaging_settings",
          "financial_settings",
          "rfq_settings",
          "points_settings",
          "success_partners",
          "social_links",
          "app_links",
        ].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              type="button"
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {t(`settings.${tab}`)}
            </button>
          </li>
        ))}
      </ul>

      {/* Form wrapping all tabs */}
      <form
        onSubmit={handleSubmit}
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="tab-content">
          {activeTab === "general_settings" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.system_name_ar")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="name_arabic"
                    value={formData.name_arabic}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.system_name_en")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="name_english"
                    value={formData.name_english}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <label className="text-light">
                    {t("settings.system_description")}
                  </label>
                  <textarea
                    className="input-bg"
                    name="desc"
                    rows={4}
                    value={formData.desc || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.phone_number")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.customer_phone")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="call_center_customers"
                    value={formData.call_center_customers}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.provider_phone")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="call_center_providers"
                    value={formData.call_center_providers}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.customer_telegram")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="telegram_customers"
                    value={formData.telegram_customers}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.provider_telegram")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="telegram_providers"
                    value={formData.telegram_providers}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.customer_whatsapp")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="whatsapp_customers"
                    value={formData.whatsapp_customers}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.provider_whatsapp")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="whatsapp_providers"
                    value={formData.whatsapp_providers}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.website_whatsapp")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="whatsapp_web"
                    value={formData.whatsapp_web}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">{t("settings.email")}</label>
                  <input
                    type="text"
                    className="input-bg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.provider_email")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="email_provider"
                    value={formData.email_provider}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">{t("settings.address")}</label>
                  <input
                    type="text"
                    className="input-bg"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.nearest_cities_distance")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="distance_nearest_city"
                    value={formData.distance_nearest_city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.provider_waiting_duration")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="provider_waiting_time"
                    value={formData.provider_waiting_time}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-xs text-secondary">
                    {t("settings.provider_waiting_seconds")}
                  </small>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.rating_edit_duration")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="duration_evaluation_adjustment"
                    value={formData.duration_evaluation_adjustment}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-secondary text-xs">
                    {t("settings.rating_edit_time_hours")}
                  </small>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.comments_control_time")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="time_allowed_control_comment"
                    value={formData.time_allowed_control_comment}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-xs text-secondary">
                    {t("settings.time_minutes")}
                  </small>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.default_verification_code")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="verification_code"
                    value={formData.verification_code}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.default_mobile_number")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="default_mobile_number"
                    value={formData.default_mobile_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "messaging_settings" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.invoice_email")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="invoices_sent_email"
                    value={formData.invoices_sent_email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.receipt_email")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="vouchers_sent_email"
                    value={formData.vouchers_sent_email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "financial_settings" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">{t("settings.vat")}</label>
                  <input
                    type="text"
                    className="input-bg"
                    name="vat"
                    value={formData.vat}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.vat_customers")}
                  </label>
                  <select
                    className="input-bg"
                    name="calculating_tax_for_customers"
                    value={formData.calculating_tax_for_customers}
                    onChange={handleChange}
                    required
                  >
                    <option value="on_total">{t("settings.on_total")}</option>
                    <option value="without">{t("settings.without")}</option>
                  </select>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.free_invites_per_km")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="free_invitations_number_of_kilo_per_person"
                    value={formData.free_invitations_number_of_kilo_per_person}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.free_invites_amount")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="free_invitations_amount_value"
                    value={formData.free_invitations_amount_value}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.loading_workers_price")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="loading_workers_price"
                    value={formData.loading_workers_price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.unloading_workers_price")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="unloading_workers_price"
                    value={formData.unloading_workers_price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.price_increase_percentage")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="percentage_increase_case_of_price_forecast"
                    value={formData.percentage_increase_case_of_price_forecast}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.min_withdraw_amount_providers")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="minimum_withdraw_amount"
                    value={formData.minimum_withdraw_amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.drivers_credit_limit")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="provider_credit_limit"
                    value={formData.provider_credit_limit}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.bank_account_moyasar")}
                  </label>

                  <select
                    className="input-bg w-100"
                    name="bank_account_moyasar"
                    value={formData.bank_account_moyasar}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {t("labels.selectItem")}
                    </option>
                    {banks &&
                      banks?.data?.length > 0 &&
                      banks?.data?.map((bank, index) => (
                        <option key={bank?.id || index} value={bank?.id}>
                          {bank?.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.bank_account_hyperpay")}
                  </label>
                  <select
                    className="input-bg w-100"
                    name="bank_account_hyper_pay"
                    value={formData.bank_account_hyper_pay}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {t("labels.selectItem")}
                    </option>
                    {banks &&
                      banks?.data?.length > 0 &&
                      banks?.data?.map((bank, index) => (
                        <option key={bank?.id || index} value={bank?.id}>
                          {bank?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rfq_settings" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.nearest_orders_distance")}
                  </label>
                  <input
                    type="number"
                    className="input-bg"
                    name="search_distance_to_nearest_orders"
                    value={formData.search_distance_to_nearest_orders}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-xs text-secondary">
                    {t("settings.distance_in_km")}
                  </small>
                </div>
              </div>
            </div>
          )}

          {activeTab === "points_settings" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <h5 className="fw-bold text-lg main-color">
                    <i className="bi bi-people"></i>{" "}
                    {t("settings.customer_app")}
                  </h5>
                  <hr />
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <label className="text-light">
                    {t("settings.point_value")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="user_point_equal_riyal"
                    value={formData.user_point_equal_riyal}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-xs text-secondary">
                    {t("settings.required_amount_for_point")}
                  </small>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <br />

                  <h5 className="text-dark text-md fw-bold">
                    {t("settings.min_points_transfer")}
                  </h5>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.points_number")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="user_minimum_points_to_transfer"
                    value={formData.user_minimum_points_to_transfer}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.value_of_financial_points_sr")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="user_points_value_sar"
                    value={formData.user_points_value_sar}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <h5 className="fw-bold text-lg main-color">
                    <i className="bi bi-briefcase"></i>{" "}
                    {t("settings.provider_app")}
                  </h5>
                  <hr />
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <label className="text-light">
                    {t("settings.point_value")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="provider_point_equal_riyal"
                    value={formData.provider_point_equal_riyal}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-xs text-secondary">
                    {t("settings.required_amount_for_point")}
                  </small>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <br />

                  <h5 className="text-dark text-md fw-bold">
                    {t("settings.min_points_transfer")}
                  </h5>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.points_number")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="provider_minimum_points_to_transfer"
                    value={formData.provider_minimum_points_to_transfer}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.value_of_financial_points_sr")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="provider_points_value_sar"
                    value={formData.provider_points_value_sar}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "success_partners" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                  <b>{t("settings.photo")}</b>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <b>{t("settings.name")}</b>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <b>{t("settings.link")}</b>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-6 col-12"></div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <hr />
                </div>
              </div>

              {formData.success_partners?.map((partner, index) => (
                <div
                  className="row mb-3"
                  key={partner.id || `partner-${index}`}
                >
                  <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <div className="d-flex align-items-center justify-content-between">
                      <small>{t("settings.upload_photo")}</small>

                      <div>
                        <div className="upload_photo pt-1 my-2">
                          <img src="./camera.png" alt="--" />
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => handleFileChange(e, index)}
                          />
                        </div>
                      </div>
                      <div>
                        <img
                          src={
                            partner.logoPreview || partner.logo || "./image.jpg"
                          }
                          className="view_photo"
                          alt="--"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                    <input
                      type="text"
                      className="input-bg"
                      style={{ marginTop: "20px" }}
                      name="name"
                      value={partner.name}
                      onChange={(e) => handlePartnerChange(e, index)}
                      required
                    />
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                    <input
                      type="text"
                      className="input-bg"
                      style={{ marginTop: "20px" }}
                      name="link"
                      placeholder={t("valid_url")}
                      value={partner.link}
                      onChange={(e) => handlePartnerChange(e, index)}
                      required
                    />
                  </div>

                  <div className="col-xl-1 col-lg-1 col-md-6 col-12">
                    <button
                      className="btn btn-sm btn-danger"
                      style={{ marginTop: "30px" }}
                      onClick={() => removePartner(index)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col-12 text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={addPartner}
                  >
                    <i className="bi bi-plus"></i> {t("btns.add")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "social_links" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">{t("settings.facebook")}</label>
                  <input
                    type="text"
                    className="input-bg"
                    name="facebook_url"
                    value={formData.facebook_url}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">{t("settings.twitter")}</label>
                  <input
                    type="text"
                    className="input-bg"
                    name="twitter_url"
                    value={formData.twitter_url}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.instagram")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="instagram_url"
                    value={formData.instagram_url}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">{t("settings.linkedin")}</label>
                  <input
                    type="text"
                    className="input-bg"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">{t("settings.youtube")}</label>
                  <input
                    type="text"
                    className="input-bg"
                    name="youtube_url"
                    value={formData.youtube_url}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "app_links" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.google_play")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="google_play_url"
                    value={formData.google_play_url}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.app_store")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="app_store_url"
                    value={formData.app_store_url}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label className="text-light">
                    {t("settings.app_gallery")}
                  </label>
                  <input
                    type="text"
                    className="input-bg"
                    name="app_gallery_url"
                    value={formData.app_gallery_url}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-3">
          <button className="btn show_all" disabled={isLoading}>
            {isLoading ? t("labels.loading") : t("btns.save")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditMainSettings;
