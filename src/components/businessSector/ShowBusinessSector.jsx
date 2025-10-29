import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { businessSectorRecord } from "../../redux/Slices/BusinessSectorSlice";

const ShowBusinessSector = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { record, loading } = useSelector((state) => state.businessSector);
  console.log(record);

  useEffect(() => {
    setTitle(`${t("labels.businessSector")} > ${t("labels.view")}`);
    document.title = `${t("labels.businessSector")} > ${t("labels.view")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    dispatch(businessSectorRecord(id));
  }, [id, i18n.language]);
  return (
    <>
     <div style={{textAlign:i18n.language === "ar"?"left":"right"}}>
        <Link to="/business_sector" className="btn btn-dark btn-sm text-white">
          {t("btns.back")} <i className={`bi bi-arrow-${i18n.language === "ar"?"left":"right"} text-xs`}></i>
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
                <b className="d-block text-sm my-1">{t("labels.avatar")}: </b>
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

              <div className="my-3">
                <b className="d-block text-sm">{t("labels.name")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-person main-color"></i>{" "}
                  {record?.general_info?.admin_name || "--"}
                </span>
              </div>
              <div className="my-3">
                <b className="d-block text-sm">{t("labels.permission")}: </b>
                <span className="text-xs custom-span1">
                  <i className="bi bi-person main-color"></i>{" "}
                  {record?.general_info?.role_name || "--"}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm">{t("labels.status")}: </b>
                <span
                  className={`d-block text-sm ${
                    record?.general_info?.status === "active"
                      ? "highlight-green"
                      : record?.general_info?.status === "inactive"
                      ? "text-color"
                      : "text-warning"
                  }`}
                >
                  <i className="bi bi-list main-color"></i>{" "}
                  {record?.general_info?.status === "active"
                    ? t("labels.active")
                    : record?.general_info?.status === "inactive"
                    ? t("labels.inactive")
                    : t("labels.pending")}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm">{t("labels.mainBranch")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-building main-color"></i>{" "}
                  {record?.general_info?.company_name || "--"}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm">{t("labels.unifiedNumber")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-credit-card main-color"></i>{" "}
                  {record?.general_info?.nid || "--"}
                </span>
              </div>
              <div className="my-3">
                <b className="d-block text-sm mb-2">
                  {t("labels.entityType")}:
                </b>
                <span className="d-block text-sm">
                  <i className="bi bi-list main-color"></i>{" "}
                  {record?.general_info?.business_type ===
                  "limited_liability_company"
                    ? t("labels.limited_liability_company")
                    : record?.general_info?.business_type ===
                      "unlimited_liability_company"
                    ? t("labels.unlimited_liability_company")
                    : record?.general_info?.business_type ===
                      "limited_partnership_company"
                    ? t("labels.limited_partnership_company")
                    : record?.general_info?.business_type ===
                      "joint_stock_company"
                    ? t("labels.joint_stock_company")
                    : record?.general_info?.business_type ===
                      "simplified_joint_stock_company"
                    ? t("labels.simplified_joint_stock_company")
                    : record?.general_info?.business_type ===
                      "foregin_company_branch_categories"
                    ? t("labels.foregin_company_branch_categories")
                    : record?.general_info?.business_type === "other"
                    ? t("labels.other")
                    : "--"}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm mb-2">
                  {t("labels.clientType")}:
                </b>
                <span className="d-block text-sm">
                  <i className="bi bi-list main-color"></i>{" "}
                  {record?.general_info?.client_type === "private_sector"
                    ? t("labels.private_sector")
                    : t("labels.government_sector")}
                </span>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="my-3">
                <b className="d-block text-sm mb-2">
                  {t("labels.legal_name")}:
                </b>
                <span className="d-block text-sm">
                  <i className="bi bi-building main-color"></i>{" "}
                  {record?.general_info?.legal_name || "--"}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm mb-2">{t("labels.branch")}:</b>
                <span className="d-block text-sm">
                  <i className="bi bi-building main-color"></i>{" "}
                  {record?.general_info?.branch || "--"}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm mb-2">
                  {t("labels.commercialRegistrationNumber")}:
                </b>
                <span className="d-block text-sm">
                  <i className="bi bi-card-text main-color"></i>{" "}
                  {record?.general_info?.commercial_register_no || "--"}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm mb-2">
                  {t("labels.commercialStatus")}:
                </b>
                <span
                  className={`d-block text-sm ${
                    record?.general_info?.commercial_register_no_status ===
                    "active"
                      ? "highlight-green"
                      : record?.general_info?.commercial_register_no_status ===
                        "suspended"
                      ? "text-warning"
                      : record?.general_info?.commercial_register_no_status ===
                        "deleted"
                      ? "text-danger"
                      : "text-muted"
                  }`}
                >
                  <i className="bi bi-list main-color"></i>{" "}
                  {record?.general_info?.commercial_register_no_status ===
                  "active"
                    ? t("labels.active")
                    : record?.general_info?.commercial_register_no_status ===
                      "suspended"
                    ? t("labels.suspended")
                    : record?.general_info?.commercial_register_no_status ===
                      "deleted"
                    ? t("labels.deleted")
                    : t("labels.not_selected")}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm mb-2">{t("labels.issueDate")}:</b>
                <span className="d-block text-sm">
                  <i className="bi bi-calendar main-color"></i>{" "}
                  {record?.general_info?.commercial_registration_issue_date
                    ? record?.general_info?.commercial_registration_issue_date
                    : "--"}
                </span>
              </div>

              <div className="my-3">
                <b className="d-block text-sm mb-2">{t("labels.taxNumber")}:</b>
                <span className="d-block text-sm">
                  <i className="bi bi-receipt main-color"></i>{" "}
                  {record?.general_info?.vat_no || "--"}
                </span>
              </div>
              <div className="my-3">
                <b className="d-block text-sm mb-2">
                  {t("labels.activities")}:
                </b>
                <span className="d-block text-sm">
                  <i className="bi bi-list main-color"></i>{" "}
                  {record?.general_info?.activities?.map((act) => (
                    <React.Fragment key={act.id}>
                      <span className="custom-span2 text-xs">{act.name}</span>
                      &nbsp;
                    </React.Fragment>
                  ))}
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
                <b className="d-block text-sm">{t("labels.country")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-map main-color"></i>{" "}
                  {record?.address?.country_name || "--"}
                </span>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="my-3">
                <b className="d-block text-sm">{t("labels.city")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-building main-color"></i>{" "}
                  {record?.address?.city_name || "--"}
                </span>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="my-3">
                <b className="d-block text-sm">{t("labels.street")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-signpost main-color"></i>{" "}
                  {record?.address?.street || "--"}
                </span>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="my-3">
                <b className="d-block text-sm">{t("labels.building_no")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-house-door main-color"></i>{" "}
                  {record?.address?.building_no || "--"}
                </span>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="my-3">
                <b className="d-block text-sm">{t("labels.district")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-geo-alt main-color"></i>{" "}
                  {record?.address?.district || "--"}
                </span>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="my-3">
                <b className="d-block text-sm">{t("labels.postal_code")}: </b>
                <span className="d-block text-sm">
                  <i className="bi bi-mailbox main-color"></i>{" "}
                  {record?.address?.postal_code || "--"}
                </span>
              </div>
              <div className="my-3">
                <b className="d-block text-sm">
                  {t("labels.secondary_number")}:{" "}
                </b>
                <span className="d-block text-sm">
                  <i className="bi bi-123 main-color"></i>{" "}
                  {record?.address?.secondary_number || "--"}
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

export default ShowBusinessSector;
