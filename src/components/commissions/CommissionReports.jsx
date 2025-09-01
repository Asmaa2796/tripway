import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CommissionReports = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("sidenav.commissionReports"));
  }, [setTitle, t, i18n.language]);

  return (
    <>
      {/* Nav tabs */}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="commissionReports-tab"
            data-bs-toggle="tab"
            href="#commissionReports"
            role="tab"
          >
            {t("sidenav.commissionReports")}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="deletedReports-tab"
            data-bs-toggle="tab"
            href="#deletedReports"
            role="tab"
          >
            {t("labels.deletedReports")}
          </a>
        </li>
      </ul>

      {/* Tab panes */}
      <div className="tab-content mt-3 my-3 py-3 div-bg">
        <div
          className="tab-pane fade show active"
          id="commissionReports"
          role="tabpanel"
        >
          {/* form */}
            <form className="table_form form-style my-3 py-3">
                <div className="row align-items-center">
                
                <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <label className="text-light">{t("labels.type")}</label>
                    <input type="text" className="input-bg" name="type" />
                </div>
                
                <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <label className="text-light">{t("labels.fromDate")}</label>
                    <input type="text" className="input-bg" name="from_date" />
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <label className="text-light">{t("labels.toDate")}</label>
                    <input type="text" className="input-bg" name="to_date" />
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
                    <button className="btn show_result">
                    {t("btns.viewResults")}{" "}
                    </button>
                    <button className="btn show_all">{t("btns.viewAll")}</button>
                </div>
                
                </div>
            </form>
            <div className="no_data text-center rounded my-2 p-3" style={{backgroundColor:"#569a8b"}}>
                <h5 className="my-2 text-md text-white">{t('labels.noData')}</h5>
            </div>
        </div>
        <div className="tab-pane fade" id="deletedReports" role="tabpanel">
          {/* form */}
            <form className="table_form form-style my-3 py-3">
                <div className="row align-items-center">
                
                <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <label className="text-light">{t("labels.type")}</label>
                    <input type="text" className="input-bg" name="type" />
                </div>
                
                <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <label className="text-light">{t("labels.fromDate")}</label>
                    <input type="text" className="input-bg" name="from_date" />
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <label className="text-light">{t("labels.toDate")}</label>
                    <input type="text" className="input-bg" name="to_date" />
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
                    <button className="btn show_result">
                    {t("btns.viewResults")}{" "}
                    </button>
                    <button className="btn show_all">{t("btns.viewAll")}</button>
                </div>
                
                </div>
            </form>
            <div className="no_data text-center rounded my-2 p-3" style={{backgroundColor:"#569a8b"}}>
                <h5 className="my-2 text-md text-white">{t('labels.noData')}</h5>
            </div>
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
            <div className="modal-body form-style">
              --
            </div>
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

export default CommissionReports;
