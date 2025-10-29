import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../../redux/Slices/EmployeesSlice";

const Employees = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { record, loading } = useSelector((state) => state.employees);
  useEffect(() => {
    setTitle(`${t("sidenav.employees")} > ${t("labels.view")}`);
    document.title = `${t("sidenav.employees")} > ${t("labels.view")}`;
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    dispatch(getEmployeeById(id));
  }, [id, i18n.language]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/employees" className="btn btn-dark btn-sm text-white">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
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
                  <div>
                    <b className="d-block text-sm my-1">
                      {t("labels.avatar")}:{" "}
                    </b>
                    <img
                      src={
                        record?.basic_info?.profile_picture
                          ? record?.basic_info?.profile_picture
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
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.name")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-person main-color"></i>{" "}
                    {i18n.language === "ar"
                      ? record?.basic_info?.name_ar
                      : record?.basic_info?.name_en}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">{t("labels.email")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-envelope-at main-color"></i>{" "}
                    {record?.basic_info?.email}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">{t("labels.phone")}: </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-telephone main-color"></i>{" "}
                    {record?.basic_info?.mobile}
                  </span>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm mb-2">
                    {t("labels.permission")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-shield-check main-color"></i>{" "}
                    <span className="custom-span1">
                      {record?.basic_info?.authority_name}
                    </span>
                  </span>
                </div>

                <div className="my-3">
                  <b className="d-block text-sm my-1">
                    {t("labels.registered_account")}:
                  </b>
                  <span className="d-block text-sm">
                    <i className="bi bi-person-check main-color"></i>{" "}
                    <span className="custom-span2">
                      {record?.basic_info?.parent_name || "--"}{" "}
                    </span>{" "}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm my-1">{t("labels.city")}:</b>
                  <span className="d-block text-sm">
                    <i className="bi bi-geo-alt main-color"></i>{" "}
                    {record?.basic_info?.city_name}
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
            {t("labels.employment_info")}
          </h5>
          {/* employment_info */}
          <div className="bg-light p-3 border rounded-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <div>
                  <div>
                    <b className="d-block text-sm my-2">
                      {t("labels.job_contract")}
                    </b>
                    <img
                      src={
                        record?.employment_data?.employment_image
                          ? record?.employment_data?.employment_image
                          : "/camera.png"
                      }
                      alt="--"
                      style={{
                        width: "auto",
                        maxHeight: "50px",
                        display: "inline-block",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <div>
                  <b className="d-block text-sm my-2">
                    {t("labels.passport_photo")}
                  </b>
                  <img
                    src={
                      record?.employment_data?.passport_image
                        ? record?.employment_data?.passport_image
                        : "/camera.png"
                    }
                    alt="--"
                    style={{
                      width: "auto",
                      maxHeight: "50px",
                      display: "inline-block",
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <div>
                  <b className="d-block text-sm my-2">
                    {t("labels.identity_photo")}
                  </b>
                  <img
                    src={
                      record?.employment_data?.id_image
                        ? record?.employment_data?.id_image
                        : "/camera.png"
                    }
                    alt="--"
                    style={{
                      width: "auto",
                      maxHeight: "50px",
                      display: "inline-block",
                    }}
                  />
                </div>
              </div>
              <div className="col-12">
                <hr />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.managementName")}
                  </b>
                  <span className="text-sm">
                    <i className="bi bi-menu-up main-color"></i>{" "}
                    {record?.employment_data?.management_name}
                  </span>
                </div>

                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.employee_number")}
                  </b>
                  <span className="text-sm">
                    <i className="bi bi-circle main-color"></i>{" "}
                    {record?.employment_data?.job_number}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.employmentDate")}
                  </b>
                  <span className="text-sm">
                    <i className="bi bi-calendar2-week main-color"></i>{" "}
                    {record?.employment_data?.employment_date}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.job")}</b>
                  <span className="text-sm">
                    <i className="bi bi-briefcase main-color"></i>{" "}
                    {record?.employment_data?.job_name}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">{t("labels.national_id")}</b>
                  <span className="text-sm">
                    <i className="bi bi-circle main-color"></i>{" "}
                    {record?.employment_data?.identity}
                  </span>
                </div>
                <div className="my-3">
                  <b className="d-block text-sm">
                    {t("labels.termination_date")}
                  </b>
                  <span className="text-sm">
                    <i className="bi bi-calendar2-week main-color"></i>{" "}
                    {record?.employment_data?.stop_date || "--"}
                  </span>
                </div>
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
          {t("labels.supervision")}
        </h5>
        {/* supervision */}
        <div className="bg-light p-3 border rounded-2">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="my-3">
                <b className="text-sm">
                  <i className="bi bi-menu-up main-color"></i>{" "}
                  {t("labels.company_source")}
                </b>
                {record?.supervisions?.company_sources?.map((source) => (
                  <span
                    className="d-block my-2 py-2 px-3 text-sm rounded-2 border bg-white"
                    key={source.id}
                  >
                    {source.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="my-3">
                <b className="text-sm">
                  <i className="bi bi-menu-up main-color"></i>{" "}
                  {t("labels.general_supervisor")}
                </b>
                {record?.supervisions?.general_supervisors?.map((source) => (
                  <span
                    className="d-block my-2 py-2 px-3 text-sm rounded-2 border bg-white"
                    key={source.id}
                  >
                    {source.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="my-3">
                <b className="text-sm">
                  <i className="bi bi-menu-up main-color"></i>{" "}
                  {t("labels.operations_supervisor")}
                </b>
                {record?.supervisions?.operation_supervisors?.map((source) => (
                  <span
                    className="d-block my-2 py-2 px-3 text-sm rounded-2 border bg-white"
                    key={source.id}
                  >
                    {source.name}
                  </span>
                ))}
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
          {t("labels.app_access")}
        </h5>
        {/* app_access */}
        <div className="bg-light p-3 border rounded-2">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <b className="text-sm d-block my-2">
                <i className="bi bi-toggles2 main-color"></i>&nbsp;
                {t("labels.business_app")}
              </b>
              {record?.apps_access?.company_application == false ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.inactive")}
                </span>
              ) : (
                <span className="highlight-green text-sm mx-3">
                  {t("labels.active")}
                </span>
              )}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <b className="text-sm d-block my-2">
                <i className="bi bi-toggles2 main-color"></i>&nbsp;
                {t("labels.partner_app")}
              </b>
              {record?.apps_access?.owner_application == false ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.inactive")}
                </span>
              ) : (
                <span className="highlight-green text-sm mx-3">
                  {t("labels.active")}
                </span>
              )}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <b className="text-sm d-block my-2">
                <i className="bi bi-toggles2 main-color"></i>&nbsp;
                {t("labels.client_app")}
              </b>
              {record?.apps_access?.user_application == false ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.inactive")}
                </span>
              ) : (
                <span className="highlight-green text-sm mx-3">
                  {t("labels.active")}
                </span>
              )}
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
          {t("labels.customer_permissions")}
        </h5>
        {/* customer_permissions */}
        <div className="bg-light p-3 border rounded-2">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <b className="text-sm d-block my-2">
                <i className="bi bi-menu-button-wide main-color"></i>&nbsp;
                {t("labels.control_business_sector")}
              </b>
              {record?.customize_users?.company_control === "all" ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.all")}
                </span>
              ) : record?.customize_users?.company_control === "include" ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.include")}
                </span>
              ) : (
                <span className="text-color text-sm mx-3">
                  {t("labels.exclude")}
                </span>
              )}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <b className="text-sm d-block my-2">
                <i className="bi bi-menu-button-wide main-color"></i>&nbsp;
                {t("labels.control_wensh_branches")}
              </b>
              {record?.customize_users?.winch_branch_control === "all" ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.all")}
                </span>
              ) : record?.customize_users?.winch_branch_control ===
                "include" ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.include")}
                </span>
              ) : (
                <span className="text-color text-sm mx-3">
                  {t("labels.exclude")}
                </span>
              )}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <b className="text-sm d-block my-2">
                <i className="bi bi-menu-button-wide main-color"></i>&nbsp;
                {t("labels.control_unregistered_sectors")}
              </b>

              {record?.customize_users?.control_unregistered_companies ===
              "show" ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.show")}
                </span>
              ) : (
                <span className="highlight-green text-sm mx-3">
                  {t("labels.hide")}
                </span>
              )}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <b className="text-sm d-block my-2">
                <i className="bi bi-menu-button-wide main-color"></i>&nbsp;
                {t("labels.control_individual_clients")}
              </b>
              {record?.customize_users?.individual_customer_control ===
              "show" ? (
                <span className="text-color text-sm mx-3">
                  {t("labels.show")}
                </span>
              ) : (
                <span className="highlight-green text-sm mx-3">
                  {t("labels.hide")}
                </span>
              )}
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <b className="d-block text-sm">
                <i className="bi bi-briefcase main-color"></i>{" "}
                {t("labels.business_sector")}
              </b>
              {record?.customize_users?.customize_sectors?.map((source) => (
                <span
                  className="d-block my-2 py-2 px-3 text-sm rounded-2 border bg-white"
                  key={source.id}
                >
                  {source.name}
                </span>
              ))}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <b className="d-block text-sm">
                <i className="bi bi-ui-checks-grid main-color"></i>{" "}
                {t("labels.wensh_branch")}
              </b>
              {record?.customize_users?.customize_branches?.map((source) => (
                <span
                  className="d-block my-2 py-2 px-3 text-sm rounded-2 border bg-white"
                  key={source.id}
                >
                  {source.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;
