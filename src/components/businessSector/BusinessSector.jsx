import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import {
  deleteBusinessSector,
  fetchBusinessSectors,
  clearState,
} from "../../redux/Slices/BusinessSectorSlice";
import { useDispatch, useSelector } from "react-redux";
import TableLoader from "../../pages/TableLoader";
import { toast } from "react-toastify";

const BusinessSector = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();

  const { businessSector, isLoading, success, error } = useSelector(
    (state) => state.businessSector
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = businessSector.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(businessSector.length / rowsPerPage);

  useEffect(() => {
    setTitle(t("sidenav.businessList"));
    document.title = t("sidenav.businessList");
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    dispatch(fetchBusinessSectors());
  }, [dispatch, i18n.language]);
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteBusinessSector({ id }));
    }
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.deleteSuccess"));
      dispatch(fetchBusinessSectors());
      dispatch(clearState());
    }

    if (error) {
      toast.error(t("labels.deleteFail"));
      dispatch(clearState());
    }
  }, [success, error, dispatch, t]);

  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("sign.name")}</label>
            <input type="text" name="name" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.branches")}</label>
            <select name="branches">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.rating")}</label>
            <select name="rate">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">
              {t("labels.unifiedNumberOrCR")}
            </label>
            <input name="commercial_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select name="status">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.accountManager")}</label>
            <input name="account_manager" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">
              {t("labels.operationsSupervisor")}
            </label>
            <input name="operation_supervisor" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">
              {" "}
              {t("labels.receivingOfficer")}
            </label>
            <input name="receiving_official" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.clientType")}</label>
            <select name="client_type">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.entityType")}</label>
            <select name="build_type">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.activities")}</label>
            <select name="activities">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.report")}</label>
            <input type="text" name="report" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-center">
            <Link to="/business_sector/add">
              <span
                className="btn btn-warning btn-sm text-sm px-3"
                style={{ marginTop: "45px" }}
              >
                {t("btns.add")}
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
              }}
              data-bs-toggle="modal"
              data-bs-target="#export"
            >
              {t("btns.export")}
            </button>
          </div>
        </div>
      </form>
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : businessSector && businessSector.length >= 1 ? (
          <>
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
                      {t("labels.legal_name")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.currentBalance")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.rating")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.status")}
                    </th>
                    <th className="text-lighter">
                      {t("labels.key_account_name")}
                    </th>
                    <th className="text-lighter">
                      {t("labels.operation_supervisor_name")}
                    </th>
                    <th className="text-lighter">
                      {t("labels.receiving_responsible_name")}
                    </th>
                    <th className="text-lighter">
                      {t("labels.trip_orders_count")}
                    </th>
                    <th className="text-lighter">{t("labels.created_at")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows?.map((tr, index) => (
                    <tr key={tr.id || index}>
                      <td className="sub-text">{tr?.id}</td>
                      <td className="sub-text">{tr?.customer_id}</td>
                      <td className="text-color">{tr?.legal_name}</td>
                      <td className="sub-text">$ {tr?.current_balance}</td>
                      <td>
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bi bi-star${
                              i < tr.rate ? "-fill text-warning" : ""
                            }`}
                          ></i>
                        ))}
                      </td>

                      <td
                        className={`${
                          tr.status === "active"
                            ? "highlight-green"
                            : tr.status === "inactive"
                            ? "text-color"
                            : "text-warning"
                        }`}
                      >
                        {tr.status === "active"
                          ? t("labels.active")
                          : tr.status === "inactive"
                          ? t("labels.inactive")
                          : t("labels.pending")}
                      </td>
                      <td
                        className={`${
                          tr?.key_account_name ? "text-color" : "text-dark"
                        }`}
                      >
                        {tr?.key_account_name
                          ? tr?.key_account_name
                          : t("labels.nothing")}
                      </td>
                      <td
                        className={`${
                          tr?.operation_supervisor_name
                            ? "text-color"
                            : "text-dark"
                        }`}
                      >
                        {tr?.operation_supervisor_name
                          ? tr?.operation_supervisor_name
                          : t("labels.nothing")}
                      </td>
                      <td
                        className={`${
                          tr?.receiving_responsible_name
                            ? "text-color"
                            : "text-dark"
                        }`}
                      >
                        {tr?.receiving_responsible_name
                          ? tr?.receiving_responsible_name
                          : t("labels.nothing")}
                      </td>
                      <td
                        className={`${
                          tr?.trip_orders_count ? "text-color" : "text-dark"
                        }`}
                      >
                        {tr?.trip_orders_count
                          ? tr?.trip_orders_count
                          : t("labels.nothing")}
                      </td>
                      <td className="sub-text" style={{ direction: "ltr" }}>
                        {tr?.created_at}
                      </td>
                      <td className="d-flex justify-content-center">
                        <Link
                          to={`/business_sector/view/${tr.id}`}
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content={t("labels.view")}
                          className="btn px-0 mx-1"
                        >
                          <span className="highlight-green px-1 mx-1 mb-0">
                            <i className="bi bi-eye"></i>
                          </span>
                        </Link>
                        <Link
                          to={`/business_sector/edit/${tr.id}`}
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content={t("labels.edit")}
                          className="btn px-0 mx-1"
                        >
                          <span className="text-color px-1 mx-1 mb-0">
                            <i className="bi bi-pen"></i>
                          </span>
                        </Link>
                        <button
                          className="btn px-0 mx-1"
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content={t("labels.delete")}
                          onClick={(e) => handleDelete(e, tr.id)}
                        >
                          <span className="text-danger px-0 mx-1 mb-0">
                            <i className="bi bi-trash"></i>
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Tooltip
              id="global-tooltip"
              place="top"
              className="custom-tooltip"
              style={{ fontSize: "11px", fontWeight: "bold" }}
            />
          </>
        ) : (
          <div
            className="no_data text-center rounded my-2 p-3"
            style={{ backgroundColor: "#569a8b" }}
          >
            <h5 className="my-2 text-md text-white">{t("labels.noData")}</h5>
          </div>
        )}
      </div>

      {/* pagination  */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <i className="fa fa-caret-right"></i>
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <i className="fa fa-caret-left"></i>
            </button>
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
            <div className="modal-body">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label htmlFor="lang" className="text-lighter text-sm">
                    {t("labels.language")}
                  </label>
                  <div className="my-1">
                    <input
                      name="lang"
                      id="arabic"
                      type="radio"
                      value="1"
                      className="custom-radio"
                    />
                    <label htmlFor="arabic" className="radio-label">
                      {t("labels.arabic")}
                    </label>
                  </div>
                  <div className="my-1">
                    <input
                      name="lang"
                      id="english"
                      type="radio"
                      value="2"
                      className="custom-radio"
                    />
                    <label htmlFor="english" className="radio-label">
                      {t("labels.english")}
                    </label>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label htmlFor="tableDir" className="text-lighter text-sm">
                    {t("labels.tableDirection")}
                  </label>
                  <div className="my-1">
                    <input
                      name="lang"
                      id="rtl"
                      type="radio"
                      value="1"
                      className="custom-radio"
                    />
                    <label htmlFor="rtl" className="radio-label">
                      {t("labels.rtl")}
                    </label>
                  </div>
                  <div className="my-1">
                    <input
                      name="lang"
                      id="ltr"
                      type="radio"
                      value="2"
                      className="custom-radio"
                    />
                    <label htmlFor="ltr" className="radio-label">
                      {t("labels.ltr")}
                    </label>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <label htmlFor="fileType" className="text-lighter text-sm">
                    {t("labels.fileType")}
                  </label>
                  <div className="my-1">
                    <input
                      name="lang"
                      id="pdf"
                      type="radio"
                      value="1"
                      className="custom-radio"
                    />
                    <label htmlFor="pdf" className="radio-label">
                      PDF
                    </label>
                  </div>
                  <div className="my-1">
                    <input
                      name="lang"
                      id="excel"
                      type="radio"
                      value="2"
                      className="custom-radio"
                    />
                    <label htmlFor="excel" className="radio-label">
                      Excel
                    </label>
                  </div>
                </div>
              </div>
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

export default BusinessSector;
