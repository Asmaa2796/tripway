import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompensations,
  deleteCompensation,
  changeCompensationStatus,
  restoreCompensation,
  clearState,
} from "../../../redux/Slices/CompensationCategoriesSlice";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTitle } from "../../../context/TitleContext";
import TableLoader from "../../../pages/TableLoader";

const CompensationCategories = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle(t("sidenav.compensationCategories"));
    document.title = t("sidenav.compensationCategories");
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { approved, waiting, deleted, success, loading, error, pagination } =
    useSelector((state) => state.compensationCategories);

  const [currentTab, setCurrentTab] = useState("approved");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCompensations(currentPage));
  }, [dispatch, i18n.language, currentPage]);

  const handleChangeStatus = async (id) => {
    try {
      await dispatch(changeCompensationStatus(id)).unwrap();
      toast.success(t("labels.changeStatusSuccessfully"));
      dispatch(fetchCompensations());
    } catch (err) {
      toast.error(err.message || t("labels.changeStatusFail"));
    }
  };

  const handleRestoreCategory = async (id) => {
    try {
      await dispatch(
        restoreCompensation({ compensation_category_id: id })
      ).unwrap();
      toast.success(t("labels.restoredSuccess"));
       dispatch(fetchCompensations());
    } catch (err) {
      toast.error(err.message || t("labels.restoredFail"));
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination?.last_page) {
      setCurrentPage(page);
    }
  };

  const handleDeleteCategory = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteCompensation(id));
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.deleteSuccess"));
      dispatch(clearState());
      dispatch(fetchCompensations());
    }
    if (error) {
      toast.error(t("labels.deleteFail"));
      dispatch(clearState());
    }
  }, [success, error, dispatch, t]);

  const data =
    currentTab === "approved"
      ? approved
      : currentTab === "waiting"
      ? waiting
      : deleted;

  return (
    <div className="compensation-categories">
      <div className="tabs justify-content-between d-flex flex-wrap">
        <div className="navig">
          <button
            className={`btn btn-sm my-3 btn-primary tab ${
              currentTab === "approved" ? "active" : ""
            }`}
            onClick={() => setCurrentTab("approved")}
          >
            {t("labels.baptized")}
          </button>
          &nbsp;
          <button
            className={`btn btn-sm my-3 btn-info tab ${
              currentTab === "waiting" ? "active" : ""
            }`}
            onClick={() => setCurrentTab("waiting")}
          >
            {t("labels.notBaptized")}
          </button>
          &nbsp;
          <button
            className={`btn btn-sm my-3 btn-danger tab ${
              currentTab === "deleted" ? "active" : ""
            }`}
            onClick={() => setCurrentTab("deleted")}
          >
            {t("labels.deleted")}
          </button>
          &nbsp;
        </div>
        <Link to="/compensation_categories/create">
          <button className="btn btn-sm my-3 btn-success add-button">
            {t("labels.addCategory")}
          </button>
        </Link>
      </div>

      <div className="table_wrapper">
        {loading ? (
          <TableLoader />
        ) : data?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th> {t("labels.compensationType")} </th>
                  <th> {t("labels.count")} </th>
                  <th>{t("labels.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.count}</td>
                    <td className="d-flex align-items-center justify-content-center">
                      {/* Edit -> show in approved + waiting */}
                      {currentTab !== "deleted" && (
                        <Link
                          to={`/compensation_categories/edit/${category.id}`}
                          className="btn btn-sm text-primary mx-1"
                          title={t("btns.edit")}
                        >
                          <i className="bi bi-pen"></i>
                        </Link>
                      )}

                      {/* Delete -> show in approved + waiting */}
                      {currentTab !== "deleted" && (
                        <button
                          className="btn btn-sm text-danger mx-1"
                          title={t("labels.delete")}
                          onClick={(e) => handleDeleteCategory(e, category.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}

                      {/* Change status -> only in waiting */}
                      {currentTab === "waiting" && (
                        <button
                          className="btn btn-sm btn-success mx-1"
                          title={t("labels.activate")}
                          onClick={() => handleChangeStatus(category.id)}
                        >
                          <i className="bi bi-check-circle"></i>
                        </button>
                      )}
                      {/* Restore -> only in deleted */}
                      {currentTab === "deleted" && (
                        <button
                          className="btn btn-sm btn-info mx-1"
                          title={t("btns.restore")}
                          onClick={() => handleRestoreCategory(category.id)}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                      )}
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
      {pagination && pagination.last_page > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            {/* Prev button */}
            <li
              className={`page-item ${
                !pagination?.prev_page_url ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                  e.currentTarget.blur();
                }}
              >
                <i className="fa fa-caret-right"></i>
              </a>
            </li>

            {/* Page numbers */}
            {Array.from({ length: pagination?.last_page || 1 }, (_, index) => (
              <li
                key={index}
                className={`page-item mx-1 ${
                  pagination?.current_page === index + 1 ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                    e.currentTarget.blur();
                  }}
                >
                  {index + 1}
                </a>
              </li>
            ))}

            {/* Next button */}
            <li
              className={`page-item ${
                !pagination?.next_page_url ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                  e.currentTarget.blur();
                }}
              >
                <i className="fa fa-caret-left"></i>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default CompensationCategories;
