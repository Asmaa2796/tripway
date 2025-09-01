import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Drivers = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("labels.drivers"));
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("sign.name")} </label>
            <input type="text" name="name" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.email")} </label>
            <input type="text" name="email" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.service")} </label>
            <input type="text" name="service" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.vehiclePlate")} </label>
            <input type="text" name="vehicle_plate" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.transporterType")} </label>
            <input type="text" name="transporter_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.tripwayPartner")} </label>
            <input type="text" name="tripway_partner" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.accountType")} </label>
            <input type="text" name="account_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.city")} </label>
            <select name="city">
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
            <label className="text-light">{t("labels.availability")} </label>
            <select name="avaiability">
              <option value="">{t("labels.selectItem")} </option>
            </select>
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
            <div>
              <Link to="add_provider">
                <span
                  className="btn btn-warning btn-sm text-sm px-3"
                  style={{ marginTop: "10px" }}
                >
                  {t("labels.addProvider")}
                </span>
              </Link>
              <button
                type="button"
                className="btn btn-success btn-sm text-sm px-3"
                style={{
                  background: "var(--green-color)",
                  marginRight: "5px",
                  marginTop: "10px",
                  fontSize: "14px",
                }}
                data-bs-toggle="modal"
                data-bs-target="#export"
              >
                {t("labels.exportProviders")}
              </button>
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
                  {t("labels.clientID")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("sign.name")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.vehiclePlate")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.tripwayPartner")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.phone")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.currentBalance")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.rating")}
                </th>
                <th className="text-lighter">{t("labels.city")} </th>
                <th className="text-lighter">{t("labels.status")} </th>
                <th className="text-lighter">{t("labels.availability")} </th>
                <th className="text-lighter">{t("labels.accountType")} </th>
                <th className="text-lighter">{t("labels.invitedBy")} </th>
                <th className="text-lighter">{t("home.tripRequests")} </th>
                <th className="text-lighter">{t("labels.date")} </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">30013305</td>
                <td className="sub-text">احمد ابراهيم</td>
                <td className="sub-text">
                  <img src="/img/placeholder.png" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 557116377
                </td>
                <td className="sub-text">$ 0</td>
                <td>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                </td>
                <td className="sub-text">-</td>
                <td className="highlight-green">{t("labels.active")}</td>
                <td className="text-danger">{t("home.busy")}</td>
                <td className="sub-text">{t("labels.normal")}</td>
                <td className="sub-text">{t("labels.nothing")}</td>
                <td className="sub-text">الطلبات ( 1 )</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">30013305</td>
                <td className="sub-text">احمد ابراهيم</td>
                <td className="sub-text">
                  <img src="/img/placeholder.png" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 557116377
                </td>
                <td className="sub-text">$ 0</td>
                <td>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                </td>
                <td className="sub-text">-</td>
                <td className="highlight-green">{t("labels.active")}</td>
                <td className="text-danger">{t("home.busy")}</td>
                <td className="sub-text">{t("labels.normal")}</td>
                <td className="sub-text">{t("labels.nothing")}</td>
                <td className="sub-text">الطلبات ( 1 )</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">30013305</td>
                <td className="sub-text">احمد ابراهيم</td>
                <td className="sub-text">
                  <img src="/img/placeholder.png" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 557116377
                </td>
                <td className="sub-text">$ 0</td>
                <td>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                </td>
                <td className="sub-text">-</td>
                <td className="highlight-green">{t("labels.active")}</td>
                <td className="text-danger">{t("home.busy")}</td>
                <td className="sub-text">{t("labels.normal")}</td>
                <td className="sub-text">{t("labels.nothing")}</td>
                <td className="sub-text">الطلبات ( 1 )</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">30013305</td>
                <td className="sub-text">احمد ابراهيم</td>
                <td className="sub-text">
                  <img src="/img/placeholder.png" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 557116377
                </td>
                <td className="sub-text">$ 0</td>
                <td>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                </td>
                <td className="sub-text">-</td>
                <td className="highlight-green">{t("labels.active")}</td>
                <td className="text-danger">{t("home.busy")}</td>
                <td className="sub-text">{t("labels.normal")}</td>
                <td className="sub-text">{t("labels.nothing")}</td>
                <td className="sub-text">الطلبات ( 1 )</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">30013305</td>
                <td className="sub-text">احمد ابراهيم</td>
                <td className="sub-text">
                  <img src="/img/placeholder.png" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="text-color">حسن حسين</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 557116377
                </td>
                <td className="sub-text">$ 0</td>
                <td>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                </td>
                <td className="sub-text">-</td>
                <td className="highlight-green">{t("labels.active")}</td>
                <td className="text-danger">{t("home.busy")}</td>
                <td className="sub-text">{t("labels.normal")}</td>
                <td className="sub-text">{t("labels.nothing")}</td>
                <td className="sub-text">الطلبات ( 1 )</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
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

export default Drivers;