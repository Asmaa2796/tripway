import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addfaqs, clearState } from "../../redux/Slices/FAQsSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../Settings/QuotationFeatures/Q.css";
const CreatePriceOfferRequests = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    q_ar: "",
    q_en: "",
    a_ar: "",
    a_en: "",
  });

  const { isLoading, error, success } = useSelector((state) => state.faqs);
  useEffect(() => {
    setTitle(`${t("sidenav.priceOfferRequests")} > ${t("btns.add")}`);
    document.title = `${t("sidenav.priceOfferRequests")} > ${t("btns.add")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleQuillChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addfaqs(formData));
    // setFormData({
    //   q_ar: "",
    //   q_en: "",
    //   a_ar: "",
    //   a_en: "",
    // });
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "faqs/clearState" }); // Clear after toast
          navigate("/faqs");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "faqs/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link
          to="/price_offer_requests"
          className="btn btn-dark btn-sm text-white"
        >
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
        onSubmit={handleSubmit}
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="row align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="form-check-label text-light">
              {t("labels.the_client_is_registered_with_us")}
            </label>
            <div className="d-flex justify-content-start">
              <div className="form-check form-switch">
                <input
                  className="form-check-input no-class"
                  type="checkbox"
                  role="switch"
                  id="switchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="switchCheckDefault"
                ></label>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.clientType")}</label>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="">{t("sidenav.individualClients")}</option>
              <option value="">{t("labels.businessSector")}</option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.client")}</label>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.companyActivity")}</label>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.responsibleName")}</label>
            <input type="text" name="" id="" className="input-bg" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.email")}</label>
            <input type="email" name="" id="" className="input-bg" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.requestsAverage")}</label>
            <input type="text" name="" id="" className="input-bg"/>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.companyCategory")}</label>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="">{t("labels.undefined")}</option>
              <option value="">A+</option>
              <option value="">A</option>
              <option value="">B</option>
              <option value="">C</option>
            </select>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <h5 className="fw-bold main-color text-lg">
              <i className="bi bi-link-45deg"></i> {t("labels.linking_options")}
            </h5>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="fw-bold">
              {t("labels.link_to_customer_quotes")}
            </label>
            <input type="text" name="" id="" className="input-bg"/>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="fw-bold">
              {t("labels.link_to_supplier_quotes")}
            </label>
            <input type="text" name="" id="" className="input-bg" />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <h5 className="fw-bold main-color text-lg">
              <i className="bi bi-info-circle-fill"></i>{" "}
              {t("labels.request_information")}
            </h5>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.orderType")}</label>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="">{t("labels.trips")}</option>
              <option value="">{t("labels.daily_rent")}</option>
              <option value="">{t("labels.monthly_rent")}</option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.transport_type")}</label>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
            </select>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.loadType")}</label>
            <textarea name="" id="" className="input-bg"></textarea>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.notes")}</label>
            <textarea name="" id="" className="input-bg"></textarea>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <h5 className="fw-bold main-color text-lg">
              <i className="bi bi-geo-alt-fill"></i>{" "}
              {t("labels.upload_and_download_locations")}
            </h5>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="fw-bold">{t("labels.upload_locations")}</label>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="fw-bold">{t("labels.download_locations")}</label>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
            </select>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <h5 className="fw-bold main-color text-lg">
              <i className="bi bi-credit-card-2-back-fill"></i>{" "}
              {t("labels.paymentMethod")}
            </h5>
            <select name="" id="" className="input-bg">
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="">{t("labels.cash")}</option>
              <option value="">
                {t("labels.postpaid")} ({`7 ${t("labels.days")}`})
              </option>
              <option value="">
                {t("labels.postpaid")} ({`30 ${t("labels.days")}`})
              </option>
              <option value="">
                {t("labels.postpaid")} ({`60 ${t("labels.days")}`})
              </option>
              <option value="">{t("labels.customized")}</option>
            </select>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <h5 className="fw-bold main-color text-lg">
              <i className="bi bi-quote"></i> {t("labels.comment")}
            </h5>
            <ReactQuill
              theme="snow"
              className="quill_ar"
              onChange={(value) => handleQuillChange("comment", value)}
              required
            />
            <small className="text-sm d-block my-2">
              {t("labels.first_comment")}
            </small>
          </div>
        </div>

        <div className="text-center">
          <button className="btn show_all" disabled={isLoading}>
            {isLoading ? t("labels.loading") : t("btns.add")}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePriceOfferRequests;