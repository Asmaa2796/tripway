import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  clearState,
  deleteRecord,
  fetchPurchaseReturnsAccounts,
} from "../../../redux/Slices/PurchaseReturnsAccountsSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";

const PurchaseReturnsAccounts = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { purchase_returns_accounts, isLoading, error, success } = useSelector(
    (state) => state.purchase_returns_accounts
  );

  useEffect(() => {
    setTitle(t("sidenav.purchase_returns_accounts"));
    document.title = t("sidenav.purchase_returns_accounts");
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchPurchaseReturnsAccounts());
  }, [dispatch, i18n.language]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteRecord(id))
        .unwrap()
        .then(() => {
          toast.success(t("labels.deleteSuccess"));
        })
        .catch(() => {
          toast.error(t("labels.deleteFail"));
        });
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(purchase_returns_accounts.length / itemsPerPage);
  const paginatedData = purchase_returns_accounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <Link
        to="/add_purchase_returns_accounts"
        className="btn save text-white my-3 text-sm"
      >
        {t("sidenav.add_purchase_returns_accounts")}
      </Link>
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : purchase_returns_accounts &&
          purchase_returns_accounts.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-lighter">
                    #
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("sign.name")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.status")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((tr, index) => (
                  <tr key={tr.id}>
                    <td className="sub-text">{index + 1}</td>
                    <td className="sub-text">{tr.name}</td>
                    {tr.status === "active" ? (
                      <td className="text-color">{t("labels.active")}</td>
                    ) : (
                      <td className="highlight-text">{t("labels.inactive")}</td>
                    )}
                    <td className="d-flex justify-content-center">
                      <Link
                        className="btn"
                        to={`/edit_purchase_returns_accounts/${tr.id}`}
                      >
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      <button
                          className="btn"
                          onClick={(e) => handleDelete(e, tr.id)}
                        >
                          <span className="text-danger px-1 mx-1 mb-0">
                            <i className="bi bi-trash"></i>
                          </span>
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
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

      {/* pagination (static for now) */}
      <nav aria-label="Page navigation example">
        {totalPages > 1 && (
          <ul className="pagination">
            {/* Prev */}
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

            {/* Page numbers */}
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
                    {page}{" "}
                    {currentPage === page && (
                      <span className="sr-only">(current)</span>
                    )}
                  </a>
                </li>
              );
            })}

            {/* Next */}
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
        )}
      </nav>
    </>
  );
};

export default PurchaseReturnsAccounts;
