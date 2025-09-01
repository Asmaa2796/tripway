import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteChartAccounts,
  fetchChartAccounts,
} from "../../../redux/Slices/ChartAccountsSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";

const ChartOfAccounts = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();

  const { chart_accounts, isLoading, success, error } = useSelector(
    (state) => state.chart_accounts
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  // Top-level accounts only
  const topLevelAccounts = chart_accounts || [];

  // Total pages based on top-level count
  const totalPages = Math.ceil(topLevelAccounts.length / itemsPerPage);

  // Slice top-level accounts for current page
  const paginatedData = topLevelAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTitle(t("sidenav.chartOfAccounts"));
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchChartAccounts());
  }, [dispatch, t, i18n.language, success]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteChartAccounts(id));
    }
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.deleteSuccess"));
      dispatch(fetchChartAccounts());
      dispatch(clearState());
    }
    if (error) {
      toast.error(t("labels.deleteFail"));
      dispatch(clearState());
    }
  }, [success, error, dispatch, t]);
const handleCanMove = (e) => {
e.preventDefault();
}
  const accountTypeKey = (type) => {
    switch (type) {
      case "income_list":
        return "incomeList";
      case "balance_sheet":
        return "balanceSheet";
      case "internal_income_list":
        return "internalIncomeList";
      default:
        return "undefined";
    }
  };

  const renderRows = (data, level = 0, parentIndex = "") => {
    return data.map((tr, index) => {
      const rowIndex = parentIndex
        ? `${parentIndex}.${index + 1}`
        : `${index + 1}`;

      let iconClass = "bi-folder text-color"; // top-level
      if (level === 1) iconClass = "bi-diagram-2 text-dark";
      if (level >= 2) iconClass = "bi-arrow-return-right highlight-green";

      return (
        <React.Fragment key={tr.id || rowIndex}>
          <tr>
            <td className="sub-text">{rowIndex}</td>

            <td className="sub-text">
              <span style={{ paddingLeft: `${level * 20}px` }}>
                <i className={`bi ${iconClass} me-2`}></i>&nbsp;
                <Link to="#">{tr?.name}</Link>
              </span>
            </td>

            <td className="sub-text">{tr?.code}</td>
            <td className="sub-text">{tr?.desc || "--"}</td>
            <td className="sub-text">
              {t(`labels.${accountTypeKey(tr?.account_type)}`)}
            </td>
            <td
              className={`sub-text fw-bold ${
                tr?.accept_payments === false ? "text-danger" : "text-success"
              }`}
            >
              {tr?.accept_payments === false ? (
                <i className="bi bi-x-circle-fill text-md fw-bold"></i>
              ) : (
                <i className="bi bi-check-circle-fill text-md fw-bold"></i>
              )}
            </td>
            <td className="d-flex justify-content-center gap-2">
              <Link
                className="btn px-1 highlight-green"
                to={`/show_chart_accounts/${tr.id}`}
              >
                <i className="bi bi-eye"></i>
              </Link>

              <Link
                className="btn px-1 text-color"
                to={`/edit_chart_accounts/${tr.id}`}
              >
                <i className="bi bi-pen"></i>
              </Link>
              {tr?.can_add_subaccount && <Link
                className="btn px-1 text-dark"
                to="/add_sub_chart_accounts"
              >
                <i className="bi bi-plus"></i>
              </Link>}
              {tr?.can_delete &&
              <button
                className="btn px-1 text-danger"
                onClick={(e) => handleDelete(e, tr.id)}
              >
                <i className="bi bi-trash"></i>
              </button>}
              {tr?.can_move &&
              <button
                className="btn px-1 text-info"
                onClick={(e) => handleCanMove(e, tr.id)}
              >
                <i className="bi bi-arrows-move"></i>
              </button>}
            </td>
          </tr>

          {tr.children &&
            tr.children.length > 0 &&
            renderRows(tr.children, level + 1, rowIndex)}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <div className="my-3">
        <Link to="/add_chart_accounts">
          <span
            className="btn btn-success btn-sm text-sm px-3"
            style={{
              background: "var(--green-color)",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {t("btns.add")}
          </span>
        </Link>
      </div>

      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : chart_accounts?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("labels.accountName")}</th>
                  <th>{t("labels.code")}</th>
                  <th>{t("labels.description")}</th>
                  <th>{t("labels.accountType")}</th>
                  <th>{t("labels.acceptPayments")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderRows(paginatedData)}</tbody>
            </table>
          </div>
        ) : (
          <div
            className="no_data text-center rounded my-2 p-3"
            style={{ backgroundColor: "#569a8b" }}
          >
            <h5 className="my-2 text-md text-white">{t("labels.noData")}</h5>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
              >
                <i className="fa fa-caret-right"></i>
              </a>
            </li>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </a>
                </li>
              );
            })}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
              >
                <i className="fa fa-caret-left"></i>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default ChartOfAccounts;