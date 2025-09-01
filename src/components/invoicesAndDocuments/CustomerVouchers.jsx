import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CustomerVouchers = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("sidenav.customerVouchers"));
  }, [setTitle, t, i18n.language]);

  return (
    <>
      {/* Nav tabs */}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="receiptVoucher-tab"
            data-bs-toggle="tab"
            href="#receiptVoucher"
            role="tab"
          >
            {t("labels.receiptVoucher")}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="paymentVoucher-tab"
            data-bs-toggle="tab"
            href="#paymentVoucher"
            role="tab"
          >
            {t("labels.paymentVoucher")}
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            id="deletedVouchers-tab"
            data-bs-toggle="tab"
            href="#deletedVouchers"
            role="tab"
          >
            {t("labels.deletedVouchers")}
          </a>
        </li>
      </ul>

      {/* Tab panes */}
      <div className="tab-content mt-3 my-3 py-3 div-bg">
        <div
          className="tab-pane fade show active"
          id="receiptVoucher"
          role="tabpanel"
        >
          {/* form */}
          <form className="table_form form-style my-3 py-3">
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {" "}
                  {t("labels.winchBranch")}{" "}
                </label>
                <input type="text" className="input-bg" name="winch_branch" />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.noticeNumber")}</label>
                <input type="text" className="input-bg" name="notice_number" />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.clientType")}</label>
                <select name="client_type" className="input-bg w-100">
                  <option value="">{t("labels.selectItem")} </option>
                </select>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.paymentStatus")}
                </label>
                <input type="text" className="input-bg" name="payment_status" />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.usageStatus")}</label>
                <input type="text" className="input-bg" name="usage_status" />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.totalPrice")}</label>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                    <select name="from" className="input-bg w-100">
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                    <select name="to" className="input-bg w-100">
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t("labels.createdBy")}</label>
                <input type="text" className="input-bg" name="created_by" />
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t("labels.report")} </label>
                <input name="report" className="input-bg" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
                <button className="btn show_result">
                  {t("btns.viewResults")}{" "}
                </button>
                <button className="btn show_all">{t("btns.viewAll")}</button>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
                <div className="d-flex justify-content-center">
                  <Link to="">
                    <span
                      className="btn btn-warning btn-sm text-sm px-3"
                      style={{ marginTop: "45px", whiteSpace: "nowrap" }}
                    >
                      {t("labels.newVoucher")}
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-success btn-sm text-sm px-3"
                    style={{
                      background: "var(--green-color)",
                      marginRight: "5px",
                      marginTop: "45px",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#export"
                  >
                    {t("labels.exportInvoices")}
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div
            className="no_data text-center rounded my-2 p-3"
            style={{ backgroundColor: "#569a8b" }}
          >
            <h5 className="my-2 text-md text-white">{t("labels.noData")}</h5>
          </div>
        </div>
        <div className="tab-pane fade" id="paymentVoucher" role="tabpanel">
          --
        </div>

        <div className="tab-pane fade" id="deletedVouchers" role="tabpanel">
          --
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="export"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-light">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <button
                type="button"
                className="close btn p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body form-style">--</div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn text-white btn-sm"
                style={{
                  background: "var(--green-color)",
                  marginRight: "5px",
                  fontSize: "13px",
                }}
              >
                {t("btns.export")}
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{ fontSize: "13px" }}
                data-bs-dismiss="modal"
              >
                {t("btns.cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerVouchers;
