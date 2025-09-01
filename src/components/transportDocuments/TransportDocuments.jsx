import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TransportDocuments = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("sidenav.transportDocuments"));
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.documentNumber")} </label>
            <input type="text" name="document_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.orderNumber")} </label>
            <input type="text" name="order_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.tripRequest")} </label>
            <input type="text" name="trip_request" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.clientType")} </label>
            <input type="text" name="client_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.driver")} </label>
            <input type="text" name="driver" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.vehicle")} </label>
            <input type="text" name="vehicle" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">
              {t("labels.chargeFeeOnDocument")}{" "}
            </label>
            <input type="text" name="charge_fee_on_document" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.type")} </label>
            <select name="type">
              <option value="">{t("labels.selectItem")} </option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.status")} </label>
            <select name="status">
              <option value="">{t("labels.selectItem")} </option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.autoRepeat")} </label>
            <input type="text" name="auto_repeat" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.sentToReceipt")} </label>
            <input type="text" name="sent_to_receipt" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.businessUser")} </label>
            <input type="text" name="business_user" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.createdBy")} </label>
            <input type="text" name="created_by" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.report")} </label>
            <input type="text" name="report" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <div>
              <button className="btn show_result">
                {t("btns.viewResults")}{" "}
              </button>
              <button className="btn show_all">{t("btns.viewAll")}</button>
            </div>
          </div>
        </div>
      </form>
      <div className="table_wrapper">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className="text-lighter">
                  #
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.documentNumber")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.orderNumber")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.client")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.driver")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.vehicle")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.fees")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.type")}
                </th>
                <th className="text-lighter">{t("labels.status")} </th>
                <th className="text-lighter">{t("labels.sentToReceipt")} </th>
                <th className="text-lighter">{t("labels.createdBy")} </th>
                <th className="text-lighter">{t("labels.date")} </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">---</td>
                <td className="text-color">TO53850</td>
                <td className="text-color">شركة المطاحن الاولى</td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text">
                  <img
                    src="/img/placeholder.png"
                    className="rounded"
                    style={{ width: "auto", maxHeight: "40px" }}
                    alt="placeholder"
                  />
                </td>
                <td className="text-danger">$ 75 -</td>

                <td className="sub-text">رحلات</td>

                <td className="highlight-green">{t("labels.active")}</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="text-color">محمد موسى</td>

                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="highlight-green px-1 mx-1 mb-0">
                        <i className="bi bi-printer"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">---</td>
                <td className="text-color">TO53850</td>
                <td className="text-color">شركة المطاحن الاولى</td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text">
                  <img
                    src="/img/placeholder.png"
                    className="rounded"
                    style={{ width: "auto", maxHeight: "40px" }}
                    alt="placeholder"
                  />
                </td>
                <td className="text-danger">$ 75 -</td>

                <td className="sub-text">رحلات</td>

                <td className="highlight-green">{t("labels.active")}</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="text-color">محمد موسى</td>

                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="highlight-green px-1 mx-1 mb-0">
                        <i className="bi bi-printer"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">---</td>
                <td className="text-color">TO53850</td>
                <td className="text-color">شركة المطاحن الاولى</td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text">
                  <img
                    src="/img/placeholder.png"
                    className="rounded"
                    style={{ width: "auto", maxHeight: "40px" }}
                    alt="placeholder"
                  />
                </td>
                <td className="text-danger">$ 75 -</td>

                <td className="sub-text">رحلات</td>

                <td className="highlight-green">{t("labels.active")}</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="text-color">محمد موسى</td>

                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="highlight-green px-1 mx-1 mb-0">
                        <i className="bi bi-printer"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">---</td>
                <td className="text-color">TO53850</td>
                <td className="text-color">شركة المطاحن الاولى</td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text">
                  <img
                    src="/img/placeholder.png"
                    className="rounded"
                    style={{ width: "auto", maxHeight: "40px" }}
                    alt="placeholder"
                  />
                </td>
                <td className="text-danger">$ 75 -</td>

                <td className="sub-text">رحلات</td>

                <td className="highlight-green">{t("labels.active")}</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="text-color">محمد موسى</td>

                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="highlight-green px-1 mx-1 mb-0">
                        <i className="bi bi-printer"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">---</td>
                <td className="text-color">TO53850</td>
                <td className="text-color">شركة المطاحن الاولى</td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text">
                  <img
                    src="/img/placeholder.png"
                    className="rounded"
                    style={{ width: "auto", maxHeight: "40px" }}
                    alt="placeholder"
                  />
                </td>
                <td className="text-danger">$ 75 -</td>

                <td className="sub-text">رحلات</td>

                <td className="highlight-green">{t("labels.active")}</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="text-color">محمد موسى</td>

                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="highlight-green px-1 mx-1 mb-0">
                        <i className="bi bi-printer"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">---</td>
                <td className="text-color">TO53850</td>
                <td className="text-color">شركة المطاحن الاولى</td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text">
                  <img
                    src="/img/placeholder.png"
                    className="rounded"
                    style={{ width: "auto", maxHeight: "40px" }}
                    alt="placeholder"
                  />
                </td>
                <td className="text-danger">$ 75 -</td>

                <td className="sub-text">رحلات</td>

                <td className="highlight-green">{t("labels.active")}</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="text-color">محمد موسى</td>

                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="highlight-green px-1 mx-1 mb-0">
                        <i className="bi bi-printer"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination  */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              <i className="fa fa-caret-right"></i>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">
              2 <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <i className="fa fa-caret-left"></i>
            </a>
          </li>
        </ul>
      </nav>
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
            <div className="modal-body">--</div>
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

export default TransportDocuments;